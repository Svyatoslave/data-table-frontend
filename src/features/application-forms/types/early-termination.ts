import type { Nullable } from "@/shared/types/utility";

export interface EarlyTerminationApplicationForm {
  id: number;
  typeApplicationForm: string;
  complainant: string;
  numberLicense: string;
  nameAreaNedr: string;
  subjectRF: string;
  createdAt: Date;
  summaryInfo: Nullable<string>;
  userInfoNedrProtocol: UserInfoNedrProtocol;
  licenseAndGeologicalCharacterProtocol: Nullable<LicenseAndGeologicalCharacterProtocol>;
  basisStartProcedureProtocol: Nullable<BasisStartProcedureProtocol>;
}

interface BasisStartProcedureProtocol {
  idTypeCheck: number;
  typeCheck: Nullable<string>;
}

interface LicenseAndGeologicalCharacterProtocol {
  licenseUseNedr: LicenseUseNedr;
  vidAndPurposeUseNedr: VidAndPurposeUseNedr;
  areaNedrName: string;
  subjectRF: SubjectRF;
  osnovanieGrantingRights: OsnovanieGrantingRights;
  dateRegStartInitialLicense: Date;
  dateRegStart: Date;
  dateRegEnd: Date;
  statusAreaNedr: Nullable<StatusAreaNedr>;
}

interface LicenseUseNedr {
  codeSeries: number;
  series: string;
  lcNumber: string;
  codeVid: number;
  lcVid: string;
  lcNumberFull: string;
}

interface OsnovanieGrantingRights {
  codeOsnovanie: number;
  osnovanie: string;
}

interface StatusAreaNedr {
  codeStatusOtvod: number;
  statusOtvod: string;
}

interface SubjectRF {
  codeRegionSf: number;
  regionName: string;
}

interface VidAndPurposeUseNedr {
  purpose: Nullable<string>;
  codeVidSubsoilUse: number;
  vidSubsoilUse: string;
}

interface UserInfoNedrProtocol {
  userNedr: UserNedr;
  ogrn: string;
  inn: string;
}

interface UserNedr {
  companyName: Nullable<string>;
  firsNameIP: Nullable<string>;
  lastNameIP: Nullable<string>;
  patronymicIP: Nullable<string>;
}
