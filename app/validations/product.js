const Joi = require('joi');
const InvalidData = require('../exceptions/invalidData');


async function list(req, _, next) {
    const schema = Joi.object({
        search: Joi.string().optional(),
        page: Joi.number().min(0).optional(),
        count: Joi.number().min(1).optional(),
        orderBy: Joi.number().optional(),
        orderType: Joi.string().valid('ASC', 'DESC').optional()

    });
    const { error } = schema.validate(req.query);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}

async function createProduct(req, _, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        desc: Joi.string().required(),
        stock: Joi.number().min(1).required(),


    });
    const { error } = schema.validate(req.body);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}

async function updateProduct(req, _, next) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        desc: Joi.string().optional(),
        stock: Joi.number().min(1).optional(),

    });
    const { error } = schema.validate(req.body);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}


module.exports = {
    list,
    createProduct,
    updateProduct,
}