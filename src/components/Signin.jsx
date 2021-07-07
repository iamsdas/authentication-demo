import axios from 'axios';
import React, { useState, useContext } from 'react';
import { url } from '../env';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/signin`, { email, password }, { withCredentials: true })
      .then((res) => {
        // if successfull then set user state and redirect to '/'
        if (res.status === 200) {
          setUser({
            email,
            fname: res.data.fname,
            lname: res.data.lname,
          });
          history.push('/');
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-200 to-gray-300 flex justify-center items-center text-gray-700'>
      {/* card ui */}
      <div className='max-w-2xl bg-white p-4 font-medium rounded-lg'>
        <div className='text-5xl pb-6'>
          <span className='uppercase font-bold block border-gray-600 text-gray-700 text-center'>
            Sign In
          </span>
        </div>
        <form className='block text-lg' onSubmit={formSubmit}>
          {/* email */}
          <div className='pb-2'>
            <label htmlFor='email' className='text-md'>
              Email
            </label>
            <input
              required
              type='email'
              id='email'
              placeholder='enter email address'
              className='border-gray-500 focus:border-gray-700 hover:border-gray-600 bg-gray-50 border-2 rounded-sm p-2 w-full'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          {/* password */}
          <div className='pb-8'>
            <label htmlFor='password' className='text-md'>
              Password
            </label>
            <input
              required
              type='password'
              id='password'
              placeholder='enter password'
              className='border-gray-500 focus:border-gray-700 hover:border-gray-600 bg-gray-50 border-2 rounded-sm p-2 w-full'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {/* sign in button */}
          <button
            type='submit'
            className='uppercase text-white border-4 border-gray-700 bg-gray-700 hover:border-gray-800 hover:bg-gray-800 rounded-xl px-3 py-2 font-semibold w-full'>
            sign in
          </button>
          {/* sign up */}
          <div className='pt-2'>
            <a href='/signup'>Dont have an account? Sign up here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
