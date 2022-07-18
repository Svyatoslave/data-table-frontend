import type { User, UserRole } from "../types";

export const displayUserFullName = (user: User): string =>
  `${user.surname} ${user.name[0]}.${user.patronymic[0]}.`;

export const displayUserRole = (userRole: UserRole): string => {
  switch (userRole.name) {
    case "SecretaryCommission":
      return "Секретарь коммисси";
    case "MemberCommission":
      return "Член коммисси";
    case "Admin":
      return "Админ";
  }
};
