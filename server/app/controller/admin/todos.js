'use strict';

const Controller = require('egg').Controller;
const { v4: uuidv4 } = require('uuid');

class TodosController extends Controller {
  async list() {
    const { ctx, app } = this;
    let { current = 1, size = 10, openId } = ctx.query;
    current = Number(current) > 0 ? Number(current) : 1;
    size = Number(size);
    const offset = (current - 1) * size;

    let where = {};
    if (openId !== undefined) {
      where = {
        openId,
      };
    }

    const res = await app.model.Todos.findAndCountAll({
      offset,
      limit: size,
      where,
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
    const { content, openId } = ctx.request.body;
    console.log(content, openId);
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
