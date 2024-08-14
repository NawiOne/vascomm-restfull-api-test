const Joi = require('joi');
const InvalidData = require('../exceptions/invalidData');


async function register(req, _, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmPassword: Joi
            .string()
            .valid(Joi.ref('password'))
            .required()
    });
    const { error } = schema.validate(req.body);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}

async function login(req, _, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) throw new InvalidData(error.details[0].message)

    return next();
}


module.exports = {
    register,
    login
}