import Joi from "joi";

const schema = Joi.object().keys({
	name: Joi.string().required(),
	description: Joi.string().optional(),
	price: Joi.number().required(),
	durationMonths: Joi.number().integer().required(),
	isRecurring: Joi.boolean().optional(),
	trialDays: Joi.number().integer().optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
