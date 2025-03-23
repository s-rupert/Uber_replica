const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true  // Corrected 'Unique' to 'unique'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400
    }
});

// Use blacklistedTokenSchema for the model
const BlackListToken = mongoose.models.BlackListToken || mongoose.model('BlackListToken', blacklistedTokenSchema);

module.exports = BlackListToken;
