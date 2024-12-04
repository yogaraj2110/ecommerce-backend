"use client"
import { Box, Card, CardContent, FormControl, Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
// import PieChart from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { motion } from 'framer-motion'
import { BarChart } from '@mui/x-charts/BarChart';
import styles from './dashboard.module.css'
import { barChartListData } from './dashboard.service';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import Image from 'next/image';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];

const DashboardPage = () => {


  // const data = [
  //   { id: 0, value: 10, label: 'Mobile', color: '#FF6384' },
  //   { id: 1, value: 15, label: 'T-Shirt', color: '#36A2EB' },
  //   { id: 2, value: 20, label: 'Shirt', color: '#FFCE56' },
  //   { id: 3, value: 30, label: 'Mobile Backcase', color: '#4BC0C0' },
  //   { id: 4, value: 40, label: 'Cricket Bat', color: '#9966FF' },
  //   { id: 5, value: 50, label: 'Paly Station', color: '#FF9F40' },
  //   { id: 6, value: 60, label: 'Laptop', color: '#007C84' },
  //   { id: 7, value: 75, label: 'Water Bottle', color: '#B4E197' },
  //   { id: 8, value: 80, label: 'Slipper', color: '#8BC34A' },
  // ];

  // const theme = useTheme();
  // const [activeStep, setActiveStep] = React.useState(0);
  // const maxSteps = images.length;

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStepChange = (step: number) => {
  //   setActiveStep(step);
  // };

  // const chartSetting = {
  //   yAxis: [
  //     { label: 'Items sold' },
  //   ],
  //   width: 600,
  //   height: 350,
  // };

  // const dataset = [
  //   { month: 'Jan', ItemsCount: 216, width: 2 },
  //   { month: 'Feb', ItemsCount: 80, },
  //   { month: 'Mar', ItemsCount: 415, },
  //   { month: 'Apr', ItemsCount: 160, },
  //   { month: 'May', ItemsCount: 430, },
  //   { month: 'June', ItemsCount: 144, },
  //   { month: 'July', ItemsCount: 70, },
  //   { month: 'Aug', ItemsCount: 249, },
  //   { month: 'Sept', ItemsCount: 131, },
  //   { month: 'Oct', ItemsCount: 55, },
  //   { month: 'Nov', ItemsCount: 483, },
  //   { month: 'Dec', ItemsCount: 235, },
  // ];

  // const valueFormatter = (value: number | null) => `${value}`;

  // const dataKeys = Object.keys(dataset[0]).filter(key => key !== 'month');
  // const series = dataKeys.map(key => ({
  //   dataKey: key,
  //   color: '#007C84',
  //   label: key.charAt(0).toUpperCase() + key.slice(1),
  //   valueFormatter,
  // }));

  // const pData = [240, 198, 980, 398, 480, 380, 430, 400, 300, 200, 280, 180, 230, 340];
  // const xLabels = [' Jan', ' Feb', ' Mar', ' Apr', ' May', ' Jun', ' Jul', ' Aug', ' Sep', ' Oct', ' Nov', ' Dec'];

  // const barChartData = xLabels.map((label, index) => ({
  //   name: label,
  //   // pv: index
  // }));


  // const [pieChartDatas, setPieChartData] = useState<any>([]);

  // const pieData = pieChartDatas.map((label: any) => ({
  //   id: label.id,
  //   itemName: label.itemName,
  //   itemCount: label.itemCount
  // }));

  // const getPieData = async () => {
  //   barChartListData().then((res: any) => {
  //     setPieChartData(res.data)
  //   })
  // }














  // // const [dashboard, setdashboard] = useState<any>([]);

  // // const barChatData = dashboard.map((label: any) => ({
  // //   name: label.itemName,
  // //   itemsTotal: label.itemCount,
  // //   year: label.year,
  // // }));

  // // console.log("barChatData",barChatData);

  // // const getItemMenu = async () => {
  // //   barChartListData().then((res: any) => {
  // //     setdashboard(res.data)
  // //   })
  // // }
  // // useEffect(() => {
  // //   getItemMenu();
  // //   getPieData()
  // // }, [])

  // const [dashboard, setDashboard] = useState<any[]>([]);
  // const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // const getItemMenu = async () => {
  //   barChartListData().then((res: any) => {
  //     setDashboard(res.data)
  //   })
  // }
  // useEffect(() => {
  //   getItemMenu();
  //   getPieData();
  // }, []);

  // const handleYearChange = (date: any) => {
  //   setSelectedYear(date?.year() || null);
  // };

  // const filteredData = selectedYear ? dashboard.filter((item: any) => item.year === selectedYear) : dashboard;

  // const barChatData = filteredData.map((label: any) => ({
  //   name: label.itemName,
  //   itemsTotal: label.itemCount,
  //   year: label.year,
  // }));



  return (
    <>
      {/* <Grid container spacing={3}>
        <Grid item xs={8}>
          <PieChart
            series={[
              {
                data,
                highlightScope: { faded: "series", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={250}
          />
        </Grid>
      </Grid> */}

      {/* <Grid container spacing={3}>
        <Grid item xs={8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}>
            <PieChart
              series={[
                { data, highlightScope: { faded: "series", highlighted: "item" }, faded: { innerRadius: 30, additionalRadius: -30, color: '#A0AEC0' } },
              ]}
              height={300} />
          </motion.div>
        </Grid>
      </Grid> */}

      {/* <Grid container spacing={3} mt={3}>
        <Grid item xs={4.3} className={styles.dashboardAlign} >
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}>
            <Grid>
              <BarChart dataset={dataset} xAxis={[{ scaleType: 'band', dataKey: 'month', }]} series={series} layout="vertical" {...chartSetting} borderRadius={10} />
              
            </Grid>
          </motion.div>
        </Grid>
      </Grid> */}

      {/* <Box sx={{ maxWidth: 400, flexGrow: 1, marginTop: 5 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>{images[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box> 
       <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              Dummy
            </Grid>
            <Grid item xs={4}>sdfy</Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardContent>
          hgfds
        </CardContent>
      </Card> 
 */}


      {/* <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'TimePicker', 'DateTimePicker', 'DateRangePicker']}>
            <DemoItem >
              <DatePicker maxDate={dayjs()} onChange={handleYearChange} sx={{ padding: 8 }} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Grid> */}


      {/* <Grid container spacing={3} >
        <Grid item xs={2}>
          <FormControl className="datepicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}  >
              <DemoContainer components={['DatePicker', 'TimePicker', 'DateTimePicker', 'DateRangePicker']} sx={{ marginLeft: 50, padding: 0.5 }} >
                <DemoItem>
                  <DatePicker maxDate={dayjs()} onChange={handleYearChange} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <BarChart width={550} height={350} borderRadius={5} series={[{
            data: barChatData.map((data: any) => data.itemsTotal),
            label: 'Total Item Counts',
            color: '#007C84'
          }]}
            xAxis={[{ data: barChatData.map((data: any) => data.name), scaleType: 'band' }]}
          />
          <PieChart series={[{ data: pieData }]} width={500} height={300} />
        </Grid>
      </Grid> */}
      <h1> Dashboard</h1>
    </>
  );
};


export default DashboardPage;
