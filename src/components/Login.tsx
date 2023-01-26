import React, { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from "../firebase/firebase";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useAppSelector } from "../hooks/redux";

const Login = () => {
  const user = useAppSelector(state => state.firebase.user)

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(result => result)
      .catch(error => console.log(error))
  }

  const handleLogout = () => {
    signOut(auth)
      .then(result => result)
      .catch(error => console.log(error))
  }


  return (
    <div className='container mx-auto mb-5'>
      <div className='flex gap-10 items-center'>
        {user
          ?
            <button className='bg-orange-500 hover:bg-orange-600 hover:text-white transition-colors px-4 py-1 rounded-sm font-semibold' onClick={handleLogout}>logout</button>
          :
            <button className='bg-red-500 hover:bg-red-600 hover:text-white transition-colors px-4 py-1 rounded-sm font-semibold' onClick={handleGoogleLogin}>Login</button>
        }
        {user
          ? <div className='text-lg font-bold text-stone-700'>Hello {user.displayName}</div>
          : <></>
        }
      </div>
    </div>
  );
};

export default Login;
