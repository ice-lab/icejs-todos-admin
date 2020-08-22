'use strict';

module.exports = (options = {}) => {
  const { authKey } = options;
  return async function(ctx, next) {
    const auth = ctx.session.auth;
    if (auth === authKey) {
      await next();
    } else {
      ctx.body = {
        code: 2000,
        msg: 'auth fail',
      };
      return;
    }
  };
};
