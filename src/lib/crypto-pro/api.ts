import "cadesplugin";
import cryptoProCadesplugin from "crypto-pro-cadesplugin";

import { range } from "@/shared/utils/range";

import type { CryptoProCertificate } from "./types";

declare const cadesplugin: CADESPluginAsync;

interface CadesPluginError {
  message: string;
}

const mapToCryptoProCertificate = async (
  certificate: CAPICOM.CertificateAsync
): Promise<CryptoProCertificate> => ({
  subjectInfo: await certificate.SubjectName,
  issuerInfo: await certificate.IssuerName,
  serialNumber: await certificate.SerialNumber,
  thumbprint: await certificate.Thumbprint,
  validPeriod: {
    from: new Date((await certificate.ValidFromDate) as unknown as string),
    to: new Date((await certificate.ValidToDate) as unknown as string),
  },
});

export const getCertificates = async (): Promise<CryptoProCertificate[]> => {
  try {
    await cadesplugin;

    const oStore = await cadesplugin.CreateObjectAsync("CAdESCOM.Store");

    await oStore.Open(
      cadesplugin.CAPICOM_CURRENT_USER_STORE,
      cadesplugin.CAPICOM_MY_STORE,
      cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
    );

    const certificates = await oStore.Certificates;
    const count = await certificates.Count;

    const result: CryptoProCertificate[] = [];

    for (const idx of range(1, count)) {
      const innerCertificate = await certificates.Item(idx);
      const cryptoProCertificate = await mapToCryptoProCertificate(
        innerCertificate
      );

      result.push(cryptoProCertificate);
    }

    await oStore.Close();

    return result;
  } catch (err) {
    if (typeof err === "object") {
      throw new Error((err as CadesPluginError).message);
    } else {
      throw new Error(err as string);
    }
  }
};

export const signBase64 = async (
  thumbprint: string,
  base64: string,
  type: boolean
): Promise<void> => {
  const certsApi = await cryptoProCadesplugin();

  return certsApi.signBase64(thumbprint, base64, type);
};
