import React from "react";

const LocationSearchPanel = (props) => {

    const locations = [
        "24B, Near Kapoor's Cafe, Sheryians Coding School, Bhopal",
        "15A, Green Valley, Tech Park, Indore",
        "88C, Cyber Hub, Near Metro Station, Gurgaon",
        "12D, Knowledge Park, IT Sector, Bangalore",
        "45B, Startup Lane, Hitech City, Hyderabad",
        "78F, Silicon Street, FinTech Hub, Pune"
    ]
    return (
        <div>
            {/* Sample Datas */}
            {
                locations.map((elem, idx) => {
                    return <div 
                    onClick={()=>{
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }}
                    key={idx}
                    className="flex items-center border-2 border-gray-200 active:border-black p-2 rounded-xl justify-start gap-4 m-3">
                        <h2 className="bg-[#eee] p-2 flex items-center my-4 justify-center rounded-full h-8 w-8 p-4">
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className="font-medium">{elem}</h4>
                    </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel;