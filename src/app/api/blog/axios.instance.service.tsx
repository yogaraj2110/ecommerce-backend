import axios from 'axios';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

let authToken: any = Cookies.get("authToken") ? Cookies.get("authToken") : undefined

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
});

axiosInstance.interceptors.request.use(req => {
    let authToken: any = Cookies.get("authToken") ? Cookies.get("authToken") : undefined;

    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error: any) => {
    if (error.response.data.statusCode == 401 || error.response.status == 401 ) {
        try {
            const refreshedResponse = await refreshTokenAndRetry(error);
            return refreshedResponse;
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    } else {        
        let result: { 
            statusCode: any; 
            message: any; 
            statusList?: any; 
        } =
        {
            'statusCode': error.response.data.statusCode,
            'message': error.response.data.message
        }
        if (error.response.data.statusList) {
            result.statusList = error.response.data.statusList;
        }

        return Promise.reject(result);
    }
});

async function refreshTokenAndRetry(error: any) {
    try {
        const response = await refreshToken(error);
        return response;
    } catch (refreshError) {
        return Promise.reject(refreshError);
    }
}

async function refreshToken(error: any) {
    const response = await axios.post(`${baseUrl}/refreshToken`, { data: { "refreshToken": Cookies.get('authRefreshToken') } });
    if (response.data.statusCode === 200) {
        Cookies.set("authToken", response.data.data.accessToken);
        Cookies.set("authRefreshToken", response.data.data.refreshToken);
        error.response.config.headers['Authorization'] = `Bearer ${response.data.data.accessToken}`;
        return axiosInstance.request(error.config);
    } else {
        if (response.data.statusCode === 401) {
            Cookies.remove("authToken");
            Cookies.remove("refreshToken");
            Cookies.remove("accessToken");
            Swal.fire({
                 text: 'Session Expired', confirmButtonText: 'Ok',customClass :{
                    popup:'customSwal'
                    }
            }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                });;
            
        } else {
            throw new Error("Failed to refresh token");
        }
    }
}

export default axiosInstance