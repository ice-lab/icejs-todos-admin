'use strict';

const ROUTER_PREFIX = '/api';
const MINIAPP_PREFIX = '/mp';

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

  // ############### admin #############
  // auth
  router.get(`${ROUTER_PREFIX}/auth/roles`, controller.admin.auth.roles);
  router.post(`${ROUTER_PREFIX}/auth/login`, controller.admin.auth.login);
  router.get(`${ROUTER_PREFIX}/auth/logout`, controller.admin.auth.logout);

  // users
  router.get(`${ROUTER_PREFIX}/users`, authMiddleware, controller.admin.users.index);

  // todos
  router.get(`${ROUTER_PREFIX}/todos`, controller.admin.todos.list);
  router.post(`${ROUTER_PREFIX}/todos/add`, authMiddleware, controller.admin.todos.add);
  router.post(`${ROUTER_PREFIX}/todos/edit`, authMiddleware, controller.admin.todos.edit);
  router.get(`${ROUTER_PREFIX}/todos/del/:id`, authMiddleware, controller.admin.todos.del);
  router.get(`${ROUTER_PREFIX}/todos/view/:id`, controller.admin.todos.view);

  // ############### miniapp #############
  // auth
  router.post(`${ROUTER_PREFIX}${MINIAPP_PREFIX}/auth/login`, controller.miniapp.auth.login);

  // todos
  router.get(`${ROUTER_PREFIX}${MINIAPP_PREFIX}/todos`, controller.miniapp.todos.list);
  router.post(`${ROUTER_PREFIX}${MINIAPP_PREFIX}/todos/add`, controller.miniapp.todos.add);
  router.post(`${ROUTER_PREFIX}${MINIAPP_PREFIX}/todos/edit`, controller.miniapp.todos.edit);
  router.get(`${ROUTER_PREFIX}${MINIAPP_PREFIX}/todos/del/:id`, controller.miniapp.todos.del);
  router.get(`${ROUTER_PREFIX}${MINIAPP_PREFIX}/todos/view/:id`, controller.miniapp.todos.view);

  // users
  router.post(`${ROUTER_PREFIX}${MINIAPP_PREFIX}/user/edit`, controller.miniapp.user.edit);
};
