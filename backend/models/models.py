from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from sqlalchemy import Column, String, ForeignKey, Integer, Float, Text
from models.base import BaseModel, Base

class User(BaseModel, Base):
    """User class for e-commerce platform"""
    __tablename__ = 'users'

    username = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    password_hash = Column(String(250), nullable=False)
    phone = Column(String(20), nullable=True)

    role = Column(String(128), nullable=False)
    phone = Column(String(20), nullable=True)
    address = Column(String(20), nullable=True)

    orders = relationship('Order', backref='user', cascade='all, delete-orphan')

    def __init__(self, *args, **kwargs):
        """Initialize user with given arguments"""
        super().__init__(*args, **kwargs)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
   
class Order(BaseModel, Base):
    __tablename__ = 'orders'
    
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    order_date = Column(String(128), nullable=False)
    total_price = Column(Float, nullable=False)

    items = relationship('OrderItem', backref='order')

    def __init__(self, *args, **kwargs):
        """Initialize OrderItem with given arguments"""
        super().__init__(*args, **kwargs)

class OrderItem(BaseModel, Base):
    """OrderItem class for tracking items in an order"""
    __tablename__ = 'order_items'

    order_id = Column(String(60), ForeignKey('orders.id'), nullable=False)
    product_id = Column(String(60), ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    def __init__(self, *args, **kwargs):
        """Initialize OrderItem with given arguments"""
        super().__init__(*args, **kwargs)

class Product(BaseModel, Base):
    __tablename__ = 'products'
    
    name = Column(String(100), nullable=False)
    description = Column(String(500)) # db.Text
    price = Column(Float, nullable=False)
    brand = Column(String(50))
    stock_quantity = Column(Integer, nullable=False)
    image_url = Column(String(128), nullable=False)

    category_id = Column(String(60), ForeignKey('categories.id'), nullable=False)
    reviews = relationship('Review', backref='product')

    def __init__(self, *args, **kwargs):
        """Initialize OrderItem with given arguments"""
        super().__init__(*args, **kwargs)

class Category(BaseModel, Base):
    """Category class for categorizing products"""
    __tablename__ = 'categories'

    name = Column(String(128), nullable=False)

    products = relationship('Product', backref='category')

    def __init__(self, *args, **kwargs):
        """Initialize Category with given arguments"""
        super().__init__(*args, **kwargs)

class Review(BaseModel, Base):
    """Review class for product reviews"""
    __tablename__ = 'reviews'

    product_id = Column(String(60), ForeignKey('products.id'), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    review_text = Column(Text, nullable=False)
    rating = Column(Integer, nullable=False)
    review_date = Column(String(128), nullable=False)

    # product = relationship('Product', back_populates='reviews')
    user = relationship('User')

    def __init__(self, *args, **kwargs):
        """Initialize Review with given arguments"""
        super().__init__(*args, **kwargs)
