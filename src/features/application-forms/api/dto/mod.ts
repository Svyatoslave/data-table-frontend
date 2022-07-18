import type { Nullable } from "@/shared/types/utility";
import type { EarlyTerminationApplicationFormDto } from "./early-termination";

export interface ApplicationFormDto {
  id: number;
  type_application_form_text: string;
  complainant: string;
  created_at: string;
  summary_info: Nullable<string>;
}

export type DetailApplicationFormDto = EarlyTerminationApplicationFormDto;
