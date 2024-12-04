import React from 'react';
import Button, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface CustomButtonProps extends Omit<MuiButtonProps, 'color'> {
  fontSize?: string;
  height?: string;
  width?: string;
  color?:string;
  borderRadius?:string;
  fontWeight?:any;
  backgroundColor?:string;
  children?: React.ReactNode;
}

const StyledButton = styled(Button)(({}) => ({}));

const CustomButton: React.FC<CustomButtonProps> = ({fontSize,height,width,color,borderRadius,children,fontWeight,backgroundColor,...otherProps}) => {
  return (
    <StyledButton {...otherProps}  sx={{fontSize: fontSize,height: height,width: width,color:color,borderRadius:borderRadius,fontWeight:fontWeight,backgroundColor:backgroundColor}} >
      {children}
    </StyledButton>
  );
};

export default CustomButton;
