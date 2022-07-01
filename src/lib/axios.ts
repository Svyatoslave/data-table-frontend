import Axios, { type AxiosResponse } from "axios";

const extractionDataResponseInterceptor = (resp: AxiosResponse) => resp.data;

export const axios = Axios.create({ withCredentials: true });

axios.interceptors.response.use(extractionDataResponseInterceptor);
