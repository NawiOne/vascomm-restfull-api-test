const config = require('../../knexfile.js')['development'];


module.exports = global.knex || require('knex')(config);
