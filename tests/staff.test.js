require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Staff = require('../models/staffModel');

// Set overall Jest timeout (default is 5000ms)
jest.setTimeout(10000); // 10 seconds for all tests

describe('Staff Routes', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI_TEST, {
        serverSelectionTimeoutMS: 5000, // 5 seconds for initial connection
      });
    } catch (err) {
      console.error('Database connection error:', err);
      process.exit(1);
    }
  });

  beforeEach(async () => {
    // Add timeout for setup
    await Staff.deleteMany({}).maxTimeMS(5000); // 5 seconds max for delete

    await Staff.create({
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      subjects: [],
      classIds: [],
      hireDate: new Date('2025-07-01'),
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
        zip: '12345',
      },
      qualification: "Bachelor's Degree",
      status: 'active',
      role: 'staff',
      password: 'tempPassword',
    });
  });

  it('should get all staff members', async () => {
    const response = await request(app).get('/api/staff').timeout(5000); // 5 seconds timeout for this request

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
      subjects: [],
      classIds: [],
      hireDate: new Date('2025-07-01'),
      address: {
        street: '456 Another St',
        city: 'Somewhere',
        state: 'NY',
        country: 'USA',
        zip: '54321',
      },
      qualification: "Master's Degree",
      status: 'active',
      role: 'staff',
      password: 'tempPassword',
    });

    const response = await request(app)
      .get(`/api/staff/${newStaff._id}`)
      .timeout(5000); // 5 seconds timeout for this request

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await Staff.deleteMany({}).maxTimeMS(5000);
    await mongoose.disconnect();
  });
});
