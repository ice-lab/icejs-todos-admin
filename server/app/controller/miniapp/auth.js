'use strict';

const Controller = require('egg').Controller;

// https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
async function code2Session(ctx, { appId, appSecret, code, grantType = 'authorization_code' }) {
  const URL = 'https://api.weixin.qq.com/sns/jscode2session';
  const result = await ctx.curl(`${URL}?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=${grantType}`, {
    dataType: 'json',
  });
  return result.data;
}

class AuthController extends Controller {
  async login() {
    const { ctx, app } = this;
    const formData = ctx.request.body;
    const { code } = formData;

    const { appId, appSecret } = app.config.miniapp;

    const session = await code2Session(ctx, {
      appId,
      appSecret,
      code,
    });

    const { openid: openId } = session;

    await app.model.Users.findOrCreate({
      where: {
        openId,
      },
    });

    ctx.body = {
      code: 1000,
      data: {
        openId,
      },
    };
  }
}

module.exports = AuthController;
