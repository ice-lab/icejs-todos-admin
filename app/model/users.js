'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Users = app.model.define('users', {
    id: { type: INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
    username: STRING(45),
    avatarUrl: STRING(45),
  }, {
    timestamps: false,
  });

  return Users;
};
