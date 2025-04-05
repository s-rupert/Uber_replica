const rideModel = require("../models/ride.model");
const crypto = require("crypto");
const mapService = require("./maps.service");

const { sendMessageToSocketID } = require('../socket');
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Both pickup and destination are required");
  }
  const distanceTime = await mapService.getDistance(pickup, destination);

  const baseFare = {
    car: 5,
    motorcycle: 3,
  };
  const perKMRate = {
    car: 1,
    motorcycle: 0.75,
  };
  const perMinuteRate = {
    car: 0.5,
    motorcycle: 0.3,
  };
  const fare = {
    car:
      Math.round(
        baseFare.car +
          (distanceTime.distance.value / 1000) * perKMRate.car +
          (distanceTime.duration.value / 60) * perMinuteRate.car * 100
      ) / 100,
    motorcycle:
      Math.round(
        baseFare.motorcycle +
          (distanceTime.distance.value / 1000) * perKMRate.motorcycle +
          (distanceTime.duration.value / 60) * perMinuteRate.motorcycle * 100
      ) / 100,
    c_car:
      Math.round(
        baseFare.car +
          (distanceTime.distance.value / 1000) * perKMRate.car +
          (distanceTime.duration.value / 60) * perMinuteRate.car * 120
      ) / 100,
    l_car:
      Math.round(
        baseFare.car +
          (distanceTime.distance.value / 1000) * perKMRate.car +
          (distanceTime.duration.value / 60) * perMinuteRate.car * 200
      ) / 100,
  };
  return fare;
}

module.exports.getFare = getFare;
function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });
  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }
  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'accepted',
    captain: captain._id,
  });

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate('user').populate('captain').select('+otp');
  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Ride ID and OTP are required");
  }
  const ride = await rideModel.findOne({
    _id: rideId,
  }).populate("user").populate("captain").select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted yet");
  }

  if (ride.otp!== otp) {
    throw new Error("Invalid OTP");
  }
  await rideModel.findOneAndUpdate({
    _id: rideId
  },{
    status: 'ongoing'
  })

  sendMessageToSocketID(ride.user.socketId, {
    event: 'ride-started',
    data: ride
  });

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    throw new Error("Ride ID and captain are required");
  }
  const ride = await rideModel.findOne({
    _id: rideId,
    captain: captain._id,
  }).populate("user").populate("captain").select("+otp");

  if (!ride) {
    throw new Error("Ride not found or not assigned to captain");
  }
  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }
  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'completed',
  });

  return ride;
}