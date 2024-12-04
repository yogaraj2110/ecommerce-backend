"use client"
import React, { useEffect, useState } from 'react';
import { Alert, Button, FormControl, Snackbar, TextField, Typography } from '@mui/material';
import styles from './department.module.css'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { departmentGetById, departmnetList, departmentCreateUpdate } from '../department.service';
import Loading from '../../../loading';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from '@iconify/react';
import { z } from 'zod';
import Grid from '@mui/material/Grid2';

const AddDepartment = (props: any) => {
    const params = useParams();
    const departmentData = props.getDepartmentData
    const router = useRouter()
    const searchParams = useSearchParams();
    const departmentIds = searchParams.get("departmentId");
    const type = searchParams.get("type");
    const [editMode, setEditMode] = useState(false);
    const [department, setDeparment] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = React.useState<any>();
    const [openAlert, setOpenAlert] = useState(false);
    const [responseMsg, setResponseMsg] = React.useState<any>();
    const ALERT_DURATION_SUCCESS = 4000;
    const ALERT_DURATION = 4000;
    const alertClose = () => {
        setAlert('')
    }

    type ValidationSchema = z.infer<typeof validationSchema>;
    const validationSchema = z.object({
        departmentName: z.string().min(1, { message: "Department Name  is required" }),
    });
    const [error, setError] = useState<any[]>([])
    const { handleSubmit, formState: { errors }, control, setValue, trigger, getValues, reset } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        if (type === 'edit') {
            setEditMode(true)
        }
        fetchData()
    }, [editMode])

    const fetchData = () => {
        if (editMode === true) {
            try {
                departmentGetById(departmentIds).then((response: any) => {
                    let getdata = response.departmentData;
                    setValue("departmentName", getdata.departmentName ? getdata.departmentName : '');
                })
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
        setIsLoading(true);
        departmentCreateUpdate(data, editMode, departmentIds).then((response: any) => {
            if (response.statusCode == 200 || response.statusCode == 201) {
                setResponseMsg(response.message);
                setAlert('true');
                setOpenAlert(true)
                setIsLoading(false);
                setTimeout(() => {
                    alertClose()
                }, ALERT_DURATION_SUCCESS);
                router.push('/department');
            } else if (response.statusCode == 404 || response.statusCode == 500 || response.statusCode == 400) {
                setResponseMsg(response.message);
                setAlert('false');
                setOpenAlert(true)
                setIsLoading(false);
                setError(response.message); ``
                setDeparment([]);
                setTimeout(() => {
                    alertClose()
                }, ALERT_DURATION);
            } else {
                setResponseMsg(response.message);
                setAlert('false');
                setOpenAlert(true)
                setError(response.message);
                setDeparment([]);
                setIsLoading(false);
                setTimeout(() => {
                    alertClose()
                }, ALERT_DURATION);
                setIsLoading(false);
            }
        });
    }
    const handleroute = (route: any) => {
        router.push(route);
    };

    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container mt={3}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <Typography className={styles.textAlign}> {editMode ? "Update Deparment" : "Add Deparment"}   </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Icon className='commonBackIcon' icon="ion:arrow-back-circle-sharp" style={{ fontSize: 26, cursor: "pointer", color: "#5E14A5" }} onClick={() => handleroute(`/department`)} />
                        </Grid>
                    </Grid>

                    <Grid container mt={2} spacing={4}>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                            <FormControl fullWidth size="small" className="commonInputField commonLableName">
                                <Controller name="departmentName" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ name: values }).catch((error) => error.message), }} render={({ field }) => (<TextField fullWidth size="small" id="firstname" label={<span>Department Name <span style={{ color: "red" }}>*</span> </span>} variant="outlined" {...field} error={!!errors.departmentName} helperText={errors.departmentName ? errors.departmentName.message : ''} />)} />
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }} mt={1}>  <Button variant="contained" color="primary" className={styles.butnAlign} type="submit" >{editMode ? "Update Deparment" : "Add Deparment"} </Button> </Grid>
                    </Grid>
                    <Grid container my={4} justifyContent={'end'}>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                            {(alert == 'true') && (
                                <>
                                    <Snackbar open={openAlert} autoHideDuration={6000} onClose={alertClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                        <Alert onClose={alertClose} severity="success" sx={{ width: '100%' }}>
                                            {responseMsg}
                                        </Alert>
                                    </Snackbar>
                                </>
                            )}
                            {(alert === 'false') && (
                                <>
                                    <Snackbar open={openAlert} autoHideDuration={6000} onClose={alertClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                        <Alert onClose={alertClose} severity="error" sx={{ width: '100%' }}>
                                            {responseMsg}
                                        </Alert>
                                    </Snackbar>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </form>
                {isLoading && <Loading />}
            </React.Suspense>
        </>
    );
};

export default AddDepartment;

