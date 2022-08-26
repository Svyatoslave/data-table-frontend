import Axios, { type AxiosResponse } from "axios";
import { stringify } from "query-string";

import { isNonNullable } from "@/shared/utils/equal";
import { isRedirectedHttpStatus, relocateByHttpStatus } from "@/features/auth";

const extractionDataResponseInterceptor = (resp: AxiosResponse) => resp.data;

const relocateByHttpStatusResponseInterceptor = (err: unknown): unknown => {
  if (
    Axios.isAxiosError(err) &&
    isNonNullable(err.response) &&
    isRedirectedHttpStatus(err.response.status)
  ) {
    relocateByHttpStatus(err.response.status);
  }

  return Promise.reject(err);
};

export const axios = Axios.create({
  withCredentials: true,
  paramsSerializer: stringify,
});

axios.interceptors.response.use(
  extractionDataResponseInterceptor,
  relocateByHttpStatusResponseInterceptor
);
