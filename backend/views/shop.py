from flask import jsonify, request
from models import storage
from models.models import Product, Category
from views import shop_views
from flask_jwt_extended import jwt_required, get_jwt
from views.helpers import role_required

@jwt_required()
@shop_views.route('/products', methods=['GET'])
def get_products():
    ''' Gets all the users by category all if not specified '''
    data = request.get_json()
    category = data.get('category')

    if not category:
        return jsonify({"message": "Invalid data!"}), 400

    products = [p.to_dict() for key, p in storage.all(Product, category).items()]

    if category == 'ALL':
        return jsonify({ 'All products': products})
    return jsonify({ category: products})

@shop_views.route('/product', methods=['POST'])
@jwt_required()
@role_required('admin')
def protected():
    ''' Adds new productus to database '''
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    brand = data.get('brand')
    stock_quantity = data.get('stock_quantity')
    category =  data.get('category')

    if not name or not description or not price \
        or not brand or not stock_quantity \
        or not category:
        return jsonify({"message": "Invalid data!"}), 400

    new_product = Product(
        name = name,
        description=description,
        price=float(price),
        brand=brand,
        stock_quantity=int(stock_quantity),
        category_id=storage.get(Category, name=category).id
    )

    new_product.save()
    return jsonify({'Successfully created PRODUCT': {
        'id': new_product.id,
        'name': new_product.name
    }}), 201
