import React, {useEffect} from "react";
import { Link } from "react-router-dom";

const Start = () => {
  useEffect(()=>{
    if(window.innerWidth > 700){
    alert("Your screen size is big, please try in phone size")
    }
  })
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-200">
        <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to='/user-login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
