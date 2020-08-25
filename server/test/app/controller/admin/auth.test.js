'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/todos.test.js', () => {
  it('should GET /api/auth/roles', () => {
    return app.httpRequest()
      .get('/api/auth/roles')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
