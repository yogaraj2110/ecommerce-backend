// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { TextField, Button, Container, Grid, Typography, makeStyles } from '@material-ui/core';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// import style from '../emploeeList.module.css';
// import { updateEmployee } from '../employess.service';
// import { employeeGetById } from '../employess.service';
// import Loading from '../../loading';
// import { departmnetList } from '../../department/department.service';

// const nextEnvRouter = process.env.NEXT_PUBLIC_BASE_URL

// const UpdateEmployee = () => {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const empID = searchParams.get("employessId");
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false);
//   const [departmentList, setDepartmentList] = useState<any[]>([]);
//   console.log("departmentList", departmentList);
//   const [employeeDetail, setEmployeeDetail] = useState({
//     name: '',
//     email: '',
//     address: '',
//     designation: '',
//     mobileNumber: '',
//     bloodGroup: '',
//   });
//   console.log("employeeDetail",);

//   useEffect(() => {
//     fetchData()
//     getDepartmentData()
//   }, []);

//   const fetchData = () => {
//     try {
//       employeeGetById(empID).then((response: any) => {
//         setEmployeeDetail(response.employee);
//       })
//     } catch (error) {
//       console.log("error", error);
//     }

//   };

//   const handleInput = (e: any) => {
//     const { name, value } = e.target;
//     setEmployeeDetail((employee) => ({ ...employee, [name]: value }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setIsLoading(true)
//     try {
//       updateEmployee(empID, employeeDetail).then((response: any) => {
//         if (response) {
//           router.push('/employeeList')
//         }
//       })
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
//   const getDepartmentData = () => {
//     departmnetList().then((response: any) => {
//       setDepartmentList(response.getAllDepartmentData)
//     })
//   }
//   return (
//     <React.Suspense fallback={<Loading />}>
//       <Box>
//         <div>
//           <Typography variant="h4" align="center" gutterBottom>Update Employee</Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2} mt={1.5}>
//               <Grid item xs={4} >
//                 <TextField id="name" name="name" label="Name" variant="outlined" fullWidth margin="normal" value={employeeDetail.name} onChange={handleInput}
//                 />
//               </Grid>
//               <Grid item xs={4} >
//                 <TextField id="email" name="email" label="Email" variant="outlined" fullWidth margin="normal" value={employeeDetail.email} onChange={handleInput}
//                 />
//               </Grid>
//               <Grid item xs={4} >
//                 <TextField id="address" name="address" label="Address" variant="outlined" fullWidth margin="normal" value={employeeDetail.address} onChange={handleInput} />
//               </Grid>
//             </Grid>

//             <Grid container spacing={2} mt={1.5}>

//               <Grid item xs={4} >
//                 {/* <TextField id="designation" name="designation" label="Designation" variant="outlined" fullWidth margin="normal" value={employeeDetail.designation} onChange={handleInput}
//               /> */}
//                 <InputLabel id="ddesignation">{<span>Designation</span>}</InputLabel>
//                 <Select fullWidth labelId="designation" id="designation" label="Designation" value={employeeDetail.designation} onChange={handleInput}>
//                   {departmentList.map((option, index) => (
//                     <MenuItem key={index} value={option._id}>
//                       {option.departmentName}
//                     </MenuItem>
//                   ))}
//                   {departmentList.length == 0 &&
//                     <MenuItem disabled>No Options</MenuItem>
//                   }
//                 </Select>
//               </Grid>
//               <Grid item xs={4} >
//                 <TextField id="mobileNumber" name="mobileNumber" label="Mobile Number" variant="outlined" fullWidth margin="normal" value={employeeDetail.mobileNumber} onChange={handleInput}
//                 />
//               </Grid>
//               <Grid item xs={4} >
//                 <TextField id="bloodGroup" name="bloodGroup" label="Blood Group" variant="outlined" fullWidth margin="normal" value={employeeDetail.bloodGroup} onChange={handleInput}
//                 />
//               </Grid>
//               <Grid mt={1.5} ml={2.5}>
//                 <Button variant="contained" color="primary" fullWidth type="submit" className={style.butnAlign}>
//                   Update Employee
//                 </Button>
//               </Grid>

//             </Grid>
//           </form>
//         </div>
//       </Box>
//       {isLoading && <Loading />}
//     </React.Suspense>
//   );
// };

// export default UpdateEmployee;
