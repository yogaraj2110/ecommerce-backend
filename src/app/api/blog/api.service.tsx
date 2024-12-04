import { AxiosResponse } from 'axios';
import axiosInstance from './axios.instance.service';

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

export class ApiService {

  public async get(url: string) {
      const response: AxiosResponse<any[]>  = await axiosInstance.get(apiUrl+url);
      return response.data;
  }
  public async post(url: string, data: any) {
      const response: AxiosResponse<any[]>  = await axiosInstance.post(apiUrl+url, data);
      return response.data;
  }

  public async put(url: string, data: any) {
      const response: AxiosResponse<any[]>  = await axiosInstance.put(apiUrl+url, data);
      return response.data;
  }

  public async delete(url: string) {
      const response : AxiosResponse<any[]> = await axiosInstance.delete(apiUrl+url);
      return response.data;
  }
}
