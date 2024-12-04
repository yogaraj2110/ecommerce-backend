import React from 'react';
import Grid from '@mui/material/Grid2';

type CustomImageProps = {
    src: string;
    alt: string;
    height?: string;
    width?: string;
    borderRadius?: string;
    className?:any
};

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, height, width, borderRadius, className, ...props }) => {
    return (
        <Grid style={{ height, width }}>
            <img src={src} alt={alt}  className={className} style={{ height, width, borderRadius, ...props }} />
        </Grid>
    );
};

export default CustomImage;
