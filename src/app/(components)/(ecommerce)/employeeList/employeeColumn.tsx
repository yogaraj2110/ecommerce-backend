"use client"
import { Grid, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function EmplyeeColumn(props: any) {

  const router = useRouter();

  const handleroute = (route: any) => {
      router.push(route);
  };
  const handleDelete = props.handleEmployeeDelete
  const emplyeeColumn: GridColDef[] = [
    {
      field: 'userName',
      headerName: 'Name',
      flex: 1,
      renderCell: (params: any) => {
        return (
            <Grid style={{ cursor: 'pointer', color: '#1976d2', fontWeight: 600 }}  onClick={() => handleroute(`/employeeList/addEmployee?employessId=${params.row._id}&type=edit`)}>
              {params.value}
            </Grid>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'designation',
      headerName: 'Designation',
      flex: 1
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1
    },
    {
      field: 'bloodGroup',
      headerName: 'Blood Group',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: any) => {
          return (
              <Grid container spacing={1} alignItems="center">
                  <Grid item className=".mdi--delete">
                      <IconButton onClick={() => handleDelete && handleDelete(params.row._id)} style={{ color: '#FF0000', fontWeight: 600 }}>
                          <DeleteOutlineOutlinedIcon style={{ color: '#FF0000' }} />
                      </IconButton>
                  </Grid>
                  <Grid item style={{ cursor: 'pointer', color: '#007C84', fontWeight: 600 }}>
                      {params.value}
                  </Grid>
              </Grid>
          );
      },
  },

  ];
  return { emplyeeColumn }
}

