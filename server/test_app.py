from flask.testing import FlaskClient
import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app(testing=True)
    with app.test_client() as client:
        yield client


# check response code of the signup API
def test_1_signup_status(client: FlaskClient):
    cases = [
            [{'email': 'a@b.com',
              'password': 'pass', 'first_name': 'a', 'last_name': 'b'}, 200],  # sucess
            [{'email': 'a@b.com'}, 400],  # incomplete
            [{'email': 'a@b.com',
              'password': 'pass', 'first_name': 'a', 'last_name': 'b'}, 409]  # duplicate
    ]
    for (user_info, value) in cases:
        response = client.post('/signup', json=user_info)
        status = response.status_code
        assert status == value


# check response code of signin API
def test_2_sigin_status(client: FlaskClient):
    cases = [
        [{'email': 'a@b.com', 'password': 'pass'}, 200],  # success
        [{'email': 'a@b.com'}, 400],  # incomplete
        [{'email': 'a@b.com', 'password': 'pa'}, 403]  # wrong
    ]
    for (user_info, value) in cases:
        response = client.post('/signin', json=user_info)
        status = response.status_code
        assert status == value
