from typing import cast

from flask import jsonify, request, redirect, url_for
from models import storage
from config.settings import Config
from datetime import datetime
from models.models import User, Follow, Post, Comment, Like
from views import platform_views
from flask_jwt_extended import jwt_required, get_jwt, current_user
from views.helpers import role_required


"""
    ADMIN
"""
@platform_views.route('/stats', methods=['GET'])
@jwt_required(optional=True)
@role_required('admin')
def get_stats():
    ''' Gets all platform stats '''
    return jsonify({"message": "Coming Soon!!"}), 404

"""
    POST ADDITIONS
"""
@platform_views.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    ''' Adds new post to database '''

    if 'file' in request.files:
        file = request.files['file']
        content = request.form.get('content')
    else:
        data = request.get_json()
        content = data.get('content')
        file = None

    if not content:
        return jsonify({"message": "Invalid data!"}), 400

    new_post = Post(
        user_id = current_user.id,
        content = content,
    )
    new_post.save()

    if file:
        from utils.image_storage import ImageStorage
        image_storage = ImageStorage()
        
        ''' Workaround to make image_url saveable with correct url'''
        if not image_storage.allowed_file(file.filename):
            return jsonify({"message": 'Supportted formats: {}'.format(' '.join(Config.ALLOWED_EXTENSIONS))}), 400

        image_name = '{}.{}'.format(new_post.id, file.filename)
        url_prefix = Config.IMG_URL_PREFIX
        new_post.image_url = '{}{}'.format(url_prefix, image_name)
        image_storage.upload_file(file, image_name)
        new_post.save()
    else:
        new_post.save()

    post_data = {
        'user_data': {
            'id': current_user.id,
            'username': current_user.username,
            'image_url': current_user.image_url,
        },
        'id': new_post.id,
        'content': new_post.content,
        'image_url': new_post.image_url,
        'created_at': new_post.created_at.isoformat(),
    }

    from app import socketio

    socketio.emit('new_post', post_data, namespace='/')

    return jsonify({
        'id': new_post.id,
    }), 201

"""
    FEED
"""
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
        feed_data['created_at'] = post.created_at

        likes = [l.to_dict() for l in storage.all(Like).values() if l.post_id == post.id]
        feed_data['likes'] = likes
        feed.append(feed_data)
    
    return jsonify(feed), 200

"""
    POST REACTIONS
"""
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

@platform_views.route('/posts/comments/<post_id>', methods=['GET'])
@jwt_required()
def get_comments(post_id):
    ''' Gets all comments from a post '''

    if not post_id:
        return jsonify({"message": "Post not found!"}), 404

    post_inst = storage.get(Post, id=post_id)
    if not post_inst:
        return jsonify({"message": "Post not found!"}), 404

    post = post_inst.to_dict()
    user = storage.get(User, id=post['user_id']).to_dict()
    post_data = {
        'user_data': {
            'id': user['id'],
            'username': user['username'],
            'image_url': user['image_url'],
        },
        'id': post['id'],
        'content': post['content'],
        'image_url': post['image_url'],
        'created_at': post_inst.created_at,
    }
    comments = [c for c in storage.all(Comment, post_id=post_id).values() if c.post_id == post_id]
    comments_data = []
    for comment in comments:
        user = storage.get(User, id=comment.user_id).to_dict()
        comment_data = {
            'user_data': {
                'id': user['id'],
                'username': user['username'],
                'image_url': user['image_url'],
            },
            'id': comment.id,
            'content': comment.content,
            'created_at': comment.created_at,
        }
        comments_data.append(comment_data)

    return jsonify({
        'post_data': post_data,
        'comments': comments_data,
    }), 200

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

    updated_likes = [l.to_dict() for l in storage.all(Like).values() if l.post_id == post.id]

    like_data = {
        'post_id': post_id,
        'likes': updated_likes
    }

    from app import socketio

    socketio.emit('liked_post', like_data, namespace='/')

    return jsonify({"message": "Post liked successfully!"}), 201


"""
    USER INTERACTIONS
"""
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

@platform_views.route('/users/unfollow/<user_id>', methods=['DELETE'])
@jwt_required()
def unfollow_user(user_id):
    ''' Unfollows a user '''

    if not user_id:
        return jsonify({"message": "Invalid data!"}), 400
    
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"message": "User not found!"}), 404
    
    follows = storage.all(Follow)

    for id, follow in follows.items():
        if follow.follower_id == current_user.id and follow.followed_id == user_id:
            storage.delete(follow)
            storage.save()
            return jsonify({"message": "User unfollowed successfully!"}), 200
    
    return jsonify({"message": "User not followed!"}), 400

@platform_views.route('/users/removefollow/<user_id>', methods=['DELETE'])
@jwt_required()
def remove_follower(user_id):
    ''' Unfollows a user '''

    if not user_id:
        return jsonify({"message": "Invalid data!"}), 400
    
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"message": "User not found!"}), 404
    
    follows = storage.all(Follow)

    for id, follow in follows.items():
        if follow.followed_id == current_user.id and follow.follower_id == user_id:
            storage.delete(follow)
            storage.save()
            return jsonify({"message": "User unfollowed successfully!"}), 200
    
    return jsonify({"message": "User not removed!"}), 400

@platform_views.route('/users/followers/<user_id>', methods=['GET'])
@jwt_required()
def get_followers(user_id):
    ''' Gets all followers of a user '''

    if not user_id:
        return jsonify({"message": "Invalid data!"}), 400
    
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"message": "User not found!"}), 404
    
    followers_ids = [f.to_dict().get('follower_id') for f in storage.all(Follow).values() if f.followed_id == user_id]

    followers = []
    for id in followers_ids:
        user = storage.get(User, id=id).to_dict()
        del user['password_hash']
        del user['role']
        followers.append(user)

    if len(followers) == 0:
        return jsonify({"message": "No followers found!"}), 404

    return jsonify(followers), 200

@platform_views.route('/users/following/<user_id>', methods=['GET'])
@jwt_required()
def get_following(user_id):
    ''' Gets all users user is following '''

    if not user_id:
        return jsonify({"message": "Invalid data!"}), 400
    
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"message": "User not found!"}), 404
    
    following_ids = [f.to_dict().get('followed_id') for f in storage.all(Follow).values() if f.follower_id == user_id]

    following = []
    for id in following_ids:
        user = storage.get(User, id=id).to_dict()
        del user['password_hash']
        del user['role']
        following.append(user)

    if len(following) == 0:
        return jsonify({"message": "No followings found!"}), 404

    return jsonify(following), 200


@platform_views.route("/users/search", methods=["GET"], strict_slashes=False)
@jwt_required()
def query_users():
    ''' Searches for users by username '''
    username = request.args.get('query', '')

    if not username:
        return jsonify({"message": "Invalid data!"}), 400
    
    users_dicts = [u.to_dict() for u in storage.all(User).values() if username.lower() in u.username.lower()]

    users = []
    for user in users_dicts:
        del user['password_hash']
        del user['role']
        users.append(user)

    if len(users) == 0:
        return jsonify({"message": "No users found!"}), 404
    return jsonify(users), 200