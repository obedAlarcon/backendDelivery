const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('App routes', () => {
  it('GET /test should return API funcionando', async () => {
    const response = await request(app).get('/test');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'API funcionando' });
  });

  it('GET / should return the welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.include('hola este es el servidor de app de pedidos');
  });
});
