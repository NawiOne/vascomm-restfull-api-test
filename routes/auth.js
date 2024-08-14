const routes = require('express-promise-router')();
const authValidation = require('../app/validations/auth')
const authController = require('../app/controllers/auth')

routes.post(
  '/api/v1/auth/register',
  authValidation.register,
  authController.registerCustomer
);

routes.post(
  '/api/v1/auth/user/register',
  authValidation.register,
  authController.registerUser
);

routes.get(
  '/api/v1/auth/google',
  authController.loginGoogle
);

routes.get(
  '/api/v1/auth/google/callback',
  authController.googleCallback
);

//login for user admin
routes.post(
  '/api/v1/auth/user/login',
  authValidation.login,
  authController.loginUser
);

//login for customer
routes.post(
  '/api/v1/auth/login',
  authValidation.login,
  authController.loginCustomer
);



module.exports = routes
