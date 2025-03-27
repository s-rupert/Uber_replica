import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CaptainLogout = () => {
const Navigate = useNavigate();
const token = localStorage.getItem("token");

axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then((response)=>{
    console.log(response);
    if(response.status === 200){
        localStorage.removeItem("token");
        Navigate('/captain-login')
    }
})
return(
    <div>CaptainLogout</div>
);

};

export default CaptainLogout;