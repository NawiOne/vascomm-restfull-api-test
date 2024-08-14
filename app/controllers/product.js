const productService = require('../services/product');
const SuccessResult = require('../utils/SuccessResult');

async function listProduct(req, res) {
    const query = req.query;

    const data = await productService.listProduct(query);

    SuccessResult.make(res).send(data, 'Data retrieved successfully')
}

async function createProduct(req, res) {
    const body = req.body;

    const data = await productService.createProduct(body);

    SuccessResult.make(res).send(data, 'Data created successfully')

}

async function getById(req, res) {
    const id = req.params.id;

    const data = await productService.getById(id);

    SuccessResult.make(res).send(data, 'Data retrieved successfully')

}

async function updateById(req, res) {
    const id = req.params.id;
    const body = req.body

    const data = await productService.updateById(id, body);

    SuccessResult.make(res).send(data, 'Data updated successfully')

}

async function deleteById(req, res) {
    const id = req.params.id;

    const data = await productService.deleteById(id);

    SuccessResult.make(res).send(data, 'Data deleted successfully')

}



module.exports = {
    listProduct,
    createProduct,
    getById,
    updateById,
    deleteById
}