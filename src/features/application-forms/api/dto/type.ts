import type { ApplicationFormType } from "@/features/application-forms";

export interface ApplicationFormTypeDto {
  id: number;
  name: string;
}

export const mapApplicationFormTypeFromDto = (
  applicationFormTypeDto: ApplicationFormTypeDto
): ApplicationFormType => ({
  id: applicationFormTypeDto.id,
  name: applicationFormTypeDto.name,
});
