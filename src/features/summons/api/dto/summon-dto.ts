import type { Summon } from "@/features/summons";

export interface SummonDto {
  id: number;
  name: string;
  type_summon: number;
  created_at: string;
  meeting_at: string;
}

export const mapSummonFromDto = (dto: SummonDto): Summon => ({
  id: dto.id,
  name: dto.name,
  typeSummon: dto.type_summon,
  createdAt: new Date(dto.created_at),
  meetingAt: new Date(dto.meeting_at),
});
