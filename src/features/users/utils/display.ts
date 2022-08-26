import { isNonNullable } from "@/shared/utils/equal";
import type { User, UserRole } from "@/features/users";

export const displayUserFullName = (user: User): string =>
  isNonNullable(user.name) && isNonNullable(user.patronymic)
    ? `${user.surname} ${user.name[0]}.${user.patronymic[0]}.`
    : user.surname;

export const displayUserRole = (userRole: UserRole): string => {
  switch (userRole.name) {
    case "SecretaryCommission":
      return "Секретарь коммиссии";
    case "MemberCommission":
      return "Член коммиссии";
    case "Admin":
      return "Админ";
  }
};
