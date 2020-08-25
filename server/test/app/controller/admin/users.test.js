'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/todos.test.js', () => {
  it('should GET /api/users', () => {
    return app.httpRequest()
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
