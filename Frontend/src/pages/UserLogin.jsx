import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userDate= {
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userDate);

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
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
        <p className="text-center">New here? <Link to="/user-signup" className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link to="/captain-login" className='flex items-center justify-center bg-[#056] mb-7 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;
