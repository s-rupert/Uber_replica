import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopupPanel(true);
        }}
        className="text-center w-full absolute top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-2">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img className="h-15 w-15 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOsE1rgqrLOnT1NL_Q63ma2ZH8Y4seuk58g&s" alt="" />
          <h2 className="text-lg fond-medium">Harsh Gujral</h2>
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
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
            <i className="ri-map-pin-user-fill text-center w-[20%]"></i>
            <div className="w-[80%]">
              <h3 className="text-lg font-medium">68B</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Rajnagar gorkha, Haryana
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <i className="ri-currency-fill text-center w-[20%]"></i>
            <div className="w-[80%]">
              <h3 className="text-lg font-medium">$27.85</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash + Inc. tax</p>
            </div>
          </div>
        </div>
        <div className="flex w-full align-center justify-between gap-10">
          <button
            onClick={() => {
              props.setRidePopupPanel(true);
            }}
            className="w-full mt-5 bg-gray-600 text-white font-semibold p-2 rounded-xl"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopup(true);
              props.setRidePopupPanel(true);
            }}
            className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
