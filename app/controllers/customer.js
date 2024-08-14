const customerService = require('../services/customer');
const SuccessResult = require('../utils/SuccessResult');


async function listCustomer(req, res) {
    const query = req.query;

    const data = await customerService.listCustomer(query);

    SuccessResult.make(res).send(data, 'Data retrieved successfully')


}

async function getById(req, res) {
    const id = req.params.id;

    const data = await customerService.getById(id);

    SuccessResult.make(res).send(data, 'Data retrieved successfully')

}

async function updateById(req, res) {
    const id = req.params.id;
    const email = req.body.email;
    const name = req.body.name;

    const data = await customerService.updateById(id, { name, email });

    SuccessResult.make(res).send(data, 'Data updated successfully')

}

async function deleteById(req, res) {
    const id = req.params.id;

    const data = await customerService.deleteById(id);

    SuccessResult.make(res).send(data, 'Data deleted successfully')

}

module.exports = {
    listCustomer,
    getById,
    updateById,
    deleteById
}