import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } = useAuth0();
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !hasSaved) {
      const saveUserData = async () => {
        try {
          // Retrieve text from local storage
          const userKey = `${user.email}`;
          const text = localStorage.getItem(userKey);

          await axios.post('http://localhost:5000/users', {
            email: user.email,
            name: user.name,
            picture: user.picture,
            text: text || '', // Include text if available
          });
          setHasSaved(true); // Mark as saved to prevent duplicate saves
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      };

      saveUserData();
    }
  }, [isAuthenticated, user, hasSaved]);

  return (
    <div className='flex my-4 bg-sky-100 mx-auto md:w-[500px] w-[350px]  shadow-lg py-2 pl-4 pr-2 rounded-[10px] gap-2 justify-between items-center'>
      <NavLink to={'/'} className="text-blue-950 font-medium hover:text-blue-900 ">Home</NavLink>
      <NavLink to={'/profile'} className="text-blue-950 font-medium hover:text-blue-900 ">Profile</NavLink>
      <div className="">
      {!isLoading && !user && (
        <button className='bg-blue-950 text-white rounded-[10px] py-2 px-4 hover:bg-blue-900' onClick={() => loginWithRedirect()}>Login</button>
      )}
      {!isLoading && user && (
        <>
          <button className='bg-blue-950 text-white rounded-[10px] py-2 px-4 hover:bg-blue-900'  onClick={() => logout()}>Log out</button>
        </>
      )}
      </div>
    </div>
  );  
}
