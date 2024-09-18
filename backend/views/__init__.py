from flask import Blueprint

platform_views = Blueprint('platform_views', __name__, url_prefix='/social')
user_views = Blueprint('user_views', __name__, url_prefix='/wesync')

from views.social import *
from views.user import *