const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            length: 6,
            required: true,
        },
        room: {
            type: String,
            required: true,
        },
        schedule: {
            type: String,
            required: true,
        }
    }
)

const Class = mongoose.model('Class', classSchema);
module.exports = Class;