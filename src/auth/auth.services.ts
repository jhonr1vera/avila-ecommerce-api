import {
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../shared/utils/custom-errors";
import { authRepository } from "./auth.repository";
import { AuthConstants } from "./constants/auth";
import { LoginUser, CreateUser, Role } from "./models/user.model";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { GlobalConstants } from "../shared/constants/global";

class AuthService {
  async findRole(roleId: number): Promise<Role | null> {
    const RoleExist = await authRepository.findRole(roleId);

    if (!RoleExist) {
      throw new NotFoundError(AuthConstants.Error.NotFoundErrorRoleById);
    }

    return RoleExist;
  }

  async findUser(userName: string) {
    const userExists = await authRepository.findUser(userName);

    return userExists;
  }

  async login(loginAccount: LoginUser): Promise<string> {
    const username = loginAccount.username;
    const password = loginAccount.password;

    const userExists = await this.findUser(username);

    if (!userExists || userExists.password !== password) {
      throw new UnauthorizedError(AuthConstants.Error.UnauthorizedError);
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
      throw new InternalServerError(GlobalConstants.Error.InternalServerError);
    }

    const accessToken = jwt.sign(
      {
        id: userExists.id,
        username: userExists.username,
        roleId: userExists.roleId,
      },
      secret,
      { expiresIn: "1h" }
    );

    return accessToken;
  }

  async register(userRegister: CreateUser): Promise<Boolean> {
    const userExists = await this.findUser(userRegister.username);

    const role = await this.findRole(userRegister.roleId);

    if (userExists) {
      throw new ConflictError(AuthConstants.Error.ConflictError);
    }

    if (role && role.id === GlobalConstants.Role.adminId) {
      if (userRegister.adminKey && userRegister.adminKey !== role.adminKey) {
        throw new UnauthorizedError(
          AuthConstants.Error.UnauthorizedErrorAdminKey
        );
      }
    }

    const { adminKey, ...userDataWithoutAdminKey } = userRegister;

    await authRepository.register(userDataWithoutAdminKey);

    return true;
  }

  async getAllRoles(): Promise<Role[]> {
    const roles = await authRepository.getAllRoles();

    if (!roles) {
      throw new NotFoundError(AuthConstants.Error.NotFoundErrorRoles);
    }

    return roles;
  }
}

export const authService = new AuthService();
