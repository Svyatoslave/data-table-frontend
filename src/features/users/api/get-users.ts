import users from "@/mocks/users.json";

import { mapPaginatedDto, type PaginatedDto } from "@/lib/api";
import { later } from "@/shared/utils/async";
import { mapUserFromDto, type User } from "@/features/users";

import type { UserDto } from "./dto";

export const getUsers = (): Promise<PaginatedDto<User>> =>
  later(500, users as PaginatedDto<UserDto>).then((data) =>
    mapPaginatedDto(data, (item) => mapUserFromDto(item))
  );
