from flask import Flask, send_from_directory, jsonify
from views import platform_views
from views import user_views
from models import storage
from models.models import User
from config.settings import Config
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin

from flask_socketio import SocketIO, emit


app = Flask(__name__)
CORS(app,
  resources={r'/*': {'origins': '*'}},
  supports_credentials=True
)

app.register_blueprint(platform_views)
app.register_blueprint(user_views)

app.config.from_object('config.settings.Config')

jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")


""" Pre request User Look up """
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return storage.get(User, id=identity)


""" Custom Error handlers"""
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({ "Page not found": 404 }), 404

@app.errorhandler(415)
def method_not_allowed(e):
    return jsonify({ "Unsupported Media Type": 415 }), 415

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({ "Method not allowed": 405 }), 405


""" Home Route and image server """
@app.route('/')
def home():
    return jsonify({"message": "Welcome to WeSync API"})

@app.route('/wesync/img/<filename>', methods=['GET'])
def serve_image(filename):
    try:
        return send_from_directory(Config.UPLOAD_FOLDER, filename)
    except:
        return jsonify({"message": "Image not found!"}), 404


""" WebSockets"""
@socketio.on('connect')
def on_connect():
    print('Someone connected!')

@socketio.on('disconnect')
def on_disconnect():
    print('Someone disconnected!')


if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)
