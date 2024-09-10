from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from models import db, User, Product

app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)
jwt = JWTManager(app)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials!"}), 401


@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{"name": p.name,
                     "description": p.description,
                     "price": p.price} for p in products])
