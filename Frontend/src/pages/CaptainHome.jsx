import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "./ConfirmRidePopup";

const CaptainHome = () => {
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupRef = useRef(null);
  const [ridePopupPanel, setRidePopupPanel] = useState(null);
  const [confirmRidePopup, setConfirmRidePopup] = useState(null);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopup) {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopup]
  );

  return (
    <div className="h-screen">
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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopup={setConfirmRidePopup} />
      </div>
      <div
        ref={confirmRidePopupRef}
        className="fixed w-full z-10 bottom-0 h-screen translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup} />
      </div>
    </div>
  );
};
export default CaptainHome;
