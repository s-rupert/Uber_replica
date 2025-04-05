import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "./ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { io } from "socket.io-client";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupRef = useRef(null);
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [ ride, setRide ] = useState(null);

  useEffect(() => {
    socket.emit("join", {
      userID: captain._id,
      userType: "captain",
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    // return () => clearInterval(locationInterval);
  });

  socket.on("newRide", (data) => {
    console.log("captainside",data);
    setRide(data.data);
    setRidePopupPanel(false);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
      {
        rideId: ride._id,
        captainId: captain._id,
        },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
    setRidePopupPanel(true);
    setConfirmRidePopup(true);
  }

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
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopup={setConfirmRidePopup}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupRef}
        className="fixed w-full z-10 bottom-0 h-screen translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup}
        ride={ride} />
      </div>
    </div>
  );
};
export default CaptainHome;
