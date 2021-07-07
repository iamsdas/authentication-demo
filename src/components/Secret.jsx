import React, { useContext } from 'react';
import { UserContext } from '../App';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { url } from '../env';

const Secret = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  // if not signed in redirect to signin page
  if (!user) {
    history.push('/signin');
    return 'redirecting to signin page...';
  } else
    return (
      <div className='min-h-screen bg-gradient-to-r from-gray-200 to-gray-300 flex justify-center items-center text-gray-700'>
        {/* card ui */}
        <div className='max-w-2xl bg-white p-4 font-medium rounded-lg'>
          <div className='pb-6 w-full text-xl'>
            <div className='font-bold text-2xl pb-2'>
              Welcome {user.fname} {user.lname},
            </div>
            <div>You have successfully signed in</div>
          </div>
          {/* sign out button */}
          <button
            className='uppercase text-white border-4 border-gray-700 bg-gray-700 hover:border-gray-800 hover:bg-gray-800 rounded-xl px-3 py-2 font-semibold w-full'
            onClick={() => {
              axios.post(`${url}/signout`, {}, { withCredentials: true });
              setUser(null);
              history.push('/signin');
            }}>
            sign out
          </button>
        </div>
      </div>
    );
};

export default Secret;
