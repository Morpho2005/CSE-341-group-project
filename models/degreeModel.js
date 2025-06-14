const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const degreeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        durationYears: {
            type: Number,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        accreditation: {
            type: String,
            length: 3,
            required: true,
        }
    }
)

const Degree = mongoose.model('Degree', degreeSchema);
module.exports = Degree;