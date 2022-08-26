import type { Nullable } from "@/shared/types/utility";

export type ApplicationFormType =
  | "earlyTermination"
  | "changeArea"
  | "makingChanges";

export type ApplicationFormStatus =
  | "applicationAccepted"
  | "summon"
  | "protocol";

export type ApplicationForm = {
  id: number;
  type: string;
  status: ApplicationFormStatus;
  complainant: string;
  numberLicense: Nullable<string>;
  nameAreaNedr: Nullable<string>;
  subjectRF: Nullable<string>;
  createdAt: Date;
  summaryInfo: Nullable<string>;
};
