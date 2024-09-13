from flask import jsonify
from models.models import Product
from views import shop_views
from flask_jwt_extended import jwt_required, get_jwt
from views.helpers import role_required


@shop_views.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{"name": p.name,
                     "description": p.description,
                     "price": p.price} for p in products])

@shop_views.route('/product', methods=['POST'])
@jwt_required()
@role_required('admin')
def protected():
    ''' Adds new productus to database '''
    return 'Hello admin'
