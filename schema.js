const joi = require('joi');

const listingSchema = joi.object({
    listing : joi.object().required(),
    description :Joi.string().required(),
    location:Joi.string().required(),
    country :Joi.string().required().min(0),
    price :Joi.number().required(),
});