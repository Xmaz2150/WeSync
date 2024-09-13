from flask import Flask
from views import shop_views
from views import user_views
from models import storage
from models.models import User, Category
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.register_blueprint(shop_views)
app.register_blueprint(user_views)

app.config.from_object('config.Config')

jwt = JWTManager(app)

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return storage.get(User, id=identity)


if __name__ == "__main__":
    app.run(debug=True)
