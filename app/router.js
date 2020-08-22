'use strict';

const ROUTER_PREFIX = '/api';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const authMiddleware = middleware.auth({
    authKey: app.config.authKey,
  });

  // /
  router.get('/', controller.home.index);

  // auth
  router.get(`${ROUTER_PREFIX}/auth/roles`, controller.auth.roles);
  router.post(`${ROUTER_PREFIX}/auth/login`, controller.auth.login);
  router.get(`${ROUTER_PREFIX}/auth/logout`, controller.auth.logout);

  // users
  router.get(`${ROUTER_PREFIX}/users`, authMiddleware, controller.users.index);

  // todos
  router.get(`${ROUTER_PREFIX}/todos`, controller.todos.list);
  router.post(`${ROUTER_PREFIX}/todos/add`, authMiddleware, controller.todos.add);
  router.post(`${ROUTER_PREFIX}/todos/edit`, authMiddleware, controller.todos.edit);
  router.get(`${ROUTER_PREFIX}/todos/del/:id`, authMiddleware, controller.todos.del);
  router.get(`${ROUTER_PREFIX}/todos/view/:id`, controller.todos.view);
};
