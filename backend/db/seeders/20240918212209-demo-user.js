'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate( [
      { email: 'demo@user.io', username: 'Demo-lition', hashedPassword: bcrypt.hashSync('password'), firstName: 'Demo', lastName: 'User' },
      { email: 'demo1@user.io', username: 'DemoUser1', hashedPassword: bcrypt.hashSync('password1'), firstName: 'John', lastName: 'Doe' },
  { email: 'demo2@user.io', username: 'DemoUser2', hashedPassword: bcrypt.hashSync('password2'), firstName: 'Jane', lastName: 'Smith' },
  { email: 'demo3@user.io', username: 'DemoUser3', hashedPassword: bcrypt.hashSync('password3'), firstName: 'Alice', lastName: 'Johnson' },
  { email: 'demo4@user.io', username: 'DemoUser4', hashedPassword: bcrypt.hashSync('password4'), firstName: 'Bob', lastName: 'Williams' },
  { email: 'demo5@user.io', username: 'DemoUser5', hashedPassword: bcrypt.hashSync('password5'), firstName: 'Charlie', lastName: 'Brown' },
  { email: 'demo6@user.io', username: 'DemoUser6', hashedPassword: bcrypt.hashSync('password6'), firstName: 'Dave', lastName: 'Wilson' },
  { email: 'demo7@user.io', username: 'DemoUser7', hashedPassword: bcrypt.hashSync('password7'), firstName: 'Eve', lastName: 'Taylor' },
  { email: 'demo8@user.io', username: 'DemoUser8', hashedPassword: bcrypt.hashSync('password8'), firstName: 'Frank', lastName: 'Anderson' },
  { email: 'demo9@user.io', username: 'DemoUser9', hashedPassword: bcrypt.hashSync('password9'), firstName: 'Grace', lastName: 'Thomas' }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'DemoUser1','DemoUser2','DemoUser3','DemoUser4','DemoUser5',
                              'DemoUser6','DemoUser7','DemoUser8','DemoUser9']
       }
    }, {});
  }
};
