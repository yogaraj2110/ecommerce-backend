import { setAuthToken } from "@/app/utlis/helperText";
import { ApiService } from "../../../api/blog/api.service";
import { AuthService } from "../../../api/blog/auth.service";
import Cookies from "js-cookie";

const authService = new AuthService
const apiService = new ApiService

export const loginUser = async (data: any) => {
  let result;
  await apiService.post(`/login`, data).then((res: any) => {
    if (res) {
      Cookies.set("authToken", res.accessToken);
      Cookies.set("authRefreshToken", res.refreshToken);
    }
    setAuthToken()
    result = res;
  }).catch(error => {
    result = error;
  })
  return result;
};


// export const loginUser = async (data:any) => {
//   const login = async (data: any) => {
//     try {
//       const user = await authService.login(data);
//       if (user) {
//         Cookies.set("authToken", data.accessToken);
//         Cookies.set("authRefreshToken", data.refreshToken);
//       }
//       setAuthToken()
//       return user;
//     }
//     catch (error: any) {
//       let result = {
//         'message': error.response.data.message,
//         'statusCode': error.response.data.statusCode
//       }
//       return result
//     }
//   };
//   return { login };
// };



// export const useLogout = () => {
//   let result;
//     await apiService.get(`/logout/${id}`).then((response: any) => {
//       console.log("response",response);
      
//       if (response.statusCode == 200) {
//         const allCookies = Cookies.get();
//         Object.keys(allCookies).forEach(cookieName => {
//           Cookies.remove(cookieName);
//         });
//         window.location.reload();
//       }
//     }).catch(error => {
//       console.error(error);
//     });

//   return  result ;
// };  

export const useLogout = async (id:any) => {
  let result;
  
  console.log("out");

  await apiService.get(`/logout/${id}`).then((response: any) => {
    if (response.statusCode == 200) {
      console.log("in");
      
              const allCookies = Cookies.get();
              Object.keys(allCookies).forEach(cookieName => {
                Cookies.remove(cookieName);
              });
              window.location.reload();
            }
  }).catch(error => {
    result = error;
  })
  return result;
};

export const registerUser = async (data: any) => {
  let result;
  await apiService.post(`/register`, data).then((res: any) => {
    result = res;
  }).catch(error => {
    result = error;
  })
  return result;
};
