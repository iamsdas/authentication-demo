from os import getenv
from flask import Flask, session
from flask.globals import request
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['MONGO_URI'] = getenv('DATABASE_URL')
app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True)
CORS(app, supports_credentials=True)
mongo = PyMongo(app)
app.secret_key = getenv('SECRET_KEY')


@app.route('/signup', methods=['POST'])
def sign_up():
    required_fields = ['first_name', 'last_name', 'email', 'password']
    user_response = request.get_json()
    users_collection = mongo.db.users
    new_user = {}

    if not request.is_json:
        return 'invalid input', 400

    for field in required_fields:
        if not user_response.get(field):
            return 'missing input', 400

        value = user_response.get(field)
        if field == 'password':
            value = generate_password_hash(value)

        new_user[field] = value

    if users_collection.find_one({'email': new_user.get('email')}):
        return 'account exists', 409

    users_collection.insert_one(new_user)
    return 'added user', 200


@app.route('/signin', methods=['POST'])
def sign_in():
    required_fields = ['email', 'password']
    user_response = request.get_json()
    users_collection = mongo.db.users

    if not request.is_json:
        return 'invalid input', 400

    for field in required_fields:
        if not user_response.get(field):
            return 'missing input', 400

    user = users_collection.find_one({'email': user_response.get('email')})
    if user:
        if(check_password_hash(user['password'], user_response.get('password'))):
            session['user'] = {'email': user.get('email')}
            return {'email': user.get('email'),
                    'fname': user.get('first_name'),
                    'lname': user.get('last_name')}, 200

    return 'incorrect credentials', 403


@app.route('/signout', methods=['POST'])
def sign_out():
    if 'user' in session:
        session.pop('user')
    return 'signed out', 200


@app.route('/data', methods=['GET'])
def sign_out():
    if 'user' in session:
        return 'secret info', 200
    return 'unauthorized', 401


if __name__ == 'main':
    app.run(debug=True, port=5000)
