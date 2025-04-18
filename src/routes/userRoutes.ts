import express from "express";
import validators from "../validation/index";
import { handleValidations } from "../middlewares/handleValidation";
import { Application } from "express";
import { createUser, getAllUsers } from "../controllers/userController";
import { PERMISSIONS } from "../config/permissions";
import { withAuthAndPermission } from "../middlewares/withAuthAndPermission";

const router = express.Router();

router
  .route("/")
  .get(
    ...withAuthAndPermission(PERMISSIONS.ALL_USER),
    getAllUsers
  )
  .post(
    handleValidations((data: any) =>
      validators.signupValidation(data, false)
    ) as any,
    ...withAuthAndPermission(PERMISSIONS.CREATE_USER),
    createUser
  );

const configure = (app: Application) => {
  app.use("/api/user", router);
};

export default configure;
