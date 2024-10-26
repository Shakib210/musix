import Joi from 'joi';

// Define Joi schemas for creating and updating a User
const createUserSchema = Joi.object({
    userAccount: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().optional(),
    dateOfBirth: Joi.date().required(),
    enablePushNotification: Joi.boolean().optional(),
    verificationCode: Joi.number().integer().optional(),
    phoneNumber: Joi.string().optional(),
    premiumUser: Joi.boolean().optional(),
    tempPw: Joi.string().optional(),
});

const updateUserSchema = Joi.object({
    id: Joi.number().optional(),
    userAccount: Joi.string().optional(),
    email: Joi.string().email().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    gender: Joi.string().optional(),
    dateOfBirth: Joi.date().optional(),
    enablePushNotification: Joi.boolean().optional(),
    verificationCode: Joi.number().integer().optional(),
    phoneNumber: Joi.string().optional(),
    premiumUser: Joi.boolean().optional(),
    tempPw: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    deletedAt: Joi.date().optional(),
});

// Export validation functions
const validateUser = (data: any, forUpdate = false) => {
    const schema = forUpdate ? updateUserSchema : createUserSchema;
    return schema.validate(data);
};

export default validateUser;
