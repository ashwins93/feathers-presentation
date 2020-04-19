// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Forbidden } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const activity = await context.app.services.activities.get(context.id);

    if (activity.user.email !== context.params.user.email) {
      // context.result = {
      //   message: 'You are not authorized to modify this record. ',
      // };
      // context.statusCode = 403;
      throw new Forbidden(
        'You do not have permissions to perform this action. '
      );
    }
    return context;
  };
};
