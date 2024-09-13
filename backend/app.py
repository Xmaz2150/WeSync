from flask import Flask
from routes import app as routes_app
from models import db

# Initialize the Flask application by using the app defined in routes.py
app = routes_app

# Run the application only if this script is executed directly.
# The app will run in debug mode, which provides detailed error pages and
# automatically reloads the server when changes are made to the code.
if __name__ == "__main__":
    app.run(debug=True)
