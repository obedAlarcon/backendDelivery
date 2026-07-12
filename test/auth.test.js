const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const UserService = require('../services/user.service');

const service = new UserService();
const testUser = {
  name: 'Auth Test User',
  email: `auth-test-${Date.now()}@example.com`,
  phone: '5551234567',
  password: 'secret123',
  role: 'customer',
};

let createdUser;

describe('Auth routes', () => {
  before(async () => {
    createdUser = await service.create(testUser);
  });

  after(async () => {
    if (createdUser) {
      await service.delete(createdUser.id);
    }
  });

  it('POST /api/v1/auth/login should return JWT for valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
    expect(response.body).to.have.property('user');
    expect(response.body.user.email).to.equal(testUser.email);
  });

  it('POST /api/v1/auth/login should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: 'wrong-password' });

    expect(response.status).to.equal(401);
  });
});
