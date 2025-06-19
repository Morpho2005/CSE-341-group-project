require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Class = require('../models/classModel');

// Set overall Jest timeout
jest.setTimeout(10000);

describe('Class Routes', () => {
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
    await Class.deleteMany({}).maxTimeMS(5000);

    await Class.create({
      title: 'Placeholder 101',
      code: 'PLH101',
      room: 'Block B - room 15',
      schedule: 'MWF 13:00 - 14:00',
    });
  });

  it('should get all classes', async () => {
    const res = await request(app).get('/api/class').timeout(5000);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it('should get a single class by ID', async () => {
    const newClass = await Class.create({
      title: 'Placeholder 101',
      code: 'PLH101',
      room: 'Block B - room 15',
      schedule: 'MWF 13:00 - 14:00',
    });

    const res = await request(app)
      .get(`/api/class/${newClass._id}`)
      .timeout(5000);

    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await Class.deleteMany({}).maxTimeMS(5000);
    await mongoose.disconnect();
  });
});
