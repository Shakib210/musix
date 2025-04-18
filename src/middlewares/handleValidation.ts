import { BadRequest } from "../utils/error.js";

// eslint-disable-next-line
export const handleValidations = (validate: any) => {
	return (req: Request, res: Response, next: any) => {
		const result = validate(req.body);
		const isValid = result.error == null;
		if (isValid) {
			return next();
		}

		const { details } = result.error;
		const message = details.map((e: any) => e.message);
		const msg = message.join(",");
		throw new BadRequest(msg);
	};
};
