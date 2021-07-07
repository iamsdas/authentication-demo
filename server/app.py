from os import getenv
from flask import Flask
from flask_cors import CORS
from views import main
from extentions import mongo


# initialize and return flask app
def create_app(testing=False):
    app = Flask(__name__)
    app.config.from_pyfile('config.py')
    app.testing = testing
    CORS(app, supports_credentials=True)  # credentials for session
    mongo.init_app(app)
    app.register_blueprint(main)
    return app
