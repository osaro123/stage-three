import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase-config'

const Header = () => {
  const logOut = async () => {
    try{
      await signOut(auth)
      console.log("done");
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div className='flex items-center justify-between py-8'>
        <p className='font-semibold text-xl'>Image Gallery</p>
        <button className='bg-[#212121] text-white py-2 px-4 rounded-3xl' onClick={() => logOut()}>Sign Out</button>
    </div>
  )
}

export default Header


