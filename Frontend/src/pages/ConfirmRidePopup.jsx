import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopup = (props) => {
  const [ otp, setOtp ] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(props.ride._id, otp);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, 
      {
        rideId: props.ride._id,
        otp: otp
       },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
       });
       if (response.status === 200) {
        props.setConfirmRidePopup(false);
        navigate("/captain-riding", { state: { ride: props.ride } });
      }

  };
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopup(false);
        }}
        className="text-center w-full absolute top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-2">
        Confirm this ride to start
      </h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="h-15 w-15 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOsE1rgqrLOnT1NL_Q63ma2ZH8Y4seuk58g&s"
            alt=""
          />
          <h2 className="text-lg fond-medium">{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex justify-between gap-3 flex-col items-center">
        <div className="w-full">
          <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
            <i className="ri-map-pin-fill text-center w-[20%] "></i>
            <div className="w-[80%]">
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
            <i className="ri-map-pin-user-fill text-center w-[20%]"></i>
            <div className="w-[80%]">
              <h3 className="text-lg font-medium">68B</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <i className="ri-currency-fill text-center w-[20%]"></i>
            <div className="w-[80%]">
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash + Inc. tax</p>
            </div>
          </div>
        </div>
        <form
          className="w-[80%]"
          onSubmit={submitHandler}
        >
          <input
            value={otp}
            type="text"
            placeholder="Enter OTP"
            onChange={(e)=> setOtp(e.target.value)}
            className="bg-[#ccc] mb-2 rounded px-4 py-2 w-full boarder text-lg placeholder:text-base"
          />
          <div className="flex align-center justify-between gap-10">
            <button
              onClick={() => {
                props.setConfirmRidePopup(false);
              }}
              className="w-full mt-5 bg-red-600 text-white font-semibold p-2 rounded-xl"
            >
              Cancel
            </button>
            <button
            onClick={() => {
            }
            }
              className="w-full flex justify-center mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
