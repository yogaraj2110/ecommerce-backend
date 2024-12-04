import { Switch, styled } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

export const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => ` width: 100%; font-family: IBM Plex Sans, sans-serif; font-size: 0.875rem; font-weight: 400; line-height: 1.5; padding: 12px; border-radius: 6px; 
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]}; background: #FFF; 
  border: 1px solid #E5E7EA; box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  &:hover {
  border-color: ${blue[400]};
  }
  &:focus {
  border-color: ${blue[400]};
  box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  // firefox
  &:focus-visible {
  outline: 0;
  }
  `,
);
 const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
      backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
      backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? 'white' : '#007C84',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'white',
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    color: '#fff',
    backgroundColor:
      theme.palette.mode === 'dark' ? 'white' : '#808080',
    boxSizing: 'border-box',
  },
}));
export default  AntSwitch;