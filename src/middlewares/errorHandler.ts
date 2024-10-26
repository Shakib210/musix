import { ErrorReport } from "joi";
import { GeneralError } from "../utils/error.js";
import { NextFunction, Request, Response } from "express";

const handleError = async (err: ErrorReport, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof GeneralError) {
		const code = err.getCode();
		return res.status(code).json({ name: err.name, msg: err.message, success: false });
	}
	return res.status(500).json({
		name: "internal server error",
		msg: err.message,
		success: false,
	});
};
export default handleError;
