import Joi from "joi";

const schema = Joi.object().keys({
	name: Joi.string().required(),
	url: Joi.string().uri().optional(),
	imagePath: Joi.string().uri().optional(),
	videoLink: Joi.string().uri().optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
