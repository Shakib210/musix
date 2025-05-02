import Joi from "joi";

const schema = Joi.object().keys({
	userSubscriptionId: Joi.number().required(),
	amount: Joi.number().positive().required(),
	currency: Joi.string().required(),
	paymentMethod: Joi.string().required(),
	status: Joi.string().valid("SUCCESS", "FAILED").required(),
	failureReason: Joi.string().optional(),
	providerDetails: Joi.string().optional(),
});

const validate = (data: any) => {
	const result = schema.validate(data);
	result.value = data;
	return result;
};

export default validate;
