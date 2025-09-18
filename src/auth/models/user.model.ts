interface CreateUser {
  username: string;
  password: string;
  roleId: number;
  adminKey?: string;
  firstName: string;
  lastName: string;
}

interface LoginUser {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  active: boolean;
  roleId: number;
}

interface Role {
  id: number,
  roleName: string
  adminKey: string | null;
}

export { LoginUser, CreateUser, User, Role };
