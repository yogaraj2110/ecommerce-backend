import { ApiService } from "@/app/api/blog/api.service";
// import apiEndPoints
// import apiEndPoints from '../routesConfig'

const backendUrl = process.env.NEXT_PUBLIC_BASE_URL

const apiService = new ApiService

export const departmentCreateUpdate = async (data: any, editMode: any, id: any,) => {
  let url: any
  let result: any
  if (editMode == true) {
    url = `/department/${id}`
  } else {
    url = `/department`
  }
  if (editMode == true) {
    await apiService.put(url, data).then(response => {
      result = response;
    }).catch(error => {
      result = error;
    })
  } else {
    await apiService.post(url, data).then(response => {
      result = response;
    }).catch(error => {
      result = error;
    })
  }
  return result;
}

export const departmnetList = async () => {
  let result;
  await apiService.get(`/department`).then((res: any) => {
    result = res;
    
  }).catch(error =>{
    result = error;
  })

  return result;
};

export const departmentGetById = async (id:any) => {
    let result;
    await apiService.get(`/department/${id}`).then((res: any) => {
      result = res;
      console.log("departmentGetById",res);
      
    }).catch(error =>{
      result = error;
    })
    return result;
  };

export const deleteDepartment = async (id:any) => {
  let result;
  await apiService.delete(`/department/${id}`).then((res: any) => {
    result = res;
  }).catch(error =>{
    result = error;
  })
  return result;
};



