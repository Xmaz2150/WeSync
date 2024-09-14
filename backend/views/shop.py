from flask import jsonify, request
from models import storage
from utils.file import upload_file, rename_file
from config.settings import Config
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
    
    file = request.files['file']
    name = request.form.get('name')
    description = request.form.get('description')
    price = request.form.get('price')
    brand = request.form.get('brand')
    stock_quantity = request.form.get('stock_quantity')
    category = request.form.get('category')

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

    image_name = upload_file(file)
    new_product.image_url = image_name
    new_product.save()
    
    ''' Workaround to make image_url saveable with correct url'''
    product_update = storage.get(Product, id=new_product.id)
    url_prefix = Config.IMG_URL_PREFIX
    product_update.image_url = '{}{}.{}'.format(url_prefix, new_product.id, image_name)
    rename_file(image_name, '{}.{}'.format(new_product.id, image_name))
    product_update.save()

    return jsonify({'Successfully created PRODUCT': {
        'id': new_product.id,
        'name': new_product.name,
        'image_url': product_update.image_url
    }}), 201
