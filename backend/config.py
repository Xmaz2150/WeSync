import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL') or 'sqlite:///shop_ease.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'supersecretjwtkey')
