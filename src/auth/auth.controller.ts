import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.services";
import { RegisterUserSchema } from "./dtos/register-user";
import { LoginUserSchema } from "./dtos/login-user";
import { AuthConstants } from "./constants/auth";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginAccount = LoginUserSchema.parse(req.body);

      const accessLoginToken = await authService.login(loginAccount);

      res.status(200).json({ jwt_token: accessLoginToken });
    } catch (error) {
      next(error);
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userRegister = RegisterUserSchema.parse(req.body);

      await authService.register(userRegister);

      res
        .status(200)
        .json({ message: AuthConstants.Success.SuccessfullRegistration });
    } catch (error) {
      next(error);
    }
  }

  async getAllRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const roles = await authService.getAllRoles();

      res.status(200).json({ roles });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
