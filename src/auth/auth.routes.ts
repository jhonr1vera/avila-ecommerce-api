import { Router } from "express";
import { authController } from "./auth.controller";
import { AdminAccess } from "../shared/middlewares/admin";
import { AccessControl } from "../shared/middlewares/access-control";

const AuthRouter = Router();

AuthRouter.post("/login", authController.login);

AuthRouter.post("/register", authController.register);

AuthRouter.get("/roles", AccessControl, AdminAccess, authController.getAllRoles);

export default AuthRouter;
