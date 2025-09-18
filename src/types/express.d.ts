declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      roleId: number;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};