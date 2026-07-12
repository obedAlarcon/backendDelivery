process.env.API_KEY = process.env.API_KEY || 'test_api_key';

// Ensure modules reload with the API_KEY set
delete require.cache[require.resolve('../app')];
delete require.cache[require.resolve('../config/config')];
delete require.cache[require.resolve('../midlewares/auth.handler')];

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('API key protected route', () => {
  it('GET /nueva-ruta should return 200 when api header is valid', async () => {
    const response = await request(app)
      .get('/nueva-ruta')
      .set('api', process.env.API_KEY);

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('esta es la nueva ruta');
  });

  it('GET /nueva-ruta should return 401 when api header is missing', async () => {
    const response = await request(app)
      .get('/nueva-ruta');

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error', 'Unauthorized');
  });
});
