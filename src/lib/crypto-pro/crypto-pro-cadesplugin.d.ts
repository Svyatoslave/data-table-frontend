declare module "crypto-pro-cadesplugin" {
  export interface CertificateAdjuster {
    subjectInfo: string;
    issuerInfo: string;
    serialNumber: string;
    thumbprint: string;
    validPeriod: {
      from: string;
      to: string;
    };
  }

  export interface CertificatesApi {
    getCertsList(): Promise<CertificateAdjuster[]>;
    signBase64(
      thumbprint: string,
      base64: string,
      type: boolean
    ): Promise<void>;
  }

  declare function cadespluginOnload(): Promise<CertificatesApi>;

  export default cadespluginOnload;
}
