// DO NOT CHANGE THIS FILE
const knex = require('knex')
const configs = require('../knexfile.js')
const { NODE_ENV } = require('../api/secrets/index.js')

module.exports = knex(configs[NODE_ENV])
