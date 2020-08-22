'use strict';

const Controller = require('egg').Controller;

class TodosController extends Controller {
  async list() {
    const { ctx, app } = this;
    let { current = 1, size = 10 } = ctx.query;
    current = Number(current) > 0 ? Number(current) : 1;
    size = Number(size);
    const offset = (current - 1) * size;

    const res = await app.model.Todos.findAndCountAll({
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

  async add() {
    const { ctx, app } = this;
    const { content, userId } = ctx.request.body;
    const todo = await app.model.Todos.create({
      content,
      userId,
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
      },
    };
  }

  async edit() {
    const { ctx, app } = this;
    const { id, content, userId } = ctx.request.body;
    const todo = await app.model.Todos.findByPk(id);
    await todo.update({
      content,
      userId,
    });
    ctx.body = {
      code: 1000,
      data: {
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
