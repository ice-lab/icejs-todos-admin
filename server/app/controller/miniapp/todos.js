'use strict';

const Controller = require('egg').Controller;
const { v4: uuidv4 } = require('uuid');

// 为没有 todos 的用户添加默认 todos
async function initTodos(app, openId) {
  const defaultTodos = [
    {
      content: { text: 'Learning Javascript', completed: true },
    },
    {
      content: { text: 'Learning ES2016', completed: true },
    },
    {
      content: { text: 'Learning 小程序', completed: false },
    },
  ];
  defaultTodos.forEach(todo => {
    const { content } = todo;
    todo.id = uuidv4();
    todo.openId = openId;
    todo.content = content;
  });
  for (let i = 0; i < defaultTodos.length; i++) {
    const todo = defaultTodos[i];
    await app.model.Todos.create(todo);
  }
}

class TodosController extends Controller {
  async list() {
    const { ctx, app } = this;
    const { openId } = ctx.query;

    let res = await app.model.Todos.findAndCountAll({
      where: {
        openId,
      },
    });

    if (res.count === 0) {
      await initTodos(app, openId);
      res = await app.model.Todos.findAndCountAll({
        where: {
          openId,
        },
      });
    }

    ctx.body = {
      code: 1000,
      data: {
        todos: res.rows,
      },
    };
  }

  async add() {
    const { ctx, app } = this;
    const { content, openId } = ctx.request.body;
    const id = uuidv4();
    const todo = await app.model.Todos.create({
      id,
      content,
      openId,
    });
    ctx.body = {
      code: 1000,
      data: {
        todo,
      },
    };
  }

  async del() {
    const { ctx, app } = this;
    const { id } = ctx.params;
    const todo = await app.model.Todos.findByPk(id);
    await todo.destroy();
    ctx.body = {
      code: 1000,
      data: {
        todo,
      },
    };
  }

  async edit() {
    const { ctx, app } = this;
    const { id, content, openId } = ctx.request.body;
    const todo = await app.model.Todos.findByPk(id);
    await todo.update({
      content,
      openId,
    });
    ctx.body = {
      code: 1000,
      data: {
        todo,
      },
    };
  }

  async view() {
    const { ctx, app } = this;
    const { id } = ctx.params;
    const todo = await app.model.Todos.findByPk(id);
    ctx.body = {
      code: 1000,
      data: {
        todo,
      },
    };
  }
}

module.exports = TodosController;
