const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const staffSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    classIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
    hireDate: {
      type: Date,
      default: Date.now,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zip: { type: String, trim: true },
    },
    qualification: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'staff'],
      default: 'staff',
    },
  },
  { timestamps: true },
);

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
