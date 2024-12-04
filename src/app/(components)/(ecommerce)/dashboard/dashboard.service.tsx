import axios from "axios";
const backendUrl = process.env.NEXT_PUBLIC_BASE_JSON_URL


export const barChartListData = async () => {
    let result;
    await axios.get(`${backendUrl}/barChartItems`).then((res: any) => {
      result = res;
    }).catch(error => {
      result = error;
    })
    return result;
  };


export const pieChartListData = async () => {
    let result;
    await axios.get(`${backendUrl}/barChartItems`).then((res: any) => {
      result = res;
    }).catch(error => {
      result = error;
    })
    return result;
  };
  
  
  