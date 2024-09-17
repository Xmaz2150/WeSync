from flask import request, jsonify
from models import storage
from models.models import User
<<<<<<< HEAD
=======
from config.settings import Config
>>>>>>> b3c69bca5c59c6b9336449ca495b4708c3f79329
from flask_jwt_extended import create_access_token, jwt_required, current_user
from views import user_views 


@user_views.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
<<<<<<< HEAD
    if not username or not email or not password:
        return jsonify({"message": "Invalid data!"}), 400

    if data.get('flag') == 'su':
=======
    if storage.get(User, email=email):
        return jsonify({"message": "User already exists"}), 400

    if not username or not email or not password:
        return jsonify({"message": "Invalid data!"}), 400

    print(data.get('flag'))
    if data.get('flag') == Config.IS_SU:
>>>>>>> b3c69bca5c59c6b9336449ca495b4708c3f79329
        role = 'admin'
    else:
        role = 'user'

    new_user = User(username=username, email=email, role=role)
    new_user.set_password(password)

    new_user.save()
<<<<<<< HEAD
    # or
    # storage.new(new_user)
=======
>>>>>>> b3c69bca5c59c6b9336449ca495b4708c3f79329

    return jsonify({"message": "User {} registered successfully!".format(new_user.id)}), 201


@user_views.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        print(email, ' ',password)
        return jsonify({"message": "Invalid data!"}), 400

<<<<<<< HEAD
    # user = User.query.filter_by(email=email).first()
=======
>>>>>>> b3c69bca5c59c6b9336449ca495b4708c3f79329
    user = storage.get(User, email=email)
    if user and user.check_password(password):
        additional_claims = {'role': user.role}
        access_token = create_access_token(
            identity=user,
            additional_claims=additional_claims
        )
        return jsonify(access_token=access_token), 200

    return jsonify({"message": "Invalid credentials!"}), 401

@user_views.route("/profile", methods=["GET"])
@jwt_required()
<<<<<<< HEAD
def protected():
=======
def get_profile():
>>>>>>> b3c69bca5c59c6b9336449ca495b4708c3f79329
    return jsonify(
        id=current_user.id,
        username=current_user.username,
        role=current_user.role,
    )