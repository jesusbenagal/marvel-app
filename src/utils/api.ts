import axios, { type AxiosInstance } from "axios";

export const createAxios = (baseURL: string): AxiosInstance => {
  const newInstance = axios.create({ baseURL });

  return newInstance;
};
