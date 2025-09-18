import { Response, NextFunction } from "express";
import { GlobalConstants } from "../constants/global";
import jwt from "jsonwebtoken";

export const AccessControl = (req: any, res: Response, next: NextFunction) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token is required" });
    return;
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    throw new Error(GlobalConstants.Error.InternalServerError);
  }

  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload;

    if (!payload.id || !payload.username || !payload.roleId) {
      res.status(403).json({ message: "Invalid token payload" });
      return;
    }

    req.user = {
      id: payload.id,
      username: payload.username,
      roleId: payload.roleId,
    };

    next();
  } catch (error) {
    res.status(403).json({ message: "Token not valid" });
    return;
  }
};
