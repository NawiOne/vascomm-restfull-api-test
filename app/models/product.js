const { Model } = require('objection');
const objectionSoftDelete = require('objection-js-soft-delete');
const knex = require('./knex');

Model.knex(knex);

const softDelete = objectionSoftDelete.default({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});


class Product extends softDelete(Model) {
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }


  static get tableName() {
    return 'product';
  }

}

module.exports = Product;
