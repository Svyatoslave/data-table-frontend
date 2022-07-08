export type UserRoleName = "Admin" | "MemberCommission" | "SecretaryCommission";

export interface UserRole {
  id: string;
  name: UserRoleName;
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
