class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

class InsufficientStockError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InsuficcientStockError";
  }
}

class UniqueConstraintError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UniqueConstraintError";
  }
}

class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UniqueConstraintError";
  }
}

export {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  InsufficientStockError,
  UniqueConstraintError,
  ConflictError,
};
