# Authentication Web App
This is a full stack web made using Flask, React.js, and TailwindCSS. It has a sign in, sign up and a home page which is visible when the user signs in.
## Setup
Make sure to have python v3.8 and node v14 for optimal experience
### Cloning the repo
```
git clone https://github.com/iamsdas/authentication-demo
cd authentication-demo
```
### Installing dependancies
```
# frontend
yarn
# backend
cd server
pip install -r requirements.txt
```
### Environment variables
* Make the `./.env` file and set the url of the backend server:
```
REACT_APP_URL=<BACKEND SERVER URL>
```
* Make the `./server/.env` file and add the following environment variables:
```
DATABASE_URL=<ADD DATABASE URL>
SECRET_KEY=<ADD ANY RANDOM ALPHA NUMERIC SECRET>
```
### Usage
```
# frontend
yarn start
# backend
flask run
```
### Testing
After configuring the backend we can run the unit tests with pytest
```
cd server
pytest
```
