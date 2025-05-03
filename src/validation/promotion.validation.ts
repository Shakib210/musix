import Joi from "joi";

const schema = Joi.object().keys({
	code: Joi.string().required(),
	discount: Joi.number().required(),
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	isActive: Joi.boolean().optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
