const Joi = require('joi');
const InvalidData = require('../exceptions/invalidData');


async function paramId(req, _, next) {
    const schema = Joi.object({
        id: Joi.number().required()


    });
    const { error } = schema.validate(req.params);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}


module.exports = {
    paramId
}