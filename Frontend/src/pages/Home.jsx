import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isActiveField, setIsActiveField] = useState("");
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState();
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    console.log(user._id);
    socket.emit("join", { userType: "user", userID: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setWaitingForDriver(true);
    setRide(ride.data);
  });

  socket.on('ride-started', (ride) => {
    console.log("ride-started",ride.data);
    setWaitingForDriver(false);
    navigate('/riding', { state: { ride:ride.data } })

  });
  const submitHandler = () => {
    e.preventDefault();
  };

  const handleLocationChange = async (e) => {
    if (isActiveField === "pickup") {
      setPickup(e);
    } else if (isActiveField === "destination") {
      setDestination(e);
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?`,
        {
          params: { input: e },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLocationSuggestions(response.data.suggestions);
    } catch (err) {
      throw err;
    }
  };

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare?`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60%",
          padding: 5,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
          yPercent: 0,
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          yPercent: 100,
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmedRidePanel) {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(0%)",
          yPercent: 0,
        });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          yPercent: 100,
          transform: "translateY(100%)",
        });
      }
    },
    [confirmedRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          yPercent: 0,
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          yPercent: 100,
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          yPercent: 0,
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          yPercent: 100,
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="w-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="bg-white h-[30%]  p-5 relative">
          <h5
            onClick={() => {
              setPanelOpen(false);
            }}
            ref={panelCloseRef}
            className="absolute top-3 right-3 text-3xl opacity-o"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="ldot absolute h-2 w-2 -mt-6 bg-transparent top-[45%] left-9 border-2 rounded-full"></div>
            <div className="line absolute h-8 w-1 -mt-6 bg-gray-900 top-[51%] left-9.5 rounded-full"></div>
            <div className="ddot absolute h-2 w-2 -mt-10 bg-transparent top-[72%] left-9 border-2 "></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                handleLocationChange(e.target.value);
              }}
              onFocus={() => setIsActiveField("pickup")}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                handleLocationChange(e.target.value);
              }}
              onFocus={() => setIsActiveField("destination")}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

          <button
            onClick={() => {
              findTrip();
            }}
            className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl "
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white ">
          <LocationSearchPanel
            locationSuggestions={locationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            isActiveField={isActiveField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bg-white bottom-0 translate-y-full px-3 py-8 w-full"
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmedRidePanel={setConfirmedRidePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>
      <div
        ref={confirmedRidePanelRef}
        className="fixed z-10 bg-white bottom-0 translate-y-full px-3 py-8 w-full"
      >
        <ConfirmedRide
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bg-white bottom-0 translate-y-full px-3 py-8 w-full"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed z-10 bg-white translate-y-0 bottom-0 px-3 py-8 w-full"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          ride={ride}
        />
      </div>
    </div>
  );
};
export default Home;
