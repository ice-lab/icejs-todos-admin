'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Users = app.model.define('users', {
    openId: { type: STRING(45), primaryKey: true, allowNull: false },
    username: STRING(45),
  }, {
    timestamps: false,
  });

  return Users;
};
