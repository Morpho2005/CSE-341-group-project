require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Staff = require('../models/staffModel');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

beforeEach(async () => {
  // Clear and seed the staff collection before each test
  await Staff.deleteMany({});

  await Staff.create({
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    hireDate: '2025-07-01',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
    qualification: "Bachelor's Degree",
    status: 'active',
    role: 'staff',
  });
});

describe('Staff Routes', () => {
  it('should get all staff members', async () => {
    const response = await request(app).get('/api/staff');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('should get a single staff member by ID', async () => {
    const newStaff = await Staff.create({
      firstName: 'Jane',
      lastName: 'Smith',
      gender: 'female',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      hireDate: '2025-07-01',
      address: {
        street: '456 Another St',
        city: 'Somewhere',
        state: 'NY',
        zip: '54321',
      },
      qualification: "Master's Degree",
      status: 'active',
      role: 'staff',
    });

    const response = await request(app).get(`/api/staff/${newStaff._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

afterAll(async () => {
  // Drop the test database and close the connection
  //   await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});
