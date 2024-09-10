from flask import Flask
from routes import app as routes_app
from models import db

app = routes_app

if __name__ == "__main__":
    app.run(debug=True)
