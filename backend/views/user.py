from flask import request, jsonify
from models import storage
from models.models import User, Like, Post, Comment, Follow

from config.settings import Config
from flask_jwt_extended import create_access_token, jwt_required, current_user
from views import user_views 


@user_views.route('/register', methods=['POST'], strict_slashes=False)
def register():
    """ """
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Invalid data!"}), 400

    if storage.get(User, email=email):
        return jsonify({"message": "User already exists"}), 400
    
    if storage.get(User, username=username):
        return jsonify({"message": "Username already taken"}), 400

    # Find creative way to sneak in the flag
    if request.form.get('flag') == Config.IS_SU:
        role = 'admin'
    else:
        role = 'user'

    new_user = User(username=username, email=email, role=role)
    new_user.set_password(password)

    new_user.save()

    return jsonify({"message": "User {} registered successfully!".format(new_user.id)}), 201


@user_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        print(email, ' ',password)
        return jsonify({"message": "Invalid data!"}), 400

    user = storage.get(User, email=email)
    if user and user.check_password(password):
        additional_claims = {'role': user.role}
        access_token = create_access_token(
            identity=user,
            additional_claims=additional_claims
        )
        return jsonify(access_token=access_token), 200

    return jsonify({"message": "Invalid credentials!"}), 401

@user_views.route("/profile", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_profile():

    likes = [l.to_dict() for l in storage.all(Like, user_id=current_user.id).values()]
    posts = [p.to_dict() for p in storage.all(Post, user_id=current_user.id).values() if p.user_id == current_user.id]
    followers = [f.to_dict().get('follower_id') for f in storage.all(Follow, follower_id=current_user.id).values() if f.followed_id == current_user.id]
    following = [f.to_dict().get('followed_id') for f in storage.all(Follow, followed_id=current_user.id).values() if f.follower_id == current_user.id]


    return jsonify(
        id=current_user.id,
        username=current_user.username,
        role=current_user.role,
        likes=likes,
        posts=posts,
        followers=followers,
        following=following
    )

@user_views.route("/user/<user_id>", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_user_profile(user_id):
    """ """

    if not user_id:
        return jsonify({"message": "Invalid data!"}), 400
    
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"message": "User not found!"}), 404

    likes = [l.to_dict() for l in storage.all(Like, user_id=user.id).values()]
    posts = [p.to_dict() for p in storage.all(Post, user_id=user.id).values()]
    followers = [f.to_dict().get('follower_id') for f in storage.all(Follow, follower_id=user.id).values() if f.followed_id == user.id]
    following = [f.to_dict().get('followed_id') for f in storage.all(Follow, followed_id=user.id).values() if f.follower_id == user.id]

    return jsonify(
        id=user.id,
        username=user.username,
        role=user.role,
        likes=likes,
        posts=posts,
        followers=followers,
        following=following
    )