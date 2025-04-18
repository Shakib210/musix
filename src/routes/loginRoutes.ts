import { login } from "../controllers/loginController";
import express, { Application } from "express";

const router = express.Router();

router.route("/login").post(login);

const configure = (app: Application) => {
  app.use("/api", router);
};

export default configure;
