import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [text, setText] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      const userKey = `${user.email}`;
      const savedText = localStorage.getItem(userKey);
      if (savedText) {
        setText(savedText);
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userKey = `${user.email}`;
      localStorage.setItem(userKey, text);
    }
  }, [text, isAuthenticated, user]);

  return (
    <div className=' text-sky-200 gap-3 flex flex-col font-medium'>
      <p className='text-lg'>Profile of the user</p>
      
      {isAuthenticated && user ? (
        <div className='flex bg-sky-100 shadow-lg text-blue-900  flex-col'>
        <div className="p-4 flex justify-center flex-col items-center ">
        <img src={user?.picture} className='rounded-full w-10' alt='user picture'/>
          
        <p>{user?.name}</p>
        <p>{user?.email}</p>

      </div>
          <p className='pb-2'>Describe yourself here:</p>
          <textarea
            className='text py-1 bg-sky-100 px-2 focus:outline-none'
            id='text'
            onChange={(e) => setText(e.target.value)}
            value={text}
            rows={10}
            cols={30}
          />
        </div>

      ):<>Login to see the data</>}
    </div>
  );
}
