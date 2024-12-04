"use client"
import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DepartmentColumn from './departmentColumn';
import { departmnetList } from './department.service';
import styles from './department.module.css'
import { departmentGetById } from './department.service';
import { useParams, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { deleteDepartment } from './department.service';
import AddDepartment from './departmentAdd/page';
import { useRouter } from 'next/navigation'
import Grid from '@mui/material/Grid2';
import CustomButton from '../../genericComponents/buttonColor';

const Department = (props: any) => {
    const router = useRouter()
    const [departmentList, setDepartmentList] = useState<any[]>([]);
    const [error, setError] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getDepartmentData()
    }, [])

    const getDepartmentData = () => {
        departmnetList().then((res: any) => {
            // setDepartmentList(response.getAllDepartmentData)
            if (res.statusCode == 200) {
                setDepartmentList(res.getAllDepartmentData)
            }
            else if (res.statusCode == 404 || res.statusCode == 500) {
                setDepartmentList([]);
                setError(res.message);
            }
            else if (res.statusCode == 400 || res.statusCode == 401) {
                setDepartmentList([]);
                setError(res.message);
            }
        })
    }

    const handleDepartmentDelete = async (departmentID: any) => {

        Swal.fire({
            title: 'Delete', text: 'Are you sure you want to delete this!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6', confirmButtonText: 'Yes, delete it!'
        }).then(async res => {
            if (res.isConfirmed) {
                deleteDepartment(departmentID).then((res: any) => {
                    if (res) {
                        Swal.fire({ title: 'Deleted Successfully', text: res.message, icon: 'success', confirmButtonText: 'Ok' }).then((res: any) => {
                            getDepartmentData()
                        })
                    }
                    else if (res.statusCode === 500 || res.statusCode === 400) {
                        Swal.fire({
                            title: 'Error', text: res.message, icon: 'error', confirmButtonText: 'Ok'
                        });
                    } else {
                        Swal.fire({
                            title: 'Error', text: res.message, icon: 'error', confirmButtonText: 'Ok'
                        });
                    }
                })
            }
        })
    }
    let departmentColumnData = {
        "handleDepartmentDelete": handleDepartmentDelete
    }
    const departmentColumn = DepartmentColumn(departmentColumnData)

    return (
        <>
            <Grid mb={3} textAlign={"end"}>
                <CustomButton height="40px" width="11%" className='buttonColor-1' color='white' fontWeight='900' backgroundColor='#1976d2 !important' type="submit" onClick={() => { setIsLoading(true); router.push('/department/departmentAdd') }}>
                    Add Department
                </CustomButton>
            </Grid>

            <Grid container mt={5}>
                <Typography mb={2} className={styles.textAlign}>Deparment List</Typography>
                <Box sx={{ height: 400, width: '95%' }} >
                    <Grid>
                        <DataGrid rows={departmentList} columns={departmentColumn.columnsItem} getRowId={(row: any) => row._id} />
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};

export default Department;

