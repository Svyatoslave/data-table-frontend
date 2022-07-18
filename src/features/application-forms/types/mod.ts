import type { Nullable } from "@/shared/types/utility";
import type { EarlyTerminationApplicationForm } from "./early-termination";

export type ApplicationForm = {
  id: number;
  typeApplicationFormText: string;
  complainant: string;
  createdAt: Date;
  summaryInfo: Nullable<string>;
};

export type DetailApplicationForm = EarlyTerminationApplicationForm;
