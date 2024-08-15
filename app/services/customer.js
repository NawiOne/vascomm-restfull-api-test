const DataNotFound = require('../exceptions/dataNotFound');
const InvalidData = require('../exceptions/invalidData');
const customerModel = require('../models/customer');
const deleteEmptyValue = require('../utils/object');


async function listCustomer({
    search,
    page = 0,
    count = 10,
    orderBy = 'created_at',
    orderType = 'ASC'
}) {
    const query = customerModel.query()
        .select(
            'id',
            'name',
            'email',
            'created_at'
        )
        .whereNull('deleted_at')
        .where((builder) => whereIlikeCustomers(builder, search))
        .page(page, count)
        .orderBy(orderBy, orderType)

    return await query
}

async function whereIlikeCustomers(builder, search = '') {
    if (search) {
        const listLike = [
            'name ILIKE ?',
            'email ILIKE ?',
        ];
        for (const x of listLike) {
            builder.orWhereRaw(x, `%${search}%`);
        }
    }
}


async function getById(id) {
    const data = await customerModel.query()
        .select(
            'id',
            'name',
            'email',
            'created_at',
        )
        .whereNull('deleted_at')
        .findById(id)

    if (!data) throw new DataNotFound('User not found');

    return data
}


async function updateById(id, { name, email }) {
    const customer = await getById(id);

    if (!customer) throw new DataNotFound('User not found');

    if (email) await isDataDuplicate(id, email)

    const payload = deleteEmptyValue({ name, email })

    const dataUpdated = await customerModel.query().updateAndFetchById(id, payload)

    return {
        id,
        name: dataUpdated.name,
        email: dataUpdated.email
    }
}

async function deleteById(id) {
    const customer = await getById(id);

    if (!customer) throw new DataNotFound('User not found');

    await customerModel.query()
        .deleteById(id);

    return {
        id
    }
}

async function isDataDuplicate(id,email) {
    const data = await customerModel.query()
        .select('id')
        .whereNull('deleted_at')
        .whereNot('id', id)
        .whereRaw('LOWER(email) = ?', email.toLowerCase())
        .first();

    if (data) throw new InvalidData('Customer email is already exists')

}



module.exports = {
    listCustomer,
    getById,
    updateById,
    deleteById
}

