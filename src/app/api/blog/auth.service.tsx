import axios, { AxiosInstance, AxiosResponse } from "axios";
// import { ApiService } from "@/app/services/api.service";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL
// const apiService = new ApiService

export class AuthService {

  static forgotPassword(arg0: string, encrpytedPassword: { email: string; confirmPassword?: unknown; newPassword?: unknown; }) {
    throw new Error("Method not implemented.");
  }

  protected readonly instance: AxiosInstance;
  public constructor() {
    this.instance = axios.create({
      baseURL: baseURL,
      withCredentials : true,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (data:any) => {
    return this.instance.post(`/login`,data).then((res) => {
      return {
        message: res.data.message,
        statusCode: res.data.statusCode
      };
    });
  };


  
  public async get(url: string) {
    const response: AxiosResponse<any[]> = await this.instance.get(url);
    return response.data;
  }

  public async post(url:string, data:any){
    const response: AxiosResponse<any[]> = await this.instance.post(url,data);
    return response.data;
  }  
}
