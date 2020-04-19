const activities = require('./activities/activities.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(activities);
  app.configure(users);
};
