const { raw } = require('objection');
const productModel = require('../models/product');
const InvalidData = require('../exceptions/invalidData');
const DataNotFound = require('../exceptions/dataNotFound');
const deleteEmptyValue = require('../utils/object');

async function listProduct({
    search,
    page = 0,
    count = 10,
    orderBy = 'created_at',
    orderType = 'ASC'
}) {
    const query = productModel.query()
        .select(
            'id',
            'name',
            'desc',
            raw(`CASE 
                    WHEN stock >= 5 THEN 'stock tersedia'
                    WHEN stock < 5 AND stock > 0 THEN 'stock < 5'
                    WHEN stock = 0 THEN 'stock tidak tersedia'
                 END` ).as('stock'),
            'created_at'
        )
        .whereNull('deleted_at')
        .where((builder) => whereIlikeProduct(builder, search))
        .page(page, count)
        .orderBy(orderBy, orderType)

    return await query
}

async function whereIlikeProduct(builder, search) {
    if (search) {
        const listLike = [
            'name ILIKE ?',
            '"desc" ILIKE ?',
        ];
        for (const x of listLike) {
            builder.orWhereRaw(x, `%${search}%`);
        }
    }
}

async function createProduct({
    name,
    desc,
    stock
}) {
    const existingProduct = await productModel.query()
        .whereRaw('LOWER(name) = ?', name.toLowerCase())
        .whereNull('deleted_at');

    if (existingProduct.length > 0) {
        throw new InvalidData('Product already exists')
    }

    const dataInserted = await productModel.query()
        .insertAndFetch({
            name,
            desc,
            stock
        });

    return {
        id: dataInserted.id,
        name: dataInserted.name,
    }

}


async function getById(id) {
    const data = await productModel.query()
        .select(
            'id',
            'name',
            'desc',
            raw(`CASE 
                    WHEN stock >= 5 THEN 'stock tersedia'
                    WHEN stock < 5 AND stock > 0 THEN 'stock < 5'
                    WHEN stock = 0 THEN 'stock tidak tersedia'
                 END` ).as('stock')
        )
        .whereNull('deleted_at')
        .findById(id);

    if (!data) throw new DataNotFound('Product not found');

    return data;
}

async function updateById(id, {
    name,
    desc,
    stock
}) {
    const data = await getById(id);

    if (!data) throw new DataNotFound('Product not found');

    const payload = deleteEmptyValue({
        name,
        desc,
        stock
    });

    if (name) await isDataDuplicate(id, name);

    const dataUpdated = await productModel.query()
        .patchAndFetchById(id, payload);

    return {
        id,
        name: dataUpdated.name,
        desc: dataUpdated.desc,
        stock: dataUpdated.stock
    }
}

async function isDataDuplicate(id, name) {
    const data = await productModel.query()
        .select('id')
        .whereNull('deleted_at')
        .whereNot('id', id)
        .whereRaw('LOWER(name) = ?', name.toLowerCase())
        .first();

    if (data) throw new InvalidData('Product name is already exists')

}

async function deleteById(id) {
    const product = await getById(id);

    if (!product) throw new DataNotFound('Product not found');

    await productModel.query()
        .deleteById(id);

    return {
        id
    }
}



module.exports = {
    listProduct,
    createProduct,
    getById,
    updateById,
    deleteById
}