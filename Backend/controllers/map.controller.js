const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json({ coordinates });
    } catch (error) {
        res.status(404).json({ message: 'Failed to get coordinates' });
    }
}

module.exports.getDistance = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { origin, destination } = req.query;
        const distance = await mapService.getDistance(origin, destination);
        res.status(200).json({ distance });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get distance' });
    }
}