'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Todos = app.model.define('todos', {
    id: { type: INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
    content: STRING(200),
    userId: INTEGER(11),
  }, {
    timestamps: false,
  });

  return Todos;
};
