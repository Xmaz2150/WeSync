from flask import Blueprint

shop_views = Blueprint('shop_views', __name__, url_prefix='/shop')
user_views = Blueprint('user_views', __name__)

from views.shop import *
from views.user import *