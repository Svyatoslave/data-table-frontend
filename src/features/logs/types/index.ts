import type { Nullable } from "@/shared/types/utility";
import type { User } from "@/features/users";

export type LogAction = "create" | "update" | "delete";

export type Log = {
  id: string;
  object: string;
  author: User;
  action: LogAction;
  date: Date;
  ip: Nullable<string>;
};
