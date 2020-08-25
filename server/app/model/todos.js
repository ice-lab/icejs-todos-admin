'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Todos = app.model.define('todos', {
    id: { type: STRING(45), primaryKey: true, allowNull: false },
    content: JSON,
    openId: STRING(45),
  }, {
    timestamps: false,
  });

  return Todos;
};
