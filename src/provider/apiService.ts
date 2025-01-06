import axios, { AxiosInstance, AxiosResponse, AxiosProgressEvent } from "axios";
import AuthProviders from "./authProviders";

interface ApiResponse<T = any> {
  data: T;
  status: number;
  error?: string;
}

class ApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const auth = new AuthProviders();

    this.axiosInstance = axios.create({
      baseURL: apiUrl,
      timeout: 6000,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add authorization header if the user is authenticated
        if (auth.logged && auth.token) {
          config.headers.Authorization = auth.token;
        }

        if (config.headers["Content-Type"] === "multipart/form-data") {
          config.headers["Content-Type"] = undefined;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // @ts-ignore
    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (
          response.onUploadProgress &&
          typeof response.onUploadProgress === "function"
        ) {
          response.onUploadProgress({
            loaded: 0,
            total: 0,
            percentCompleted: 0,
          });
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetch Records Service
   * @param endpoint
   */
  async get<T>(endpoint: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        endpoint,
        params
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Post Record
   * @param endpoint
   * @returns
   */

  async post<T>(endpoint: string, payload?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        endpoint,
        payload
      );

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put<T>(endpoint: string, payload?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        endpoint,
        payload
      );

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        endpoint
      );

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async uploadFile<T>(
    file: File,
    doctype: string,
    onProgress?: (progressEvent: AxiosProgressEvent) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("doctype", doctype);

    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        "api/v1/media/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: onProgress,
        }
      );

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new ApiService();
