import Joi from "joi";

const schema = Joi.object().keys({
	name: Joi.string().required(),
	isPrivate: Joi.boolean().optional(),
	songCount: Joi.number().integer().min(0).optional(),
	totalSongsDuration: Joi.number().integer().optional(),
	isActive: Joi.boolean().optional(),
	isCustom: Joi.boolean().optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
