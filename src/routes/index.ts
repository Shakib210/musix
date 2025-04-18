import { Application } from "express";
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";

const configureAllRoutes = (app: Application) => {
  userRoutes(app);
  loginRoutes(app);
};

export default configureAllRoutes;
