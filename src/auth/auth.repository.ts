import prisma from "../prisma";
import { InternalServerError } from "../shared/utils/custom-errors";
import { AuthConstants } from "./constants/auth";
import { CreateUser, User } from "./models/user.model";

class AuthRepository {
  async findRole(roleId: number) {
    try {
      const RoleExist = await prisma.role.findUnique({
        where: { id: roleId },
      });

      return RoleExist;
    } catch (error) {
      throw new InternalServerError(
        AuthConstants.Error.InternalServerErrorLogin
      );
    }
  }

  async findUser(userName: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { username: userName, active: true }
      });

      return user;
    } catch (error) {
      throw new InternalServerError(
        AuthConstants.Error.InternalServerErrorLogin
      );
    }
  }

  async register(userRegister: CreateUser): Promise<Boolean> {
    try {
      await prisma.user.create({ data: userRegister });

      return true;
    } catch (error) {
      throw new InternalServerError(
        AuthConstants.Error.InternalServerErrorRegister
      );
    }
  }

  async getAllRoles() {
    try {
      const roles = await prisma.role.findMany();

      return roles;
    } catch (error) {
      throw new InternalServerError(
        AuthConstants.Error.InternalServerErrorRoles
      );
    }
  }
}

export const authRepository = new AuthRepository();
