from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from models import db, User, Product

# Initialize Flask app and configure it using settings from config.py
app = Flask(__name__)
app.config.from_object('config.Config')
# Initialize the SQLAlchemy database instance
db.init_app(app)
# Initialize JWT for managing user authentication
jwt = JWTManager(app)


# Route to handle user registration
@app.route('/register', methods=['POST'])
def register():
    """
    Registers a new user by creating an entry in the database.
    Expects 'username', 'email', and 'password' in the request body.
    """
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

# Route to handle user login
@app.route('/login', methods=['POST'])
def login():
    """
    Authenticates a user using email and password.
    Returns a JWT access token if credentials are valid.
    """
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials!"}), 401


# Route to retrieve the list of products
@app.route('/products', methods=['GET'])
def get_products():
    """
    Retrieves all products from the database and returns them
    as a JSON array containing 'name', 'description', and 'price'.
    """
    products = Product.query.all()
    return jsonify([{"name": p.name,
                     "description": p.description,
                     "price": p.price} for p in products])
