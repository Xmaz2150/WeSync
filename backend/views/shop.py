from flask import jsonify
from models.models import Product
from views import shop_views


@shop_views.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{"name": p.name,
                     "description": p.description,
                     "price": p.price} for p in products])
