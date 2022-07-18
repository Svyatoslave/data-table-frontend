import type { Nullable } from "@/shared/types/utility";
import { mapUserFromDto, type UserDto } from "@/features/users";
import type { Log } from "@/features/logs";

export type LogActionDto = "create" | "update" | "delete";

export interface LogDto {
  id: string;
  object: string;
  author: UserDto;
  action: LogActionDto;
  date: string;
  ip: Nullable<string>;
}

export const mapLogFromDto = (logDto: LogDto): Log => ({
  id: logDto.id,
  object: logDto.object,
  author: mapUserFromDto(logDto.author),
  action: logDto.action,
  date: new Date(logDto.date),
  ip: logDto.ip,
});
