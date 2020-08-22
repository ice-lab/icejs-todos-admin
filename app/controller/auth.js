'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async login() {
    const { ctx, app } = this;
    const { authKey } = app.config;
    const formData = ctx.request.body;
    const { name, password } = formData;

    const user = await app.model.Admin.findAll({
      username: name,
      password,
    });

    let code = 2000;

    if (user.length) {
      code = 1000;
      ctx.session.auth = authKey;
    }

    ctx.body = {
      code,
    };
  }
  async register() {
    const { ctx } = this;
    ctx.body = 'register';
  }
  async logout() {
    const { ctx } = this;
    ctx.body = {
      code: 1000,
    };
    ctx.session.auth = null;
  }
  async roles() {
    const { ctx, app } = this;
    const roles = [];
    if (authValidate(ctx, app.config)) {
      roles.push('user');
    }
    ctx.body = {
      data: {
        roles,
      },
    };
  }
}

function authValidate(ctx, config) {
  const { authKey } = config;
  return ctx.session.auth === authKey;
}

module.exports = AuthController;
