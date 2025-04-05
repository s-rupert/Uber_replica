import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = ({
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    });
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201){
      const data = response.data;
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehicleType("");
    setVehiclePlate("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="logo"
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-3">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eee] rounded px-4 py-2 w-1/2 boarder text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eee] rounded px-4 py-2 w-1/2 boarder text-lg placeholder:text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eee] mb-3 rounded px-4 py-2 w-full boarder text-lg placeholder:text-base"
            type="email"
            placeholder="Email"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-[#eee] mb-3 rounded px-4 py-2 w-full boarder text-lg placeholder:text-base"
            placeholder="Password"
          />
          <h3 className="text-base font-medium mb-2">Vehicle Details</h3>
          <div className="flex gap-4 mb-3">
            <input
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eee] rounded px-4 py-2 w-1/2 boarder text-lg placeholder:text-sm"
              type="text"
              placeholder="Vehicle Color"
            />
            <input
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eee] rounded px-4 py-2 w-1/2 boarder text-lg placeholder:text-sm"
              type="text"
              placeholder="Vehicle Capacity"
            />
            </div>
            <div className="flex gap-4 mb-3">
             <input
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eee] rounded px-4 py-2 w-1/2 boarder text-lg placeholder:text-sm"
              type="text"
              placeholder="Vehicle Plate"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eee] rounded px-4 py-2 w-1/2 boarder text-lg placeholder:text-sm"
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Moto</option>
            </select>
          </div>
          <button className="bg-[#111] mb-7 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
