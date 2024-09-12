from flask import request, jsonify
from models.models import User, db
from flask_jwt_extended import create_access_token, jwt_required, current_user
from views import user_views 


@user_views.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({"message": "Invalid data!"}), 400

    if data.get('flag') == 'su':
        role = 'admin'
    else:
        role = 'user'

    new_user = User(username=username, email=email, role=role)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201


@user_views.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"message": "Invalid data!"}), 400

    user = User.query.filter_by(email=email).first()
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
def protected():
    return jsonify(
        id=current_user.id,
        username=current_user.username,
        role=current_user.role,
    )