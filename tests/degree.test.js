require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Degree = require('../models/degreeModel');

// Set overall Jest timeout
jest.setTimeout(10000);

describe('Degree Routes', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI_TEST, {
        serverSelectionTimeoutMS: 5000,
      });
    } catch (err) {
      console.error('Database connection error:', err);
      process.exit(1);
    }
  });

  beforeEach(async () => {
    // Add timeout for setup
    await Degree.deleteMany({}).maxTimeMS(5000);

    await Degree.create({
      name: 'Placeholder Bachelor',
      durationYears: 4,
      department: 'Placeholder',
      accreditation: 'PLH',
    });
  });

  it('should get all degrees', async () => {
    const res = await request(app).get('/api/class').timeout(5000);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it('should get a single degree by ID', async () => {
    const newDegree = await Degree.create({
      name: 'Placeholder Bachelor',
      durationYears: 4,
      department: 'Placeholder',
      accreditation: 'PLH',
    });

    const res = await request(app)
      .get(`/api/degree/${newDegree._id}`)
      .timeout(5000);

    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await Degree.deleteMany({}).maxTimeMS(5000);
    await mongoose.disconnect();
  });
});