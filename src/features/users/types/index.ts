export interface UserRole {
  id: string;
  name: string;
}

export interface User {
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  numberPhone: string;
  organizationName: string;
  role: UserRole;
}
