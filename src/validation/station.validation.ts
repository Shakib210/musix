import Joi from "joi";

const schema = Joi.object().keys({
	rsName: Joi.string().required(),
	rsFrequency: Joi.string().required(),
	rsUrl: Joi.string().uri().required(),
	rsImageUrl: Joi.string().uri().optional(),
	description: Joi.string().optional(),
	like: Joi.number().integer().optional(),
	favorite: Joi.number().integer().optional(),
	frequencyName: Joi.string().optional(),
	type: Joi.string().valid("LIVE_RADIO", "PODCAST").required(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
