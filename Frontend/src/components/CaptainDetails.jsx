import React, {useContext} from "react";
import { CaptainDataContext } from '../context/CaptainContext'
const CaptainDetails = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  
  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center justify-between gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://cdn-icons-png.flaticon.com/512/1581/1581908.png"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">$89.25</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-6 p-3 bg-gray-100 rounded-2xl items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-time-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
