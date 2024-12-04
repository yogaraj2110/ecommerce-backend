'use client'
import { Grid, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRouter } from 'next/navigation';
import AntSwitch from '../toggleButton';

export default function DepartmentColumn(props: any) {
    const router = useRouter();

    const handleroute = (route: any) => {
        router.push(route);
    };
    const handleDelete = props.handleDepartmentDelete
    const columnsItem: GridColDef[] = [
        {
            field: 'departmentName',
            headerName: 'Department',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params: any) => {
                return (
                    <Grid container spacing={1} alignItems="center">
                        <Grid item className=" .mdi--edit-circle-outline ">
                            <IconButton onClick={() => handleroute(`/department/departmentAdd?departmentId=${params.row._id}&type=edit`)} style={{ color: '#007C84', fontWeight: 600 }}>
                                <BorderColorTwoToneIcon style={{ color: '#007C84' }} />
                            </IconButton>
                        </Grid>
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
    return { columnsItem }
}

