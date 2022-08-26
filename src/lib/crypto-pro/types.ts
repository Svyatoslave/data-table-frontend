export interface CryptoProCertificate {
  subjectInfo: string;
  issuerInfo: string;
  serialNumber: string;
  thumbprint: string;
  validPeriod: {
    from: Date;
    to: Date;
  };
}
