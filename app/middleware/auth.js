const Forbidden = require('../exceptions/forbidden');
const Unauthorized = require('../exceptions/unauthorized');
const { decodeToken } = require('../utils/jwtTokens');


function handleAdmin(arrayParameterPermission, req, res, next) {
  try {
    const decoded = getToken(req);
    const arrayPermission = decoded.permissions;

    for (const paramPermission of arrayParameterPermission) {
      const permission = paramPermission.toUpperCase();
      if (!arrayPermission.includes(permission)) {
        throw new Forbidden(`You don't have permission.`);
      }
    }

    req.user = decoded;
    return next();
  } catch (error) {
    const errorMessage = `Authentication problem. ${error.message}`
    if (error.code === 403) throw new Forbidden(errorMessage);
    throw new Unauthorized(errorMessage);
  }
}

function handleCustomer(req, res, next) {
  try {
    const decoded = getToken(req);
    req.user = decoded;

    return next();
  } catch (error) {
    const errorMessage = `Authentication problem. ${error.message}`

    if (error.code === 403) throw new Forbidden(errorMessage);
    throw new Unauthorized(errorMessage);
  }
}

function auth(stringUser, arrayParameterPermission) {
  return (req, res, next) => {
    if (stringUser === 'CUSTOMER') {

      return handleCustomer(req, res, next);
    }

    else if (stringUser === 'ADMIN') {
      arrayParameterPermission.push('ADMIN');
      return handleAdmin(
        arrayParameterPermission,
        req,
        res,
        next);
    }

  };
}

function getToken(req) {
  const token = req.headers.authorization;

  if (!token) {
    throw new Unauthorized('A token is required for authentication');
  }

  if (token.split(' ').length < 2) {
    throw new Unauthorized('Wrong authentication token format.');
  }
  return decodeToken(token);
}

module.exports = auth
