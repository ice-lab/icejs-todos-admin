'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async edit() {
    const { ctx, app } = this;
    const { openId, username } = ctx.request.body;
    let user = await app.model.Users.findByPk(openId);
    if (user) {
      await user.update({
        openId,
        username
      });
    } else {
      user = {};
    }
    ctx.body = {
      code: 1000,
      data: {
        user
      }
    }
  }
}

module.exports = UserController;
