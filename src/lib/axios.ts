import Axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

import { storage } from "@/lib/storage";

const authRequestInterceptor = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const token = storage.getToken();
  if (token === null) return config;

  return {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  };
};

const extractionDataResponseInterceptor = (resp: AxiosResponse) => resp.data;

export const axios = Axios.create();

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(extractionDataResponseInterceptor);
