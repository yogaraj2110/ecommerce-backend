import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

type CustomTypographyProps = TypographyProps & {
    height?: any;
    width?: string;
    color?: string;
    fontSize?: string;
};

const CustomTypography: React.FC<CustomTypographyProps> = ({ height, width, color,fontSize, variant = 'body1', ...props }) => {
    return (
        <Grid style={{ height }}>
            <Typography  variant={variant} fontSize={fontSize} width={width}  color={color}  {...props}>
            </Typography>
        </Grid>
    );
};

export default CustomTypography;
