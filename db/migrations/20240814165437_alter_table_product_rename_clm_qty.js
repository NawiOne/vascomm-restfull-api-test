exports.up = async function (knex) {
    await knex.schema.alterTable('product', (table) => {
        table.renameColumn('qty', 'stock');
    })
};


exports.down = async function (knex) {
    await knex.schema.alterTable('product', (table) => {
        table.renameColumn('stock', 'qty');
    })

};

