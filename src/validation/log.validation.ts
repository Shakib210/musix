import Joi from "joi";

const schema = Joi.object().keys({
	userId: Joi.number().integer().optional(),
	action: Joi.string().required(),
	details: Joi.string().optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
