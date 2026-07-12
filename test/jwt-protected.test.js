const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const UserService = require('../services/user.service');
const CategoriesService = require('../services/categories.service');

const userService = new UserService();
const categoriesService = new CategoriesService();
const testUser = {
  name: 'JWT Test User',
  email: `jwt-test-${Date.now()}@example.com`,
  phone: '5559876543',
  password: 'secret123',
  role: 'admin',
};

let createdUser;
let createdCategory;
let jwtToken;

describe('JWT protected category route', () => {
  before(async () => {
    createdUser = await userService.create(testUser);
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    jwtToken = loginResponse.body.token;
  });

  after(async () => {
    if (createdCategory) {
      await categoriesService.delete(createdCategory.id);
    }
    if (createdUser) {
      await userService.delete(createdUser.id);
    }
  });

  it('POST /api/v1/categories should return 201 with valid JWT', async () => {
    const response = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'Test Category', description: 'Categoria de prueba' });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name', 'Test Category');
    expect(response.body).to.have.property('description', 'Categoria de prueba');
    createdCategory = response.body;
  });

  it('POST /api/v1/categories should return 401 without JWT', async () => {
    const response = await request(app)
      .post('/api/v1/categories')
      .send({ name: 'Test Category 2' });

    expect(response.status).to.equal(401);
  });
});
