import React from "react";

const ConfirmedRide = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setConfirmedRidePanel(false)
            }} className="text-center w-full absolute top-0"><i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i></h5>
            <h3 className="text-2xl font-semibold mb-10">Confirm your Ride</h3>

            <div className="flex justify-between gap-3 flex-col items-center">
                <img className="h-25" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_715,w_1072/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png" alt="" />
                <div className="w-full">
                    <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
                        <i className="ri-map-pin-fill text-center w-[20%] "></i>
                        <div className="w-[80%]">
                            <h3 className="text-lg font-medium">563/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Kankariya Talab, Bhopal</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
                        <i className="ri-map-pin-user-fill text-center w-[20%]"></i>
                        <div className="w-[80%]">
                            <h3 className="text-lg font-medium">68B</h3>
                            <p className="text-sm -mt-1 text-gray-600">Rajnagar gorkha, Haryana</p>
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
                <button onClick={()=>{
                    props.setVehicleFound(true)
                    props.setConfirmedRidePanel(false)
                }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl">Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmedRide