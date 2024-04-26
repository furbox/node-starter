import Joi from "joi";

export const validateEmailSchema = Joi.object({
    email: Joi.string().email().required()
})

export const createUserSchema = Joi.object({
    fullname: Joi.string().min(3).max(150).required(),
    pass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    email: Joi.string().email().required()
})

export const updateUserSchema = Joi.object({
    fullname: Joi.string().min(3).max(150),
    pass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    email: Joi.string().email()
})

//changePassword
export const validateChangePassword = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    newPass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
})

//login
export const validateLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().required()
})
