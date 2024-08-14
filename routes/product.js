const routes = require('express-promise-router')();
const productController = require('../app/controllers/product');
const auth = require('../app/middleware/auth');
const productValidation = require('../app/validations/product');
const requestValidation = require('../app/validations/request')


routes.get(
    '/api/v1/product',
    productValidation.list,
    productController.listProduct
);

routes.post(
    '/api/v1/product',
    auth('ADMIN', ['PRODUCT']),
    productValidation.createProduct,
    productController.createProduct
);

routes.get(
    '/api/v1/product/:id',
    requestValidation.paramId,
    productController.getById
);

routes.patch(
    '/api/v1/product/:id',
    auth('ADMIN', ['PRODUCT']),
    requestValidation.paramId,
    productValidation.updateProduct,
    productController.updateById
);

routes.delete(
    '/api/v1/product/:id',
    auth('ADMIN', ['PRODUCT']),
    requestValidation.paramId,
    productController.deleteById
);







module.exports = routes
