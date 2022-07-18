export type UserRoleName = "Admin" | "MemberCommission" | "SecretaryCommission";

export type UserRole = {
  id: string;
  name: UserRoleName;
};

export type User = {
  id: string;
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  numberPhone: string;
  organizationName: string;
  role: UserRole;
};
