import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';

type CustomTextFieldProps = TextFieldProps & {
    id: string;
    label: any;
    height?: any;
    width?: string;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({ id, height, width, label, variant = 'outlined', ...props }) => {
    return (
        <Grid style={{ height }}>
            <TextField fullWidth id={id} label={label} variant={variant} sx={{ width: width }} {...props} />
        </Grid>
    );
};

export default CustomTextField;
