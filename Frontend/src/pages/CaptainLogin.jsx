import React, { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = ({ email:email, password:password });
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)
    
        if (response.status === 200){
          const data = response.data;
          setCaptain(data.captain)
          localStorage.setItem('token', data.token)
          navigate('/captain-home')
        }

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