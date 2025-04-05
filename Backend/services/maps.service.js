const axios = require('axios');
const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API; // Ensure this is set in your environment variables
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try { 
        const response = await axios.get(url);
        
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        }else{
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }

    } catch (error) {
        throw new Error('Unable to fetch coordinates for the given address');
    }
};

module.exports.getDistance = async (origin, destination) => {
    if (!origin || !destination) throw new Error("Both origin and destination coordinates are required"); 
    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No route found between the given origin and destination');
            }
            return response.data.rows[0].elements[0];
        }else{
            throw new Error(`Unable to fetch distance for the given origin and destination`);
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("query is required");
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error(`Unable to fetch autocomplete suggestions for the given input`);
        }
    }catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
 const captains = await captainModel.find({
    location: {
        $geoWithin: {
            $centerSphere: [[ltd,lng], radius / 6371]
        }
    }
});
return captains;
}