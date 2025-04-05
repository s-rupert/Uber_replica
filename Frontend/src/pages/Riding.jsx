import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = (props) => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  })
  return (
    <div className="h-screen">
        <Link to='/home' className="flex items-center justify-center rounded-full fixed h-10 w-10 bg-white right-2 top-2">
        <i className="text-lg font-bold ri-home-4-line"></i>
        </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="m-3">
        <div className="flex items-center justify-between mx-3 my-5">
          <img
            className="h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_715,w_1072/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png"
            alt=""
          />
          <img
            className="h-15 absolute bg-white rounded-full"
            src="https://cdn-icons-png.flaticon.com/512/1581/1581908.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semi">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            <p className="text-xs">
              4.5 <i class="ri-star-half-line"></i>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
          <i className="ri-map-pin-user-fill text-center w-[20%]"></i>
          <div className="w-[80%]">
            <h3 className="text-lg font-medium">68B</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3">
          <i className="ri-currency-fill text-center w-[20%]"></i>
          <div className="w-[80%]">
            <h3 className="text-lg font-medium">${ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash + Inc. tax</p>
          </div>
        </div>
        <button
          onClick={() => {
          }}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl"
        >
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
