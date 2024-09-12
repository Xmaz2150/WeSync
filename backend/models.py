from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize SQLAlchemy instance to handle database operations
db = SQLAlchemy()


# Model class for 'User', representing users in the database
class User(db.Model):
    # Unique identifier for each user
    id = db.Column(db.Integer, primary_key=True)
    # Username field, must be unique and not null
    username = db.Column(db.String(80), unique=True, nullable=False)
    # Email field, must be unique and not null
    email = db.Column(db.String(120), unique=True, nullable=False)
    # Stores the hashed password of the user
    password_hash = db.Column(db.String(128), nullable=False)

    # Method to set password, storing its hashed version
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # Method to check if the provided password matches the hashed password
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Model class for 'Product', representing products in the database
class Product(db.Model):
    # Unique identifier for each product
    id = db.Column(db.Integer, primary_key=True)
    # Name of the product, must not be null
    name = db.Column(db.String(100), nullable=False)
    # Description of the product, must not be null
    description = db.Column(db.Text, nullable=False)
    # Price of the product, must not be null
    price = db.Column(db.Float, nullable=False)
