# Authentication Web App
This is a full stack web made using Flask, React.js, and TailwindCSS. It has a sign in, sign up and a home page which is visible when the user signs in.
## Setup
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
* In the `./src/env.js` file, set the url of the backend server during production in the `PRODUCTION` variable.
* Make the `./server/.env` file and add the following environment variables:
```
DATABASE_URL=<ADD DATABASE URL>
SECRET_KEY=<ADD ANY RANDOM ALPHA NUMERIC SECRET>
```
### Testing
After configuring the backend run the unit test with pytest
```
cd server
pytest
```
