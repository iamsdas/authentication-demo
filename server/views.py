from flask import Blueprint, session
from flask.globals import request
from werkzeug.security import generate_password_hash, check_password_hash
from extentions import mongo

main = Blueprint('main', __name__)


# API route for user signup
@main.route('/signup', methods=['POST'])
def sign_up():
    required_fields = ['first_name', 'last_name', 'email', 'password']
    user_response = request.get_json()  # sent from the client
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


# API route for user signin
@main.route('/signin', methods=['POST'])
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


# API route for signing out
@main.route('/signout', methods=['POST'])
def sign_out():
    if 'user' in session:
        session.pop('user')  # clear session details
    return 'signed out', 200
