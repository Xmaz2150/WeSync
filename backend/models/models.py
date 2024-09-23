from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from sqlalchemy import Column, String, ForeignKey, Text
from models.base import BaseModel, Base

NAME = 200
EMAIL = 125 
LONG_TEXT = 500
SHORT_TEXT = 150
SHORT_SHORT_TEXT = 50

class User(BaseModel, Base):
    """ User model """
    __tablename__ = 'users'

    username = Column(String(NAME), nullable=False, unique=True)
    email = Column(String(EMAIL), nullable=False, unique=True)
    password_hash = Column(String(LONG_TEXT), nullable=False)
    phone = Column(String(SHORT_SHORT_TEXT), nullable=True)
    role = Column(String(SHORT_SHORT_TEXT), nullable=False)
    image_url = Column(String(LONG_TEXT), nullable=True)
    bio = Column(String(SHORT_TEXT), nullable=True)
    city = Column(String(SHORT_TEXT), nullable=True)

    posts = relationship('Post', backref='author', lazy=True)
    comments = relationship('Comment', backref='author', lazy=True)
    likes = relationship('Like', backref='user', lazy=True)
    followers = relationship('Follow', foreign_keys='Follow.followed_id', backref='followed', lazy=True)
    following = relationship('Follow', foreign_keys='Follow.follower_id', backref='follower', lazy=True)


    def __init__(self, *args, **kwargs):
        """Initialize user with given arguments"""
        super().__init__(*args, **kwargs)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Follow(BaseModel, Base):
    __tablename__ = 'follows'

    follower_id = Column(String(SHORT_SHORT_TEXT), ForeignKey('users.id'), nullable=False)
    followed_id = Column(String(SHORT_SHORT_TEXT), ForeignKey('users.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        """Initialize user with given arguments"""
        super().__init__(*args, **kwargs)

class Post(BaseModel, Base):
    __tablename__ = 'posts'

    content = Column(Text, nullable=False)

    user_id = Column(String(SHORT_SHORT_TEXT), ForeignKey('users.id'), nullable=False)
    comments = relationship('Comment', backref='post', lazy=True)
    likes = relationship('Like', backref='post', lazy=True)
    image_url = Column(String(LONG_TEXT), nullable=True)

    def __init__(self, *args, **kwargs):
        """Initialize OrderItem with given arguments"""
        super().__init__(*args, **kwargs)

class Comment(BaseModel, Base):
    __tablename__ = 'comments'

    content = Column(Text, nullable=False)
    image_url = Column(String(LONG_TEXT), nullable=True)

    user_id = Column(String(SHORT_SHORT_TEXT), ForeignKey('users.id'), nullable=False)
    post_id = Column(String(SHORT_SHORT_TEXT), ForeignKey('posts.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        """Initialize Review with given arguments"""
        super().__init__(*args, **kwargs)

class Like(BaseModel, Base):
    __tablename__ = 'likes'

    user_id = Column(String(SHORT_SHORT_TEXT), ForeignKey('users.id'), nullable=False)
    post_id = Column(String(SHORT_SHORT_TEXT), ForeignKey('posts.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        """Initialize Review with given arguments"""
        super().__init__(*args, **kwargs)