from flask import Flask
from views import shop_views
from views import user_views
from models.models import db, User
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.register_blueprint(shop_views)
app.register_blueprint(user_views)

app.config.from_object('config.Config')
db.init_app(app)
jwt = JWTManager(app)

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


if __name__ == "__main__":
    app.run(debug=True)
