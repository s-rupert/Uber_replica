import React from "react";

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanel(false)
            }} className="text-center w-full absolute top-0"><i className="text-3xl text-gray-300 ri-arrow-down-s-line"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
            <div onClick={()=>{
                props.setConfirmedRidePanel(true)
                props.setVehiclePanel(false)
            }} className="flex items-center justify-between p-3 mb-3 border-2 border-gray-300 rounded-xl active:border-black w-full">
                <img className="h-15 w-[25%] pr-[2%]" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_715,w_1072/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png" alt="" />
                <div className="w-[55%]">
                    <h4 className="font-medium text-sm">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-medium text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-xl font-semibold w-[15%]">$20</h2>
            </div>

            <div onClick={()=>{
                props.setConfirmedRidePanel(true)
                props.setVehiclePanel(false)
            }} className="flex items-center justify-between p-3 mb-3 border-2 border-gray-300 rounded-xl active:border-black w-full">
                <img className="h-15 w-[25%] pr-[2%]" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                <div className="w-[55%]">
                    <h4 className="font-medium text-sm">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className="font-medium text-sm">3 mins away</h5>
                    <p className="font-medium text-xs text-gray-600">Standard, comfortable rides</p>
                </div>
                <h2 className="text-xl font-semibold w-[15%]">$25</h2>
            </div>

            <div onClick={()=>{
                props.setConfirmedRidePanel(true)
                props.setVehiclePanel(false)
            }} className="flex items-center justify-between p-3 mb-3 border-2 border-gray-300 rounded-xl active:border-black w-full">
                <img className="h-15 w-[25%] pr-[2%]" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className="w-[55%]">
                    <h4 className="font-medium text-sm">Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className="font-medium text-sm">6 mins away</h5>
                    <p className="font-medium text-xs text-gray-600">Single ride for explorers</p>
                </div>
                <h2 className="text-xl font-semibold w-[15%]">$35</h2>
            </div>

            <div onClick={()=>{
                props.setConfirmedRidePanel(true)
                props.setVehiclePanel(false)
            }} className="flex items-center justify-between p-3 mb-3 border-2 border-gray-300 rounded-xl active:border-black w-full">
                <img className="h-15 w-[25%] pr-[2%]" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
                <div className="w-[55%]">
                    <h4 className="font-medium text-sm">UberBlack <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className="font-medium text-sm">7 mins away</h5>
                    <p className="font-medium text-xs text-gray-600">Luxurious and premium rides</p>
                </div>
                <h2 className="text-xl font-semibold w-[15%]">$50</h2>
            </div>
        </div>
    )
}

export default VehiclePanel