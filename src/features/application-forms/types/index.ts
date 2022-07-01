import type { Nullable } from "@/shared/types/utility";

export interface ApplicationForm {
  id: string;
  typeApplicationForm: string;
  complainant: string;
  createdAt: string;
  summaryInfo: Nullable<string>;
}
