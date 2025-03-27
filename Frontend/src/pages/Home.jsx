import React, { useState, useRef } from "react";
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)
  
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const submitHandler = () => {
    e.preventDefault();
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%'
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%'
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
      <div className="h-screen w-screen">
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
       <div className="bg-white h-[30%]  p-5 relative">
        <h5 
        onClick={()=>{
          setPanelOpen(false)
        }}
        ref={panelCloseRef}
        className="absolute top-3 right-3 text-3xl opacity-o">
        <i className="ri-arrow-down-s-line"></i>
        </h5>
       <h4 className="text-2xl font-semibold">Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <div className="ldot absolute h-2 w-2 top-1/2 bg-transparent top-[45%] left-10 border-2 rounded-full"></div>
          <div className="line absolute h-10 w-1 top-1/2 bg-gray-900 top-[51%] left-10.5 rounded-full"></div>
          <div className="ddot absolute h-2 w-2 top-1/2 bg-transparent top-[72%] left-10 border-2 "></div>
          <input 
          onClick={()=>{
            setPanelOpen(true)
          }}
          value={pickup}
          onChange={(e)=>{
            setPickup(e.target.value)
          }}
          className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5" 
          type="text" 
          placeholder="Add a pick-up location" />
          <input 
          onClick={()=>{
            setPanelOpen(true)
          }}   
          value={destination}
          onChange={(e)=>{
            setDestination(e.target.value)
          }}
          className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3" 
          type="text" 
          placeholder="Enter your destination" />
        </form>
       </div>
       <div ref={panelRef} className="bg-white h-0 p-5">
          <LocationSearchPanel />
       </div>
      </div>
      <div className="fixed z-10 bg-white bottom-0">
         <div className="flex items-center justify-between">
          <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_715,w_1072/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png" alt="" />
          <div>
            <h4>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5>2 mins away </h5>
            <p>Affordable, compact rides</p>
          </div>
          <h2>$20</h2>
         </div>
      </div>
    </div>
  );
}
export default Home;