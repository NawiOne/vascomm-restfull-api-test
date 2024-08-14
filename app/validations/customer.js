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

async function update(req, _, next) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
    });
    const { error } = schema.validate(req.body);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}


module.exports = {
    update,
    list
}