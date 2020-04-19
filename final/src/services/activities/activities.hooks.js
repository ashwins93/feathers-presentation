const { authenticate } = require('@feathersjs/authentication').hooks;

const addUser = require('../../hooks/add-user');

const includeUser = require('../../hooks/include-user');

const verifyOwner = require('../../hooks/verify-owner');

module.exports = {
  before: {
    all: [],
    find: [includeUser()],
    get: [includeUser()],
    create: [authenticate('jwt'), addUser()],
    update: [authenticate('jwt'), verifyOwner()],
    patch: [authenticate('jwt'), verifyOwner()],
    remove: [authenticate('jwt'), verifyOwner()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
