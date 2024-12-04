import { ApiService } from "@/app/api/blog/api.service";

const apiService = new ApiService

export const employeeList = async () => {
  let result;
  await apiService.get(`/employee`).then((res: any) => {
    result = res;
  }).catch(error => {
    result = error;
  })
  return result;
};

export const employeeGetById = async (id: any) => {
  let result;
  await apiService.get(`/employee/${id}`).then((res: any) => {
    result = res;
  }).catch(error => {
    result = error;
  })
  return result;
};

export const employeeCreateUpdate = async (data: any, editMode: any, id: any) => {
  let url: any
  let result: any
  if (editMode == true) {
    url = `/employee/${id}`
  } else {
    url = `/employee`
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

export const deleteEmploee = async (id: any) => {
  let result;
  await apiService.delete(`/employee/${id}`).then((res: any) => {
    result = res;
  }).catch(error => {
    result = error;
    console.log("error", error);
  })
  return result;
};

export const roleMetaData = async () => {
  let result;
  await apiService.get(`/role`).then((res: any) => {
    result = res;
  }).catch(error => {
    result = error;
  })
  return result;
};

