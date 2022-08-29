import type { Nullable } from "@/shared/types/utility";
import type {
  ApplicationForm,
  ApplicationFormStatus,
} from "@/features/application-forms";

export type ApplicationFormStatusDto =
  | "Заявка принята"
  | "Повестка"
  | "Протокол";

export interface ApplicationFormDto {
  id: number;
  type_application_form_text: string;
  status_application_form: ApplicationFormStatusDto;
  complainant: string;
  number_license: Nullable<string>;
  name_area_nedr: Nullable<string>;
  subject_rf: Nullable<string>;
  created_at: string;
  summary_info: Nullable<string>;
}

export const mapApplicationFormStatusFromDto = (
  dto: ApplicationFormStatusDto
): ApplicationFormStatus => {
  switch (dto) {
    case "Заявка принята":
      return "applicationAccepted";
    case "Повестка":
      return "summon";
    case "Протокол":
      return "protocol";
  }
};

export const mapApplicationFormFromDto = (
  dto: ApplicationFormDto
): ApplicationForm => ({
  id: dto.id,
  type: dto.type_application_form_text,
  status: mapApplicationFormStatusFromDto(dto.status_application_form),
  complainant: dto.complainant,
  numberLicense: dto.number_license,
  nameAreaNedr: dto.name_area_nedr,
  subjectRF: dto.subject_rf,
  createdAt: new Date(dto.created_at),
  summaryInfo: dto.summary_info,
});
