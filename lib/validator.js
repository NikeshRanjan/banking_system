const Joi = require('joi');

const transctionSchema = Joi.object({
    transctionType: Joi.string(),
    transctionDetails: Joi.object({
        transferredFrom: Joi.string(),
        transferredTo: Joi.string(),
        balance: Joi.number().default(0),
        amount: Joi.number().default(0)
    })
});

module.exports.validateRegisterPayload = payload => {

    const customerSchema = Joi.object({
        name: Joi.string().required().max(30).pattern( /^[a-zA-Z ]+$/),
        dob: Joi.date().iso().required(),
        gender: Joi.string().valid('Male', 'Female', 'Other').insensitive().required(),
        address: Joi.string().required(),
        accNo: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/).required(),
        transctions: Joi.array().items(transctionSchema),
        currentBalance: Joi.number().required().min(0),
    });
    const validationResult = customerSchema.validate(payload, { stripUnknown: true, abortEarly: true });
    return validationResult;
}