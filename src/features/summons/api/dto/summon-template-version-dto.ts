import type { SummonTemplateVersion } from "@/features/summons";

export interface SummonTemplateVersionDto {
  name: string;
  is_latest: boolean;
  created_at: string;
}

export const mapSummonTemplateVersionFromDto = (
  dto: SummonTemplateVersionDto
): SummonTemplateVersion => ({
  name: dto.name,
  isLatest: dto.is_latest,
  createdAt: new Date(dto.created_at),
});
