const { Server } = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    
    
    socket.on('join', async (data) => {
        const { userID, userType } = data;
        
        console.log(`User ${userID} joined the chat. Type: ${userType}`)
        
        if (userType === 'user') {
            await userModel.findByIdAndUpdate(userID, { socketId: socket.id });
        } else if (userType === 'captain') {
            await captainModel.findByIdAndUpdate(userID, { socketId: socket.id });
        }
    });


    socket.on('update-location-captain', async (data) => {
        const { userId, location } = data;
        
        if (!location || !location.ltd ||!location.lng) {
            return socket.emit('error', 'Invalid location data');
        }

        await captainModel.findByIdAndUpdate(userId, { location: {
            ltd: location.ltd,
            lng: location.lng
        } });
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketID(socketId, messageObject) {

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject);
  } else {
    console.error('Socket.io is not initialized.');
  }
}

module.exports = { initializeSocket, sendMessageToSocketID };
