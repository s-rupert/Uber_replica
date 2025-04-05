import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriver(true);
        }}
        className="text-center w-full absolute top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
      </h5>
      <div className="flex items-center justify-between">
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
          <h2 className="text-lg font-medium capitalize">{props.ride?.captain.fullname.firstname}</h2>
          <h4 className="text-xl font-semi">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <h4>OTP: {props.ride?.otp}</h4>
          <p className="text-xs">
            4.5 <i class="ri-star-half-line"></i>
          </p>
        </div>
      </div>
      <div>
        <input
          className="bg-gray-200 p-2 pl-4 rounded-2xl"
          type="text"
          placeholder="Send a message..."
        />
        <i className="absolute left-45 ri-send-plane-2-fill mt-2"></i>
      </div>
      <div className="flex w-full gap-20 align-center text-center justify-center border-b-2 border-gray-200 mt-5 pb-3">
        <div>
          <h2 className="flex bg-gray-200 py-2 px-3 rounded-full">
            <i className="ri-shield-check-fill text-2xl"></i>
          </h2>
          <h3 className="font-semibold">Safety</h3>
        </div>
        <div>
          <h2 className="bg-gray-200 py-2 px-3 rounded-full">
            <i className="ri-map-pin-2-fill text-2xl"></i>
          </h2>
          <h3 className="font-semibold">Share</h3>
        </div>
        <div>
          <h2 className="bg-gray-200 py-2 px-3 rounded-full">
            <i className="ri-phone-fill text-2xl"></i>
          </h2>
          <h3 className="font-semibold">Call</h3>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
        <i className="ri-map-pin-fill text-center w-[20%] "></i>
        <div className="w-[80%]">
          <h3 className="text-lg font-medium">563/11-A</h3>
          <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
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
  );
};

export default WaitingForDriver;
