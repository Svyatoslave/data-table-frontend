import type { Nullable } from "@/shared/types/utility";

export type CommissionMember = {
  id: string;
  name: Nullable<string>;
  surname: string;
  patronymic: Nullable<string>;
};
