import type { Protocol, ProtocolDto } from "@/features/protocols";

export const mapProtocolFromDto = (dto: ProtocolDto): Protocol => ({
  protocolNumber: dto.protocol_number,
  applicationForms: dto.application_forms,
  typeProtocol: dto.type_protocol,
  approvalStatus: dto.approval_status,
  meetingAt: new Date(dto.meeting_at),
  createdAt: new Date(dto.created_at),
});
