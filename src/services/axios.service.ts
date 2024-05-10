/* eslint-disable */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// import { redirect } from 'react-router-dom';
import StorageService from "./storage.service";

interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}
const globalConfig: RetryConfig = {
  retry: 3,
  retryDelay: 1000,
};
const notLoggedInInstance = axios.create();
const loggedInInstance = axios.create(globalConfig);
const loggedInUploadInstance = axios.create(globalConfig);

type AxiosInstances = {
  notLoggedInInstance: AxiosInstance;
  loggedInInstance: AxiosInstance;
  loggedInUploadInstance: AxiosInstance;
};

notLoggedInInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = "http://localhost:3600";
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    } as any;
    return config;
  },
  (error) => Promise.reject(error)
);

loggedInInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = "http://localhost:3600";
    const authToken = StorageService.getToken();
    config.headers = {
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    } as any;
    return config;
  },
  (error) => Promise.reject(error)
);

loggedInInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = error;
    if (error.response.status === 401) {
      const authToken = StorageService.getToken();
      if (!config || !config.retry) {
        return Promise.reject(error);
      }
      config.retry -= 1;
      if (config.headers.Authorization !== `Bearer ${authToken}`) {
        config.headers.Authorization = `Bearer ${authToken}`;
        return loggedInInstance(config);
      } else {
        config.headers.Authorization = `Bearer ${authToken}`;
        const delayRetryRequest = new Promise<void>((resolve) => {
          setTimeout(() => {
            console.log("retry the request", config.url);
            resolve();
          }, config.retryDelay || 1000);
        });
        return delayRetryRequest.then(() => loggedInInstance(config));
      }
    }
  }
);

loggedInUploadInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = "http://localhost:3600";
    const authToken = StorageService.getToken();
    config.headers = {
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    } as any;
    return config;
  },
  (error) => Promise.reject(error)
);

const requestHandlers: AxiosInstances = {
  notLoggedInInstance,
  loggedInInstance,
  loggedInUploadInstance,
};

export default requestHandlers;
