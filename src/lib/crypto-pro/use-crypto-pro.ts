import type { Ref } from "vue";
import { useQuery, type UseQueryReturnType } from "vue-query";

import {
  type CryptoProCertificate,
  getCertificates,
  signBase64 as signBase64Api,
} from "@/lib/crypto-pro";

export interface UseCryptoProOptions {
  enabled: Ref<boolean>;
  onError?: (err: Error) => void;
}

export interface UseCryptoProReturn {
  certificatesQuery: UseQueryReturnType<CryptoProCertificate[], unknown>;
  signBase64: (
    thumbprint: string,
    base64: string,
    type: boolean
  ) => Promise<void>;
}

export const useCryptoPro = (
  options: UseCryptoProOptions
): UseCryptoProReturn => {
  const certificatesQuery = useQuery({
    retry: false,
    enabled: options.enabled,
    queryKey: "crypto-pro-certificates",
    queryFn: getCertificates,
    onError: options.onError,
  });

  const signBase64 = async (
    thumbprint: string,
    base64: string,
    type: boolean
  ): Promise<void> => {
    await signBase64Api(thumbprint, base64, type);
  };

  return {
    certificatesQuery,
    signBase64,
  };
};
