import "vue-router";
import type { UserRoleName } from "@/features/users";

type PublicityType = "public" | "private" | "shared";

declare module "vue-router" {
  interface RouteMeta {
    typeOfPublicity: PublicityType;
    allowedRoles?: UserRoleName[];
  }
}

declare module "axios" {
  export interface AxiosInstance {
    request<T, R>(config: AxiosRequestConfig<T>): Promise<R>;
    get<R>(url: string, config?: AxiosRequestConfig<R>): Promise<R>;
    delete<R>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    head<R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;
    options<R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;
    post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
    put<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
    patch<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
  }
}
