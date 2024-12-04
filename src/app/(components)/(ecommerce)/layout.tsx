"use client";
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Icon } from '@iconify/react';
import  { useLogout }  from '../(auth)/login/login.service';
import Swal from 'sweetalert2';
import IdleTimer from './IdleTimer/idleTimer';
import { employeeList } from './employeeList/employess.service';
import { useState } from 'react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({
    children,
}: {
    children: React.ReactNode

}
) {
    const theme = useTheme();
    const router = usePathname();
    const currentPath = router;
    const route = useRouter();
    const searchParams = useSearchParams();
    const empID = searchParams.get("employessId");
    console.log("id",empID);

    const type = searchParams.get("type");
    const [open, setOpen] = React.useState(false);
    const [openMenuItem, setOpenMenuItem] = React.useState(false);
    const [headerTitle, setHeaderTitle] = React.useState('');
    const [activeMenuItem, setActiveMenuItem] = React.useState(currentPath);

    
    React.useEffect(() => {
    }, [currentPath, openMenuItem]);

    const handleRoute = (params:any) => {
        route.push(params);
    };



    const handleItemClick = (value: any) => {
        setActiveMenuItem(value);
        handleRoute(value)
        if (value == '/dashboard') {
            setHeaderTitle("Dashboard");
        } else if (value == '/employeeList') {
            setHeaderTitle("Emplyee Management");
            setOpenMenuItem(false);
        } 
        else if (value == '/contact') {
            setHeaderTitle("Contact");
            setOpenMenuItem(false);
        }
        else if (value == '/about') {
            setHeaderTitle("About");
            setOpenMenuItem(false);
        }
        else if (value == '/department') {
            setHeaderTitle("Department");
            setOpenMenuItem(false);
        } 
    };



    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleListItemClick = () => {
        setOpenMenuItem(true)
    }


    const handleLogout = () => {
        useLogout(empID).then((res) => {            
          route.push('/login')
        }).catch((err) => {
          console.log('errr', err);
        });
      }
      const handleIdle = async () => {

        Swal.fire({
          title: 'Session Expiring Soon', text: 'Your session will expire soon. Click Cancel to continue your session.', timer: 120000, timerProgressBar: true, showConfirmButton: true, showLoaderOnConfirm: true, confirmButtonText: 'Cancel', allowOutsideClick: false, customClass: {
            popup: 'CancelModal'
          },
          didOpen: () => {
            const cancelButton: HTMLButtonElement | null = Swal.getCancelButton();
            const modalElement: HTMLElement | null = Swal.getPopup();
    
            if (cancelButton && modalElement) {
              cancelButton.addEventListener('mouseenter', () => {
                modalElement.style.borderBottom = '8px solid #DC7878';
              });
    
              cancelButton.addEventListener('mouseleave', () => {
                modalElement.style.borderBottom = '8px solid #007C84';
              });
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location.reload();
          } else {
            handleLogout()
          }
        });
    
        // Swal.fire({
        //   title: 'Session Expiring Soon',
        //   text: 'Your session will expire soon. Click Cancel to continue your session.',
        //   timer: 120000,
        //   timerProgressBar: true,
        //   showConfirmButton: true,
        //   showLoaderOnConfirm: true,
        //   confirmButtonText: 'Cancel',
        //   allowOutsideClick: false,
        //   customClass: {
        //     popup: 'custom-zindex'
        //   }
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     // window.location.reload();
        //   } else {
        //     handleLogout()
        //   }
        // });
    
      };
      const handleRoutes = () => {
        route.push("/login");
        handleLogout()
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <IdleTimer timeout={1800000} onIdle={handleIdle} />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}>
                        <MenuIcon />
                    </IconButton>


                    <Grid container>
                        <Grid item xs={11.8}>
                            <Typography variant="h6" noWrap component="div">
                                {headerTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={0.2}>
                        <LogoutIcon onClick={handleRoutes} sx={{cursor:"pointer"}} /> 
                     {/* <Grid container>
                                <Grid item xs={6}>
                                    <LogoutIcon />
                                </Grid>
                                <Grid item xs={6}>
                                    Logout
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Grid container >
                        <Grid item xs={11}>   <img src="/dummylogo.png" alt="No image" /></Grid>
                        <Grid item xs={1} mt={1}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </Grid>
                    </Grid>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleItemClick('/dashboard')} sx={{
                            backgroundColor: activeMenuItem === '/dashboard' ? '#1976d2' : 'transparent',
                            color: activeMenuItem === '/dashboard' ? theme.palette.common.white : 'inherit',
                            '&:hover': {
                                backgroundColor: activeMenuItem === '/dashboard' ? theme.palette.primary.main : `rgba(0, 0, 0, 0.1)`,
                            }
                        }}>
                            <ListItemIcon>
                                <DashboardCustomizeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleItemClick('/employeeList')}
                            sx={{
                                backgroundColor: activeMenuItem === '/employeeList' ? '#1976d2' : 'transparent',
                                color: activeMenuItem === '/employeeList' ? theme.palette.common.white : 'inherit',
                                '&:hover': {
                                    backgroundColor: activeMenuItem === '/employeeList' ? theme.palette.primary.main : `rgba(0, 0, 0, 0.1)`,
                                }
                            }}>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Employee" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleItemClick('/department')}
                            sx={{
                                backgroundColor: activeMenuItem === '/department' ? '#1976d2' : 'transparent',
                                color: activeMenuItem === '/department' ? theme.palette.common.white : 'inherit',
                                '&:hover': {
                                    backgroundColor: activeMenuItem === '/department' ? theme.palette.primary.main : `rgba(0, 0, 0, 0.1)`,
                                }
                            }}>
                            <ListItemIcon>
                            <Icon icon="fluent-emoji-high-contrast:department-store"  />
                            </ListItemIcon>
                            <ListItemText primary="Department" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleItemClick('/contact')}
                            sx={{
                                backgroundColor: activeMenuItem === '/contact' ? '#1976d2' : 'transparent',
                                color: activeMenuItem === '/contact' ? theme.palette.common.white : 'inherit',
                                '&:hover': {
                                    backgroundColor: activeMenuItem === '/contact' ? theme.palette.primary.main : `rgba(0, 0, 0, 0.1)`,
                                }
                            }}>
                            <ListItemIcon>
                                <CallOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contact" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleItemClick('/about')}
                            sx={{
                                backgroundColor: activeMenuItem === '/about' ? '#1976d2' : 'transparent',
                                color: activeMenuItem === '/about' ? theme.palette.common.white : 'inherit',
                                '&:hover': {
                                    backgroundColor: activeMenuItem === '/about' ? theme.palette.primary.main : `rgba(0, 0, 0, 0.1)`,
                                }
                            }}>
                            <ListItemIcon>
                                <InfoOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
