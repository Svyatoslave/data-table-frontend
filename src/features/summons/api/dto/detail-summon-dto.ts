import type { DetailSummon } from "@/features/summons";

export interface DetailSummonDto {
  type_procedure: string;
  meeting_at: string;
  created_at: string;
}

export const mapDetailSummonFromDto = (dto: DetailSummonDto): DetailSummon => ({
  typeProcedure: dto.type_procedure,
  meetingAt: new Date(dto.meeting_at),
  createdAt: new Date(dto.created_at),
});
