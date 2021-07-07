from os import getenv
from dotenv import load_dotenv
load_dotenv()

MONGO_URI = getenv('DATABASE_URL')
SECRET_KEY = getenv('SECRET_KEY')
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
