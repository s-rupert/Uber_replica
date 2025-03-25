import React, { useState} from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email:email, password:password });
    console.log(captainData);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
       <div>
      <img className="w-16 mb-5" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />
      <form onSubmit={
        (e) => submitHandler(e)
      }>
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#eee] mb-7 rounded px-4 py-2 w-full boarder text-lg placeholder:text-base"
        type="email"
        placeholder="Email"/>
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="bg-[#eee] mb-7 rounded px-4 py-2 w-full boarder text-lg placeholder:text-base"
        placeholder="Password"/>
        <button className='bg-[#111] mb-7 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base'>
          Login
        </button>
      </form>
      <p className="text-center mb-1">Join a Fleet. <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to="/user-login" className='flex items-center justify-center bg-[#056] mb-7 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  );
};

export default CaptainLogin;