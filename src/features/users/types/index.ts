import type { Nullable } from "@/shared/types/utility";

export type UserRoleName = "Admin" | "MemberCommission" | "SecretaryCommission";

export type UserRole = {
  id: string;
  name: UserRoleName;
};

export type User = {
  id: string;
  login: Nullable<string>;
  name: Nullable<string>;
  surname: string;
  patronymic: Nullable<string>;
  email: Nullable<string>;
  numberPhone: Nullable<string>;
  organizationName: Nullable<string>;
  role: UserRole;
};
