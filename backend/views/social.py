from typing import cast

from flask import jsonify, request, redirect, url_for
from models import storage
from utils.file import upload_file, rename_file
from config.settings import Config
from datetime import datetime
from models.models import User, Follow, Post, Comment, Like
from views import platform_views
from flask_jwt_extended import jwt_required, get_jwt, current_user
from views.helpers import role_required


@platform_views.route('/stats', methods=['GET'])
@jwt_required(optional=True)
@role_required('admin')
def get_stats():
    ''' Gets all platform stats '''
    return jsonify({"message": "Coming Soon!!"}), 404

@platform_views.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    ''' Adds new post to database '''
    file = request.files['file']
    content = request.form.get('content')

    if not content:
        return jsonify({"message": "Invalid data!"}), 400

    new_post = Post(
        user_id = current_user.id,
        content = content,
    )

    image_name = upload_file(file)
    new_post.image_url = image_name
    new_post.save()
    
    ''' Workaround to make image_url saveable with correct url'''
    post_update = storage.get(Post, id=new_post.id)
    url_prefix = Config.IMG_URL_PREFIX
    post_update.image_url = '{}{}.{}'.format(url_prefix, new_post.id, image_name)
    rename_file(image_name, '{}.{}'.format(new_post.id, image_name))
    post_update.save()


    return jsonify({
        'id': post_update.id,
    }), 201

@platform_views.route('/feed', methods=['GET'])
@jwt_required()
def get_feed():
    ''' Gets all posts from followed users '''
    posts = storage.all(Post)
    feed = []
    for id, post in posts.items():
        feed_data = {
            'user_data': {},
        }
        user = storage.get(User, id=post.user_id)
        feed_data['user_data']['id'] = user.id
        feed_data['user_data']['username'] = user.username
        feed_data['user_data']['image_url'] = user.image_url

        for k, v in post.to_dict().items():
            if k != 'user_id':
                feed_data[k] = v

        feed.append(feed_data)
    
    return jsonify(feed), 200

@platform_views.route('/posts/comment/<post_id>', methods=['POST'])
@jwt_required()
def create_comment(post_id):
    ''' Adds new comment to a post '''

    data = request.get_json()
    content = data.get('content')

    if not post_id or not content:
        return jsonify({"message": "Invalid data!"}), 400
    
    post = storage.get(Post, id=post_id)
    if not post:
        return jsonify({"message": "Post not found!"}), 404
    
    new_comment = Comment(
        user_id = current_user.id,
        post_id = post_id,
        content = content,
    )

    new_comment.save()

    return jsonify({"message": "Comment added successfully!"}), 201

@platform_views.route('/posts/like/<post_id>', methods=['POST'])
@jwt_required()
def like_post(post_id):
    ''' Likes a post '''
    if not post_id:
        return jsonify({"message": "Invalid data!"}), 400
    
    post = storage.get(Post, id=post_id)
    if not post:
        return jsonify({"message": "Post not found!"}), 404
    
    likes = storage.all(Like)

    for id, like in likes.items():
        if like.user_id == current_user.id and like.post_id == post_id:
            return jsonify({"message": "Post already liked!"}), 400
    
    new_like = Like(
        user_id = current_user.id,
        post_id = post_id,
    )
    new_like.save()

    return jsonify({"message": "Post liked successfully!"}), 201

@platform_views.route('/users/follow/<user_id>', methods=['POST'])
@jwt_required()
def follow_user(user_id):
    ''' Follows a user '''

    if not user_id:
        return jsonify({"message": "Invalid data!"}), 400
    
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"message": "User not found!"}), 404
    
    follows = storage.all(Follow)

    for id, follow in follows.items():
        if follow.follower_id == current_user.id and follow.followed_id == user_id:
            return jsonify({"message": "User already followed!"}), 400
    
    new_follow = Follow(
        follower_id = current_user.id,
        followed_id = user_id,
    )
    new_follow.save()

    return jsonify({"message": "User followed successfully!"}), 201
