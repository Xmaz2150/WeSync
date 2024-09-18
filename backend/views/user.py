from flask import request, jsonify
from models import storage
from models.models import User

from config.settings import Config
from flask_jwt_extended import create_access_token, jwt_required, current_user
from views import user_views 


@user_views.route('/register', methods=['POST'])
def register():
    return jsonify({"message": "Register functionality coming soon!"}), 200

@user_views.route('/login', methods=['POST'])
def login():
    return jsonify({"message": "Login functionality coming soon!"}), 200

@user_views.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    return jsonify(
        id=current_user.id,
        username=current_user.username,
        role=current_user.role,
        likes=current_user.likes,
        posts=current_user.posts,
        followers=current_user.followers,
        following=current_user.following
    )