"use client"
import React from 'react';
import { Grid, Typography } from '@mui/material';

const ContactPage = () => {
  return (
    <>
      <Grid container mt={5} >
        <Grid item xs={6} justifyContent={"center"}>
          <img src={`/Code typing-pana.png`} alt='None' style={{ height: "800px" }} />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography style={{ fontSize: 30, borderTop: '8px solid #5E14A5', fontFamily: "auto" }}>WHO WE ARE</Typography>
          <Typography style={{ fontSize: 50, fontWeight: 900, fontFamily: "auto" }}>CONTACT <span style={{ color: "#5E14A5", fontFamily: "auto" }}>US</span> </Typography>
          <br />

          <Grid>
            <Typography style={{fontSize:30,fontWeight:900,fontFamily:"auto"}}>Customer <span style={{color:"#5E14A5",fontFamily:"auto"}}>Support</span>  </Typography>

            <Typography style={{fontSize:16,justifyContent:"center",fontFamily:"auto"}}> Customer support is the team of people who provide help when customers have trouble with a company's products or services. It's ultimately about making sure customers are successful in solving whatever issues they came to your business to help solve.</Typography>
            <br />
            <Typography style={{fontSize:30,fontWeight:900,fontFamily:"auto"}}>Help <span style={{color:"#5E14A5",fontFamily:"auto"}}>Center</span> </Typography>

            <Typography style={{fontSize:16,justifyContent:"center",fontFamily:"auto"}}> A Help Center is a website where customers can find answers to their questions and solutions to their problems. Designed to resolve many common queries that a brand receives, a Help Center should make it simple for customers to find the answers they're looking for. </Typography>
          </Grid>

        </Grid>
      </Grid>
    </>
  );
};


export default ContactPage;


// import React from "react";
// import Link from "next/link";
// import { Box, Typography } from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// type TabData = {
//   label: string;
//   href: string;
// };

// const tabs: TabData[] = [
//   { label: "Tab 1", href: "/contact/dummy-1" },
//   { label: "Tab 2", href: "/contact/dummy-2" },
// ];

// const ArrowTab: React.FC = () => {
//   return (
//     <Box>
//       {tabs.map((tab, index) => (
//         <Link href={tab.href} passHref key={index}>
//           <Box
//             sx={{ width: 100, height: 40, position: "relative", display: "inline-block", marginRight: "16px", cursor: "pointer" }}>
//             <Box>
//               <Typography>{tab.label} &nbsp; <ArrowForwardIosIcon/></Typography>
//             </Box>
//             <Box />
//           </Box>
//         </Link>
//       ))}
//     </Box>
//   );
// };

// export default ArrowTab;
