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

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
