import type { Nullable } from "@/shared/types/utility";
import type { ApplicationFormType } from "@/features/application-forms";

export type ProtocolVotingStatus =
  | "completed"
  | "forApproval"
  | "signingByMemberCommission"
  | "signingByChairman";

export type Protocol = {
  id: number;
  applicationFormIds: number[];
  countApplicationForm: number;
  typeProcedure: ApplicationFormType;
  numberLicence: Nullable<string>;
  nameArea: Nullable<string>;
  subjectRf: Nullable<string>;
  votingStatus: ProtocolVotingStatus;
  meetingAt: Date;
  createdAt: Date;
};
