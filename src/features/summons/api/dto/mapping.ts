import type {
  Summon,
  SummonDto,
  DetailSummon,
  DetailSummonDto,
} from "@/features/summons";

export const mapSummonFromDto = (dto: SummonDto): Summon => ({
  id: dto.id,
  name: dto.name,
  typeSummon: dto.type_summon,
  createAt: new Date(dto.create_at),
  meetingAt: new Date(dto.meeting_at),
});

export const mapDetailSummonFromDto = (dto: DetailSummonDto): DetailSummon => ({
  typeProcedure: dto.type_procedure,
  meetingAt: new Date(dto.meeting_at),
  createdAt: new Date(dto.created_at),
});
