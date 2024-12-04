import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CustomSelectFieldProps<T extends string | number> {
    label: string;
    value: T;
    onChange: () => void;
    options: Array<{ value: T; label: string }>;
    fullWidth:any,
    size:any,
    children:React.ReactNode
}

function CustomSelectField<T extends string | number>({
    label,
    value,
    onChange,
    fullWidth,
    size,
    children
}: CustomSelectFieldProps<T>) {
    
   
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id={`${label}-label`}>{label}</InputLabel>
                <Select labelId={`${label}-label`} id={`${label}-select`} value={value} fullWidth={fullWidth} size={size} label={label} onChange={onChange}>
                    {children}
                </Select>
            </FormControl>
        </Box>
    );
}

export default CustomSelectField;
