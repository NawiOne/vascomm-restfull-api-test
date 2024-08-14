const routes = require('express-promise-router')();
const customerController = require('../app/controllers/customer');
const auth = require('../app/middleware/auth');
const customerValidation = require('../app/validations/customer');
const requestValidation = require('../app/validations/request')


routes.get(
  '/api/v1/customer',
  auth('ADMIN' , ['CUSTOMER']),
  customerValidation.list,
  customerController.listCustomer
);

routes.get(
  '/api/v1/customer/:id',
  auth('CUSTOMER'),
  requestValidation.paramId,
  customerController.getById
);

routes.patch(
  '/api/v1/customer/:id',
  auth('CUSTOMER'),
  requestValidation.paramId,
  customerValidation.update,
  customerController.updateById
);

routes.delete(
  '/api/v1/customer/:id',
  auth('ADMIN', ['CUSTOMER']),
  requestValidation.paramId,
  customerController.deleteById
);


module.exports = routes
