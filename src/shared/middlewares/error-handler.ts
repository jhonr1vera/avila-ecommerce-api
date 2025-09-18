import { NextFunction, Response, Request } from "express";
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  InsufficientStockError,
  UniqueConstraintError,
  ConflictError,
} from "../utils/custom-errors";
import { ZodError } from "zod/v4";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    res.status(404).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof BadRequestError) {
    res.status(400).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof ForbiddenError) {
    res.status(403).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof InsufficientStockError) {
    res.status(409).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof InternalServerError) {
    res.status(500).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof UniqueConstraintError) {
    res.status(406).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof ConflictError) {
    res.status(409).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      type: "ValidationError",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      })),
    });
  }
};
