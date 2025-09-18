import { Response, NextFunction } from "express";
import { GlobalConstants } from "../constants/global";

export const AdminAccess = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({
      message: "Token is required",
    });
    return;
  }

  if (req.user.roleId !== GlobalConstants.Role.adminId) {
    res.status(403).json({
      message: "Access denied. Admin role required",
    });
    return;
  }

  next();
};
