import type { Nullable } from "@/shared/types/utility";
import type { ApplicationFormType } from "@/features/application-forms";
import type { Protocol, ProtocolVotingStatus } from "@/features/protocols";

export type ProtocolTypeProcedureDto = 1 | 2 | 3;

export type ProtocolVotingStatusDto = 0 | 1 | 2 | 3;

export type ProtocolDto = {
  id: number;
  application_form_ids: number[];
  count_application_form: number;
  type_procedure: ProtocolTypeProcedureDto;
  number_licence: Nullable<string>;
  name_area: Nullable<string>;
  subject_rf: Nullable<string>;
  voting_status: ProtocolVotingStatusDto;
  meeting_at: string;
  created_at: string;
};

const mapProtocolTypeProcedureFromDto = (
  dto: ProtocolTypeProcedureDto
): ApplicationFormType => {
  switch (dto) {
    case 1:
      return "earlyTermination";
    case 2:
      return "changeArea";
    case 3:
      return "makingChanges";
  }
};

const mapProtocolVotingStatusFromDto = (
  dto: ProtocolVotingStatusDto
): ProtocolVotingStatus => {
  switch (dto) {
    case 0:
      return "completed";
    case 1:
      return "forApproval";
    case 2:
      return "signingByMemberCommission";
    case 3:
      return "signingByChairman";
  }
};

export const mapProtocolFromDto = (dto: ProtocolDto): Protocol => ({
  id: dto.id,
  applicationFormIds: dto.application_form_ids,
  countApplicationForm: dto.count_application_form,
  typeProcedure: mapProtocolTypeProcedureFromDto(dto.type_procedure),
  numberLicence: dto.number_licence,
  nameArea: dto.name_area,
  subjectRf: dto.subject_rf,
  votingStatus: mapProtocolVotingStatusFromDto(dto.voting_status),
  meetingAt: new Date(dto.meeting_at),
  createdAt: new Date(dto.created_at),
});
