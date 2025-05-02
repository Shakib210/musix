import Joi from "joi";

const schema = Joi.object().keys({
	name: Joi.string().required(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
