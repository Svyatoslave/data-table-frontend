import type { Nullable } from "@/shared/types/utility";

export interface EarlyTerminationApplicationFormDto {
  id: number;
  type_application_form: string;
  complainant: string;
  number_license: string;
  name_area_nedr: string;
  subject_rf: string;
  created_at: Date;
  summary_info: Nullable<string>;
  user_info_nedr_protocol: UserInfoNedrProtocol;
  license_and_geological_character_protocol: Nullable<LicenseAndGeologicalCharacterProtocol>;
  basis_start_procedure_protocol: Nullable<BasisStartProcedureProtocol>;
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
