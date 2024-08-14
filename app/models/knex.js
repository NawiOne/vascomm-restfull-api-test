const config = require('../../knexfile.js')['development'];
const {attachPaginate} = require('knex-paginate');

attachPaginate();

module.exports = global.knex || require('knex')(config);
