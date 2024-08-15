/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('product').del()
  await knex('product').insert([
    {
      name: 'OPPO',
      desc: 'Smartphone canggih OPPO',
      stock: 5
    },
    {
      name: 'Iphone',
      desc: 'Smartphone canggih Iphone',
      stock: 5
    },
    {
      name: 'Motorola',
      desc: 'Smartphone canggih Motorola',
      stock: 1
    },
    {
      name: 'Nokia 5300',
      desc: 'Smartphone canggih dari nokia',
      stock: 10
    },
    {
      name: 'Nokia 5600',
      desc: 'Smartphone canggih dari nokia',
      stock: 10
    },
    {
      name: 'Realme',
      desc: 'Smartphone canggih dari Realme',
      stock: 2
    },
    {
      name: 'IQOO',
      desc: 'Smartphone canggih dari IQOO',
      stock: 3
    },
    {
      name: 'Huawei',
      desc: 'Smartphone canggih dari Huawei',
      stock: 3
    },
    {
      name: 'Supra',
      desc: 'Smartphone canggih dari Supra',
      stock: 1
    },
    {
      name: 'Polythron',
      desc: 'Smartphone canggih dari Polythron',
      stock: 1
    },
  ]);
};
