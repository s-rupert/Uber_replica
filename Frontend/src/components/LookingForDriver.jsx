import React from "react";

const LookingForDriver = (props) => {

    return(
        <div>
            <h5 onClick={() => {
                props.setVehicleFound(false)
            }} className="text-center w-full absolute top-0"><i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Looking for a driver</h3>

            <div className="flex justify-between gap-3 flex-col items-center">
                <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_715,w_1072/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png" alt="" />
                <div className="w-full">
                    <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
                        <i className="ri-map-pin-fill text-center w-[20%] "></i>
                        <div className="w-[80%]">
                            <h3 className="text-lg font-medium">563/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border-b-2 border-gray-300">
                        <i className="ri-map-pin-user-fill text-center w-[20%]"></i>
                        <div className="w-[80%]">
                            <h3 className="text-lg font-medium">68B</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3">
                        <i className="ri-currency-fill text-center w-[20%]"></i>
                        <div className="w-[80%]">
                            <h3 className="text-lg font-medium">${props.fare[props.vehicleType]}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash + Inc. tax</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default LookingForDriver