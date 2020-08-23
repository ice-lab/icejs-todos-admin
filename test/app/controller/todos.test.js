'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/todos.test.js', () => {
  it('should GET /api/todos', () => {
    return app.httpRequest()
      .get('/api/todos')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
