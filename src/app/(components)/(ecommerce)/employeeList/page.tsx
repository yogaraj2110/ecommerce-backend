"use client";

import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { employeeList } from './employess.service';
import style from './emploeeList.module.css'
import { useRouter } from 'next/navigation'
import { deleteEmploee } from './employess.service';
import Swal from 'sweetalert2';
import React from 'react';
import EmplyeeColumn from './employeeColumn';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import CustomButton from '../../genericComponents/buttonColor';
import CustomIcon from '../../genericComponents/icons';
import CustomTypography from '../../genericComponents/typography';
import Grid from '@mui/material/Grid2';

interface Employee {
  _id: string;
  name: string;
  email: string;
  address: string;
  designation: string;
  mobileNumber: string;
  bloodGroup: string;
}

const EmployeeList = (props: any) => {

  const router = useRouter()
  const [employees, setEmployee] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllListData()
  }, [error])

  const getAllListData = () => {
    employeeList().then((res: any) => {
      if (res.statusCode == 200) {
        setEmployee(res.employeeDetails)
      }
      else if (res.statusCode == 404 || res.statusCode == 500) {
        setEmployee([]);
        setError(res.message);
      }
      else if (res.statusCode == 400 || res.statusCode == 401 || res.statusCode == 403) {
        setEmployee([]);
        setError(res.message);
      }
    })
  }


  const handleDelete = async (employeeID: any) => {

    Swal.fire({
      title: 'Delete', text: 'Are you sure you want to delete this!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6', confirmButtonText: 'Yes, delete it!'
    }).then(async res => {
      if (res.isConfirmed) {
        deleteEmploee(employeeID).then((res: any) => {
          if (res) {
            Swal.fire({ title: 'Deleted Successfully', text: res.message, icon: 'success', confirmButtonText: 'Ok' }).then((res: any) => {
              getAllListData()
            })
          }
          else if (res.statusCode === 500 || res.statusCode === 400 || res.statusCode === 401) {
            setError(res.message);
            Swal.fire({
              title: 'Error', text: res.message, icon: 'error', confirmButtonText: 'Ok'
            });
          } else {
            setError(res.message);
            Swal.fire({
              title: 'Error', text: res.message, icon: 'error', confirmButtonText: 'Ok'
            });
          }
        })
      }
    })
  }

  let deleteEmployeeData = {
    "handleEmployeeDelete": handleDelete
  }
  const employeesColumn = EmplyeeColumn(deleteEmployeeData)

  return (
    <>
      {/* <Grid mb={3} textAlign={"end"}>
        <Button onClick={() => { setIsLoading(true); router.push('/employeeList/addEmployee') }} className={style.butnAlign}>Add Employee</Button>
      </Grid> */}
     
      <Grid mb={3} textAlign={"end"}>
        <CustomButton height="40px" width="11%" className='buttonColor-1' color='white' fontWeight='900' backgroundColor='#1976d2 !important' type="submit" onClick={() => { setIsLoading(true); router.push('/employeeList/addEmployee') }}>
          <CustomIcon icon='clarity:employee-line' width="18" height="18" color='white' fontWeight='bold' /> &nbsp; Add Employee
        </CustomButton>
      </Grid>


      <Grid container mt={5}>
        {/* <CustomTypography fontSize='30px' >Add</CustomTypography> */}
        <Box sx={{ height: 400, width: '95%' }} >
          <Grid>{ }
            <DataGrid rows={employees} columns={employeesColumn.emplyeeColumn} getRowId={(row: any) => row._id} />
          </Grid>
        </Box>
       
        {/* <Box sx={{ height: 400, width: '95%' }} >
          <DataGrid
            rows={employees.length > 0 ? employees : [{ id: 'no-data', name: 'No data available' }]}
            columns={employeesColumn.emplyeeColumn.map((col) => ({
              ...col,
              renderCell: (params) => {
                if (employees.length === 0 && col.field === 'name') {
                  return (
                    <Typography variant="body2">
                   <span style={{textAlign:"center"}}> {error ? error : ''}</span> 
                    </Typography>
                  );
                }
                return params.value;
              },
            }))}
            getRowId={(row: any) => row._id || row.id}
          />
        </Box> */}
      
      </Grid>
    </>
  )
}
export default EmployeeList;
