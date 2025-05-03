import Joi from "joi";

const schema = Joi.object().keys({
	name: Joi.string().required(),
	stageName: Joi.string().required(),
	imagePath: Joi.string().uri().optional(),
	bio: Joi.string().optional(),
	dob: Joi.date().optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
