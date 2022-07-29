import type { Nullable } from "@/shared/types/utility";
import { mapNullable } from "@/shared/utils/functors";
import type { EarlyTerminationApplicationForm } from "@/features/application-forms";

interface MainInfo {
  user_info_nedr_protocol: UserInfoNedrProtocol;
  license_and_geological_character_protocol: Nullable<LicenseAndGeologicalCharacterProtocol>;
  basis_start_procedure_protocol: Nullable<BasisStartProcedureProtocol>;
}

export interface EarlyTerminationApplicationFormDto {
  id: number;
  type_application_form_text: string;
  complainant: string;
  number_license: string;
  name_area_nedr: string;
  subject_rf: string;
  created_at: Date;
  summary_info: Nullable<string>;
  main_info: MainInfo;
}

interface BasisStartProcedureProtocol {
  id_type_check: number;
  type_check: Nullable<string>;
}

interface LicenseAndGeologicalCharacterProtocol {
  license_use_nedr: LicenseUseNedr;
  vid_and_purpose_use_nedr: VidAndPurposeUseNedr;
  area_nedr_name: string;
  subject_rf: SubjectRF;
  osnovanie_granting_rights: OsnovanieGrantingRights;
  date_reg_start_initial_license: Date;
  date_reg_start: Date;
  date_reg_end: Date;
  status_area_nedr: Nullable<StatusAreaNedr>;
}

interface LicenseUseNedr {
  code_series: number;
  series: string;
  lc_number: string;
  code_vid: number;
  lc_vid: string;
  lc_number_full: string;
}

interface OsnovanieGrantingRights {
  code_osnovanie: number;
  osnovanie: string;
}

export interface StatusAreaNedr {
  code_status_otvod: number;
  status_otvod: string;
}

interface SubjectRF {
  code_region_sf: number;
  region_name: string;
}

interface VidAndPurposeUseNedr {
  purpose: Nullable<string>;
  code_vid_subsoil_use: number;
  vid_subsoil_use: string;
}

interface UserInfoNedrProtocol {
  user_nedr: UserNedr;
  ogrn: string;
  inn: string;
}

interface UserNedr {
  company_name: Nullable<string>;
  firs_name_ip: Nullable<string>;
  last_name_ip: Nullable<string>;
  patronymic_ip: Nullable<string>;
}

export const mapEarlyTerminationApplicationFormFromDto = (
  dto: EarlyTerminationApplicationFormDto
): EarlyTerminationApplicationForm => ({
  id: dto.id,
  typeApplicationFormText: dto.type_application_form_text,
  complainant: dto.complainant,
  numberLicense: dto.number_license,
  nameAreaNedr: dto.name_area_nedr,
  subjectRF: dto.subject_rf,
  createdAt: new Date(dto.created_at),
  summaryInfo: dto.summary_info,
  userInfoNedrProtocol: {
    userNedr: {
      companyName: dto.main_info.user_info_nedr_protocol.user_nedr.company_name,
      firsNameIP: dto.main_info.user_info_nedr_protocol.user_nedr.firs_name_ip,
      lastNameIP: dto.main_info.user_info_nedr_protocol.user_nedr.last_name_ip,
      patronymicIP:
        dto.main_info.user_info_nedr_protocol.user_nedr.patronymic_ip,
    },
    ogrn: dto.main_info.user_info_nedr_protocol.ogrn,
    inn: dto.main_info.user_info_nedr_protocol.inn,
  },
  licenseAndGeologicalCharacterProtocol: mapNullable(
    dto.main_info.license_and_geological_character_protocol,
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
    dto.main_info.basis_start_procedure_protocol,
    (basisStartProcedureProtocol) => ({
      idTypeCheck: basisStartProcedureProtocol.id_type_check,
      typeCheck: basisStartProcedureProtocol.type_check,
    })
  ),
});
