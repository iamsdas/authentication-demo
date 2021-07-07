import axios from 'axios';
import React, { useState } from 'react';
import { url } from '../env';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lname, setLname] = useState('');
  const [fname, setFname] = useState('');

  const history = useHistory();

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/signup`, {
        email,
        password,
        last_name: lname,
        first_name: fname,
      })
      .then((res) => {
        // if successfull then redirect to signin page
        if (res.status === 200) {
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-200 to-gray-300 flex justify-center items-center text-gray-700'>
      {/* card ui */}
      <div className='max-w-2xl bg-white p-4 font-medium rounded-lg'>
        <div className='text-5xl pb-6'>
          <span className='uppercase font-bold block border-gray-600 text-gray-700 text-center'>
            Sign Up
          </span>
        </div>
        <form className='block text-lg' onSubmit={formSubmit}>
          {/* first name */}
          <div className='pb-2'>
            <label htmlFor='fname' className='text-md'>
              Fist Name
            </label>
            <input
              required
              type='text'
              id='fname'
              placeholder='enter first name'
              className='border-gray-500 focus:border-gray-700 hover:border-gray-600 bg-gray-50 border-2 rounded-sm p-2 w-full'
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
          </div>
          {/* last name */}
          <div className='pb-2'>
            <label htmlFor='lname' className='text-md'>
              Last Name
            </label>
            <input
              required
              type='text'
              id='lname'
              placeholder='enter last name'
              className='border-gray-500 focus:border-gray-700 hover:border-gray-600 bg-gray-50 border-2 rounded-sm p-2 w-full'
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
          </div>
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
          {/* sign up button */}
          <button
            type='submit'
            className='uppercase text-white border-4 border-gray-700 bg-gray-700 hover:border-gray-800 hover:bg-gray-800 rounded-xl px-3 py-2 font-semibold w-full'>
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
