import type { Nullable } from "@/shared/types/utility";

export interface ApplicationForm {
  id: number;
  typeApplicationForm: string;
  complainant: string;
  createdAt: string;
  summaryInfo: Nullable<string>;
}
