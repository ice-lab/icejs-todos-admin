'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async index() {
    const { ctx, app } = this;
    let { current = 1, size = 10 } = ctx.query;
    current = Number(current) > 0 ? Number(current) : 1;
    size = Number(size);
    const offset = (current - 1) * size;

    const res = await app.model.Users.findAndCountAll({
      offset,
      limit: size,
    });
    ctx.body = {
      code: 1000,
      data: {
        total: res.count,
        list: res.rows,
      },
    };
  }
}

module.exports = UsersController;
