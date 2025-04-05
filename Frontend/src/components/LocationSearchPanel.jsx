import React from "react";

const LocationSearchPanel = (props) => {

    return (
        <div className="mt-10">
            {/* Sample Datas */}
            {
                props.locationSuggestions.map((elem, idx) => {
                    return <div 
                    onClick={()=>{
                        if(props.isActiveField === "pickup"){
                            props.setPickup(elem.description)
                        }else if(props.isActiveField === "destination"){
                            props.setDestination(elem.description)
                        }
                    }}
                    key={idx}
                    className="flex items-center border-2 border-gray-200 active:border-black p-2 rounded-xl justify-start gap-2 mx-4 my-2">
                        <h2 className="bg-[#eee] p-2 flex items-center my-4 justify-center rounded-full h-8 w-8 p-4">
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className="font-medium">{elem.description}</h4>
                    </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel;