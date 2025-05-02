import express from "express";
import validators from "../validation/index";
import { handleValidations } from "../middlewares/handleValidation";
import { Application } from "express";
import { createUser, getAllUsers, getUserByEmail } from "../controllers/userController";
import { PERMISSIONS } from "../config/permissions";
import { withAuthAndPermission } from "../middlewares/withAuthAndPermission";
import { authenticateToken } from "@middlewares/authenticate";

const router = express.Router();

router
	.route("/")
	.get(...withAuthAndPermission(PERMISSIONS.ALL_USER), getAllUsers)
	.post(
		handleValidations((data: any) => validators.signupValidation(data, false)) as any,
		...withAuthAndPermission(PERMISSIONS.CREATE_USER),
		createUser
	);

router.route("/:email").get(authenticateToken, getUserByEmail).patch(...withAuthAndPermission(PERMISSIONS.UPDATE_USER), getAllUsers).delete(...withAuthAndPermission(PERMISSIONS.DELETE_USER), getAllUsers);

const configure = (app: Application) => {
	app.use("/api/user", router);
};

export default configure;
