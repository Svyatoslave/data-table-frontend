import type { Nullable } from "@/shared/types/utility";

export type ApplicationForm = {
  id: number;
  typeApplicationFormText: string;
  complainant: string;
  createdAt: Date;
  summaryInfo: Nullable<string>;
};

export interface ApplicationFormType {
  id: number;
  name: string;
}
