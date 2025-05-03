import Joi from "joi";

const schema = Joi.object().keys({
	userId: Joi.number().required(),
	entityType: Joi.string().valid("SONG", "ALBUM", "ARTIST").required(),
	entityId: Joi.number().required(),
	rating: Joi.number().integer().min(1).max(5).required(),
	comment: Joi.string().optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
