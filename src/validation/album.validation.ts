import Joi from "joi";

const schema = Joi.object().keys({
	name: Joi.string().required(),
	imagePath: Joi.string().uri().optional(),
	releaseYear: Joi.date().required(),
	numberOfSongs: Joi.number().integer().min(0).optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
