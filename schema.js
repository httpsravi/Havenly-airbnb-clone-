const joi = require('joi');

const listingSchema = joi.object({
    listing : joi.object({
        description : joi.string().required(),
        location: joi.string().required(),
        country : joi.string().min(1).required(),
        price : joi.number().required(),
    }).required()
});

module.exports = listingSchema;
