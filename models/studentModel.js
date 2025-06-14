const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    classId: [
      {
        type: String,
        ref: 'Class',
        required: false,
      },
    ],
    degreeId: {
      type: String,
      ref: 'Degree',
      required: false,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zip: { type: String, trim: true },
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
  },
  { timestamps: true },
);
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
