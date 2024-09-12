import os


# Configuration class for setting up Flask app's environment and variables
class Config:
    # Configures the database URI.
    # It first checks for an environment variable 'DATABASE_URL'.
    # If not found,it defaults to using local SQLite database ('shop_ease.db').
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL') or 'sqlite:///shop_ease.db'
    # Disables tracking modifications of objects to save memory and improve
    # performance.
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Secret key for Flask's session management and form security
    # defaults to 'supersecretkey'
    # if not provided via environment variable.
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    # Secret key for JSON Web Token (JWT) encoding and decoding,
    # defaults to 'supersecretjwtkey'
    # if not provided via environment variable.
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'supersecretjwtkey')
