"use client";
import React, { useState } from 'react';
import styles from './login.module.css';
import { Alert, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import { loginUser } from './login.service';
import { registerUser } from './login.service';
import Loading from '../../loading';
import { encryptData } from '@/app/utlis/helperText';
import Cookies from "js-cookie";
import Grid from '@mui/material/Grid2';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const router = useRouter()
    const [alert, setAlert] = React.useState<string>();
    const [showPassword, setShowPassword] = useState(false);
    const [responseMsg, setResponseMsg] = React.useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [employeeLogin, setEmployeeLogin] = useState({
        userName: '',
        password: '',
    })

    const ALERT_DURATION = 4000;
    const ALERT_DURATION_SUCCESS = 4000;
    const alertClose = () => {
        setAlert('')
    }
    const [mode, setMode] = useState('login');

    const handleToggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const encryptedLogin = {
            userName: employeeLogin.userName,
            password: encryptData(employeeLogin.password),
        };
        if (mode == 'login') {
            setIsLoading(true)
            try {
                loginUser(encryptedLogin).then((response: any) => {
                    if (response.statusCode == 200) {
                        setResponseMsg(response.message)
                        Cookies.set("authToken", response.accessToken);
                        Cookies.set("authRefreshToken", response.refreshToken);
                        setAlert("true")
                        setIsLoading(false)
                        setTimeout(() => {
                            alertClose()
                            router.push('/dashboard')
                        }, ALERT_DURATION_SUCCESS)
                    } else if (response.statusCode == 404 || response.statusCode == 400 || response.statusCode == 500) {
                        setResponseMsg(response.message)
                        setAlert("false")
                        setIsLoading(false)
                        setTimeout(() => {
                            alertClose()
                        }, ALERT_DURATION)
                    } else {
                        setResponseMsg(response.message)
                        setAlert("false")
                        setIsLoading(false)
                        setTimeout(() => {
                            alertClose()
                        }, ALERT_DURATION)
                    }
                })

            } catch (error) {
                console.log("error", error);
            }
        } else {
            setIsLoading(true)
            try {
                registerUser(employeeLogin).then((response: any) => {
                    if (response.statusCode === 200) {
                        setResponseMsg(response.message);
                        setAlert("true");
                        setIsLoading(false)
                        setEmployeeLogin({
                            userName: '',
                            password: '',
                        })
                        setTimeout(() => {
                            alertClose();
                        }, ALERT_DURATION_SUCCESS);
                    } else if (response.statusCode === 404) {
                        setResponseMsg(response.message);
                        setAlert("false");
                        setIsLoading(false)
                        setTimeout(() => {
                            alertClose();

                        }, ALERT_DURATION);
                    } else {
                        setResponseMsg(response.message);
                        setAlert("false");
                        setIsLoading(false)
                        setTimeout(() => {
                            alertClose();
                        }, ALERT_DURATION);
                    }
                });
            } catch (error) {
                console.log("error", error);
            }
        }
    }

    const handleInput = (key: string, value: string) => {
        setEmployeeLogin(prevEmployeeDetails => ({
            ...prevEmployeeDetails,
            [key]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <Grid container className={styles.backgroundContainer} justifyContent="start" alignItems="center" pl={25}>
                    <Grid className={styles.loginBox}>
                        <Grid container justifyContent={'center'} mb={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 9 }}>
                                {(alert == 'true') ? <Alert style={{ marginTop: '7px' }} onClose={alertClose}>{responseMsg}</Alert> : (alert == 'false') ? <Alert onClose={alertClose} style={{ marginTop: '7px' }} severity='error'>{responseMsg}</Alert> : ''}
                            </Grid>
                        </Grid>
                        <Typography style={{ textAlign: "center", fontSize: 40, marginBottom: 4, fontWeight: 700, fontFamily: "auto" }}>{mode === 'login' ? 'Login' : 'Register'}</Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} mt={4}>
                                    <TextField fullWidth type="text" label="Name" id="userName" value={employeeLogin.userName} onChange={(e) => handleInput('userName', e.target.value)} required />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} mt={4}>
                                    <TextField fullWidth type={showPassword ? 'text' : 'password'} label="Password" id="password" value={employeeLogin.password} onChange={(e) => handleInput('password', e.target.value)} required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {showPassword ? (
                                                        <VisibilityOff onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                                                    ) : (
                                                        <Visibility onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                                                    )}
                                                </InputAdornment>
                                            )}}/>
                                </Grid>
                            </Grid>
                            <Grid container mt={4} mb={1} justifyContent={"flex-end"} >
                                <Typography sx={{ color: "#5E14A5 ", textDecoration: "underline", cursor: "pointer" }} onClick={handleToggleMode}>{mode === 'login' ? 'register' : 'login'}</Typography>
                            </Grid>
                            <Grid container mt={2} mb={3} >
                                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} justifyItems={"center"} >
                                    <Button type="submit" className={styles.submitButton}  >{mode === 'login' ? 'Login' : ''}</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                {isLoading && <Loading />}
            </React.Suspense>
        </>
    );
};

export default Login;
