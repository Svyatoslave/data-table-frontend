import { mapNullable } from "@/shared/utils/functors";
import type { EarlyTerminationApplicationForm } from "../../types/early-termination";
import type { ApplicationForm } from "../../types/mod";
import type { EarlyTerminationApplicationFormDto } from "./early-termination";
import type { ApplicationFormDto } from "./mod";

export const mapApplicationFormFromDto = (
  dto: ApplicationFormDto
): ApplicationForm => ({
  id: dto.id,
  typeApplicationFormText: dto.type_application_form_text,
  complainant: dto.complainant,
  createdAt: new Date(dto.created_at),
  summaryInfo: dto.summary_info,
});

export const mapEarlyTerminationApplicationFormFromDto = (
  dto: EarlyTerminationApplicationFormDto
): EarlyTerminationApplicationForm => ({
  id: dto.id,
  typeApplicationForm: dto.type_application_form,
  complainant: dto.complainant,
  numberLicense: dto.number_license,
  nameAreaNedr: dto.name_area_nedr,
  subjectRF: dto.subject_rf,
  createdAt: new Date(dto.created_at),
  summaryInfo: dto.summary_info,
  userInfoNedrProtocol: {
    userNedr: {
      companyName: dto.user_info_nedr_protocol.user_nedr.company_name,
      firsNameIP: dto.user_info_nedr_protocol.user_nedr.firs_name_ip,
      lastNameIP: dto.user_info_nedr_protocol.user_nedr.last_name_ip,
      patronymicIP: dto.user_info_nedr_protocol.user_nedr.patronymic_ip,
    },
    ogrn: dto.user_info_nedr_protocol.ogrn,
    inn: dto.user_info_nedr_protocol.inn,
  },
  licenseAndGeologicalCharacterProtocol: mapNullable(
    dto.license_and_geological_character_protocol,
    (licenseAndGeologicalCharacterProtocol) => ({
      licenseUseNedr: {
        codeSeries:
          licenseAndGeologicalCharacterProtocol.license_use_nedr.code_series,
        series: licenseAndGeologicalCharacterProtocol.license_use_nedr.series,
        lcNumber:
          licenseAndGeologicalCharacterProtocol.license_use_nedr.lc_number,
        codeVid:
          licenseAndGeologicalCharacterProtocol.license_use_nedr.code_vid,
        lcVid: licenseAndGeologicalCharacterProtocol.license_use_nedr.lc_vid,
        lcNumberFull:
          licenseAndGeologicalCharacterProtocol.license_use_nedr.lc_number_full,
      },
      vidAndPurposeUseNedr: {
        purpose:
          licenseAndGeologicalCharacterProtocol.vid_and_purpose_use_nedr
            .purpose,
        codeVidSubsoilUse:
          licenseAndGeologicalCharacterProtocol.vid_and_purpose_use_nedr
            .code_vid_subsoil_use,
        vidSubsoilUse:
          licenseAndGeologicalCharacterProtocol.vid_and_purpose_use_nedr
            .vid_subsoil_use,
      },
      areaNedrName: licenseAndGeologicalCharacterProtocol.area_nedr_name,
      subjectRF: {
        codeRegionSf:
          licenseAndGeologicalCharacterProtocol.subject_rf.code_region_sf,
        regionName:
          licenseAndGeologicalCharacterProtocol.subject_rf.region_name,
      },
      osnovanieGrantingRights: {
        codeOsnovanie:
          licenseAndGeologicalCharacterProtocol.osnovanie_granting_rights
            .code_osnovanie,
        osnovanie:
          licenseAndGeologicalCharacterProtocol.osnovanie_granting_rights
            .osnovanie,
      },
      dateRegStartInitialLicense: new Date(
        licenseAndGeologicalCharacterProtocol.date_reg_start_initial_license
      ),
      dateRegStart: new Date(
        licenseAndGeologicalCharacterProtocol.date_reg_start
      ),
      dateRegEnd: new Date(licenseAndGeologicalCharacterProtocol.date_reg_end),
      statusAreaNedr: mapNullable(
        licenseAndGeologicalCharacterProtocol.status_area_nedr,
        (statusAreaNedr) => ({
          codeStatusOtvod: statusAreaNedr.code_status_otvod,
          statusOtvod: statusAreaNedr.status_otvod,
        })
      ),
    })
  ),
  basisStartProcedureProtocol: mapNullable(
    dto.basis_start_procedure_protocol,
    (basisStartProcedureProtocol) => ({
      idTypeCheck: basisStartProcedureProtocol.id_type_check,
      typeCheck: basisStartProcedureProtocol.type_check,
    })
  ),
});
