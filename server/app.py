from os import getenv
from flask import Flask, session
from flask.globals import request
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = getenv('DATABASE_URL')
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
            user.pop('_id')
            user.pop('password')
            session['user'] = user
            return 'authenticated', 200

    return 'incorrect credentials', 403


@app.route('/signout', methods=['POST'])
def sign_out():
    if 'user' in session:
        session.pop('user')
    return 'signed out', 200


if __name__ == 'main':
    app.run(debug=True, port=5000)
