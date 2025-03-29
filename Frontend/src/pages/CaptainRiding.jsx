import React,{useState, useRef} from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

    useGSAP(
        function () {
          if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(100%)",
            });
          }
        },
        [finishRidePanel]
      );
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <Link
          to="/home"
          className="flex items-center justify-center rounded-full bg-white w-10 h-10"
        >
          <i className="text-xl font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/5 p-6 bg-yellow-400 relative"
      onClick={()=>{
        setFinishRidePanel(true);
      }}>
        <h5 onClick={() => {}} className="text-center w-full absolute top-0">
          <i className="text-3xl text-gray-600 ri-arrow-down-s-line"></i>
        </h5>
        <div className="mt-5 flex items-center justify-between">
          <h4 className="text-xl font-semibold">4 KM away</h4>
          <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-xl">
            Complete Ride
          </button>
        </div>
      </div>
      <div className="fixed w-full bottom-0 translate-y-full bg-white py-10"
        ref={finishRidePanelRef}
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
