from flask import Flask, send_from_directory, jsonify
from views import platform_views
from views import user_views
from models import storage
from models.models import User
from config.settings import Config
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app,
  resources={r'/*': {'origins': '*'}},
  supports_credentials=True
)

app.register_blueprint(platform_views)
app.register_blueprint(user_views)

app.config.from_object('config.settings.Config')

jwt = JWTManager(app)

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return storage.get(User, id=identity)

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({ "Page not found": 404 }), 404

@app.errorhandler(415)
def method_not_allowed(e):
    return jsonify({ "Unsupported Media Type": 415 }), 415

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({ "Method not allowed": 405 }), 405

@app.route('/')
def home():
    return jsonify('Welcome to WeSync API')

@app.route('/wesync/<filename>', methods=['GET'])
def serve_image(filename):
    try:
        return send_from_directory(Config.UPLOAD_FOLDER, filename)
    except:
        return jsonify({"message": "Image not found!"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0")
