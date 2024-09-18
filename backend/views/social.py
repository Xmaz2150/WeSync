from typing import cast

from flask import jsonify, request, redirect, url_for
from models import storage
from utils.file import upload_file, rename_file
from config.settings import Config
from datetime import datetime
from models.models import Follow, Post, Comment, Like
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
    return jsonify({"message": "Coming Soon!!"}), 404

@platform_views.route('/posts/<post_id>/comments', methods=['POST'])
@jwt_required()
def create_comment(post_id):
    ''' Adds new comment to a post '''
    return jsonify({"message": "Coming Soon!!"}), 404

@platform_views.route('/posts/<post_id>/like', methods=['POST'])
@jwt_required()
def like_post(post_id):
    ''' Likes a post '''
    return jsonify({"message": "Coming Soon!!"}), 404

@platform_views.route('/users/<user_id>/follow', methods=['POST'])
@jwt_required()
def follow_user(user_id):
    ''' Follows a user '''
    return jsonify({"message": "Coming Soon!!"}), 404
