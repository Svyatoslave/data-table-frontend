import type { User, UserRole } from "../types";

export type UserRoleNameDto =
  | "Admin"
  | "MemberCommission"
  | "SecretaryCommission";

export interface UserRoleDto {
  id: string;
  name: UserRoleNameDto;
}

export interface UserDto {
  id: string;
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  numberPhone: string;
  organizationName: string;
  role: UserRoleDto;
}

export const mapUserRoleFromDto = (userRoleDto: UserRoleDto): UserRole => ({
  id: userRoleDto.id,
  name: userRoleDto.name,
});

export const mapUserFromDto = (userDto: UserDto): User => ({
  id: userDto.id,
  login: userDto.login,
  name: userDto.name,
  surname: userDto.surname,
  patronymic: userDto.patronymic,
  email: userDto.email,
  numberPhone: userDto.numberPhone,
  organizationName: userDto.organizationName,
  role: mapUserRoleFromDto(userDto.role),
});
