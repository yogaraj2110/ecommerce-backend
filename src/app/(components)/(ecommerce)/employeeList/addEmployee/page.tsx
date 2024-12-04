
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Alert, Box, Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import style from './addemployee.module.css';
import Grid from '@mui/material/Grid2';
import { employeeCreateUpdate, employeeGetById, roleMetaData } from '../employess.service';
import React from 'react';
import Loading from '../../../loading';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from '@iconify/react';
import CustomField from '../../../genericComponents/textField';
import CustomSelectField from '../../../genericComponents/selectField';
import { encryptData } from '@/app/utlis/helperText';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const nextEnvRouter = process.env.NEXT_PUBLIC_BASE_URL

const AddEmployee = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const empID = searchParams.get("employessId");
  
  const type = searchParams.get("type");
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any[]>([])
  const [employeeDetails, setEmployeeDetails] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = React.useState<any>();
  const [openAlert, setOpenAlert] = useState(false);
  const [responseMsg, setResponseMsg] = React.useState<any>();
  const [roleData, setRoleData] = useState<any[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const ALERT_DURATION_SUCCESS = 4000;
  const ALERT_DURATION = 4000;
  const alertClose = () => {
    setAlert('')
  }

  type ValidationSchema = z.infer<typeof validationSchema>;

  const validationSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    password: editMode
      ? z.string().optional()
      : z.string().min(1, { message: "password is required" }),
    userName: z.string().min(1, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    address: z.string(),
    designation: z.string().min(1, { message: "Designation is required" }),
    mobileNumber: z.union([z.string(), z.number()]),
    bloodGroup: z.string(),
    role: z.string().min(1, { message: "Role is required" }),
  });

  const { handleSubmit, formState: { errors }, control, setValue, trigger, getValues, reset } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (type === 'edit') {
      setEditMode(true)
    }
    fetchData()
    roleDataList()
  }, [editMode]);

  const roleDataList = () => {
    roleMetaData().then((res: any) => {
      if (res.statusCode == 200) {
        setRoleData(res.getAllRoleData)
      } else if (res.statusCode == 404 || res.statusCode == 500) {
        setRoleData([]);
        setError(res.message);
      } else if (res.statusCode == 400 || res.statusCode == 401 || res.statusCode == 403) {
        setRoleData([]);
        setError(res.message);
      }
    })
  }

  const fetchData = () => {
    if (editMode === true) {
      try {
        employeeGetById(empID).then((response: any) => {
          let getdata = response.employee;
          setValue("firstName", getdata.firstName ? getdata.firstName : '');
          setValue("lastName", getdata.lastName ? getdata.lastName : '');
          setValue("userName", getdata.userName ? getdata.userName : '');
          setValue("email", getdata.email ? getdata.email : '');
          setValue("address", getdata.address ? getdata.address : '');
          setValue("designation", getdata.designation ? getdata.designation : '');
          setValue("mobileNumber", getdata.mobileNumber ? getdata.mobileNumber : '');
          setValue("bloodGroup", getdata.bloodGroup ? getdata.bloodGroup : '');
          setValue("role", getdata.role ? getdata.role : '');
        })
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
    setIsLoading(true);

    const encryptedLogin = {
      address: data.address,
      bloodGroup: data.bloodGroup,
      designation: data.designation,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      role: data.role,
      userName: data.userName,
      password: encryptData(data.password),
    };

    employeeCreateUpdate(encryptedLogin, editMode, empID).then((response: any) => {
      if (response.statusCode == 200 || response.statusCode == 201) {
        setResponseMsg(response.message);
        setAlert('true');
        setOpenAlert(true)
        setTimeout(() => {
          alertClose()
        }, ALERT_DURATION_SUCCESS);
        router.push('/employeeList')
      } else if (response.statusCode == 404 || response.statusCode == 500 || response.statusCode == 400) {
        setIsLoading(false);
        setEmployeeDetails([]);
        setError(response.message);
        setResponseMsg(response.message);
        setAlert('false');
        setOpenAlert(true)
        setTimeout(() => {
          alertClose()
        }, ALERT_DURATION);
      } else {
        setIsLoading(false);
        setEmployeeDetails([]);
        setError(response.message);
        setResponseMsg(response.message);
        setAlert('false');
        setOpenAlert(true)
        setTimeout(() => {
          alertClose()
        }, ALERT_DURATION);
      }
    });
  }

  const handleroute = (route: any) => {
    router.push(route);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Suspense fallback={<Loading />}>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid >
            <Typography className='text-center' sx={{ fontWeight: 800 }} >{editMode ? "Update Employee" : "Add Employee"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 9 }} mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Icon className='commonBackIcon' icon="ion:arrow-back-circle-sharp" style={{ fontSize: 26, cursor: "pointer", color: "#5E14A5" }} onClick={() => handleroute(`/employeeList`)} />
          </Grid>
          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth size="small" className="commonInputField commonLableName">
                <Controller name="firstName" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ name: values }).catch((error) => error.message), }} render={({ field }) => (<CustomField fullWidth size="small" id="firstname" label={<span> First Name <span style={{ color: "red" }}>*</span> </span>} variant="outlined" {...field} error={!!errors.firstName} helperText={errors.firstName ? errors.firstName.message : ''} />)} />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth size="small" className="commonInputField commonLableName">
                <Controller name="lastName" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ name: values }).catch((error) => error.message), }} render={({ field }) => (<CustomField fullWidth size="small" id="lastName" label={<span>Last Name <span style={{ color: "red" }}>*</span> </span>} variant="outlined" {...field} error={!!errors.lastName} helperText={errors.lastName ? errors.lastName.message : ''} />)} />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              {!editMode && (
                <FormControl fullWidth size="small" className="commonInputField commonLableName">
                  <Controller name="password" control={control} defaultValue={''}
                    rules={{
                      validate: (values) => validationSchema.parseAsync({ name: values }).catch((error) => error.message),
                    }}
                    render={({ field }) => (
                      <CustomField fullWidth size="small" id="password" type={showPassword ? 'text' : 'password'} label={<span>Password<span style={{ color: 'red' }}>*</span></span>} variant="outlined" {...field} error={!!errors.password} helperText={errors.password ? errors.password.message : ''}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {showPassword ? (
                                <VisibilityOff onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                              ) : (
                                <Visibility onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </FormControl>
              )}
            </Grid>
          </Grid>

          <Grid container mt={3} spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth size="small" className="commonInputField commonLableName">
                <Controller name="userName" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ name: values }).catch((error) => error.message), }} render={({ field }) => (<CustomField fullWidth size="small" id="userName" label={<span>User Name <span style={{ color: "red" }}>*</span> </span>} variant="outlined" {...field} error={!!errors.userName} helperText={errors.userName ? errors.userName.message : ''} />)} />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth size="small" className="commonInputField commonLableName">
                <Controller name="email" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ email: values }).catch((error) => error.message), }} render={({ field }) => (<CustomField fullWidth size="small" id="email" label={<span>Email <span style={{ color: "red" }}>*</span> </span>} variant="outlined" {...field} error={!!errors.email} helperText={errors.email ? errors.email.message : ''} />)} />

              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth size="small" className="commonInputField commonLableName">
                <Controller name="address" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ address: values }).catch((error) => error.message), }} render={({ field }) => (<CustomField fullWidth size="small" id="firstname" label={<span>Address</span>} variant="outlined" {...field} error={!!errors.address} helperText={errors.address ? errors.address.message : ''} />)} />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth size="small" className="commonInputField commonLableName">
                <Controller name="designation" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ designation: values }).catch((error) => error.message), }} render={({ field }) => (<CustomField fullWidth size="small" id="designation" label={<span>Designation <span style={{ color: "red" }}>*</span> </span>} variant="outlined" {...field} error={!!errors.designation} helperText={errors.designation ? errors.designation.message : ''} />)} />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth size="small" className="commonInputField commonLableName">
                <Controller name="mobileNumber" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ mobileNumber: values }).catch((error) => error.message), }} render={({ field }) => (
                  <CustomField fullWidth size="small" id="mobileNumber" label={<span>Mobile Number</span>} variant="outlined" {...field} error={!!errors.mobileNumber} helperText={errors.mobileNumber ? errors.mobileNumber.message : ''} />
                )} />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth size="small" className="commonInputField commonLableName">
                <Controller name="bloodGroup" control={control} defaultValue={''} rules={{ validate: (values) => validationSchema.parseAsync({ bloodGroup: values }).catch((error) => error.message), }} render={({ field }) => (
                  <CustomField fullWidth size="small" id="bloodGroup" label={<span>Blood Group</span>} variant="outlined" {...field} error={!!errors.bloodGroup} helperText={errors.bloodGroup ? errors.bloodGroup.message : ''} />
                )} />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }} mt={3}>
              <FormControl fullWidth size="small" error={!!errors.role} className="commonInputField commonLableName">
                <Controller name="role" control={control} defaultValue="" rules={{ validate: (value) => validationSchema.parseAsync({ role: value }).catch((error) => error.message) }} render={({ field }) => (
                  <CustomSelectField label="System Role" value={field.value} onChange={field.onChange} options={roleData} fullWidth size="small" >
                    {roleData.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.roleType}
                      </MenuItem>
                    ))}
                  </CustomSelectField>
                )} />
                {!!errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
          <Grid className='form-group' mt={5} textAlign={"center"}>
            <Button variant="contained" color="primary" className={style.butnAlign} type="submit">{editMode ? "Update Employee" : "Add Employee"}</Button>
          </Grid>

          <Grid container my={4} justifyContent={'end'}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }} >
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
      </Box>
      {isLoading && <Loading />}
    </React.Suspense>
  )
}
export default AddEmployee;
