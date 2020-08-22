'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Admin = app.model.define('admin', {
    id: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    username: STRING(63),
    password: STRING(63),
  }, {
    timestamps: false,
  });

  return Admin;
};
