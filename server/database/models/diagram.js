const mongoose = require('mongoose');

const DiagramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
    },
    fileName: {
        type: String,
        required: true,
    },
});

const DiagramModel = mongoose.model('diagram', DiagramSchema);

module.exports = {
    DiagramSchema,
    DiagramModel,
};
