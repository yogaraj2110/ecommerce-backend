"use client"
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import style from './about.module.css';
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}  {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AboutPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container mt={5}>
        <Grid item xs={6} justifyContent={"center"}  mt={5}>
          <Image src="/About-Us.png" alt="Description of image" width={700} height={700} />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography style={{ fontSize: 30, borderTop: '8px solid #5E14A5', fontFamily: "auto" }}>WHO WE ARE</Typography>
          <Typography style={{ fontSize: 50, fontWeight: 900, fontFamily: "auto" }}>ABOUT <span style={{ color: "#5E14A5", fontFamily: "auto" }}>US</span> </Typography>
          <Typography style={{ fontSize: 16, justifyContent: "center", fontFamily: "auto" }} mt={5} >
            Employee management is the effort to help employees do their best work each day in order to achieve the larger goals of the organization. There are many tasks and duties that fall under employee management, but almost all of them can fit into one of five categories: Selection. Monitoring.
          </Typography>
          <br />
          <Typography style={{ fontSize: 16, justifyContent: "center", fontFamily: "auto" }} mt={1}>
            They fulfill assigned tasks, meet management expectations, and contribute to goals and objectives. Employees' primary responsibilities include: Executing routine tasks. Collaborating with different team members.
          </Typography>
          <br />

          <Grid sx={{ textAlign: "center" }} mt={5}>
            {/* <Button>Know More </Button> */}
            <Button className={style.butnAlign}>Know More</Button>
          </Grid>

        </Grid>
      </Grid>
{/* 
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { display: 'none' } }}>
          <Tab label="Group" icon={<ArrowForwardIosIcon fontSize="small" />} iconPosition="end"  {...a11yProps(0)} />
          <Tab label="User" icon={<ArrowForwardIosIcon fontSize="small" />} iconPosition="end"  {...a11yProps(1)} />
          <Tab label="Policy" icon={<ArrowForwardIosIcon fontSize="small" />} iconPosition="end"   {...a11yProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          Tab -1
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Tab -2
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Tab -3
        </CustomTabPanel>
      </Box> */}
    </>
  );
};

export default AboutPage;

// "use client"
// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div  role="tabpanel"  hidden={value !== index}  id={`simple-tabpanel-${index}`}  aria-labelledby={`simple-tab-${index}`}  {...other}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { display: 'none'} }}>
//         <Tab label="Group" icon={<ArrowForwardIosIcon fontSize="small" />} iconPosition="end"  {...a11yProps(0)} />
//         <Tab label="User" icon={<ArrowForwardIosIcon fontSize="small" />} iconPosition="end"  {...a11yProps(1)} />
//         <Tab label="Policy" icon={<ArrowForwardIosIcon fontSize="small" />} iconPosition="end"   {...a11yProps(2)} />
//       </Tabs>
//       <CustomTabPanel value={value} index={0}>
//         Tab -1
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         Tab -2
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         Tab -3
//       </CustomTabPanel>
//     </Box>
//   );
// }


// "use client"
// import { Breadcrumbs, Button, Grid, Typography } from '@mui/material';
// import React from 'react';
// import style from './about.module.css';
// import Image from 'next/image';
// import Link from 'next/link';

// const AboutPage = () => {
//   return (
//     <>
//       <Breadcrumbs aria-label="breadcrumb">
//         <Link href="/employeeList" passHref>
//           MUI
//         </Link>
//         <Link href="/dashboard" passHref>
//           Core
//         </Link>
//         <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
//       </Breadcrumbs>
//     </>
//   );
// };

// export default AboutPage;