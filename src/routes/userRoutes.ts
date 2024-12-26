import express from "express";
import validators from "../validation/index";
import { handleValidations } from "../middlewares/handleValidation";
import { Application } from "express";
import { createUser, getAllUsers } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authenticate";
import { authorizePermission } from "../middlewares/authorize";
import { PERMISSIONS } from "../config/permissions";

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(
    handleValidations((data: any) =>
      validators.signupValidation(data, false)
    ) as any,
    authenticateToken,
    authorizePermission(PERMISSIONS.CREATE_PRODUCT),
    createUser
  );

const configure = (app: Application) => {
  app.use("/api/user", router);
};

export default configure;
