import React from 'react';
import { Icon } from '@iconify/react';
import * as MuiIcons from '@mui/icons-material';

interface IconProps { 
    icon: string; 
    width?: string; 
    height?: string; 
    color?: string; 
    fontWeight?:any;
    fontSize?:string;
    onClick?: () => void;
    cursor?:string ;
}

const CustomIcon: React.FC<IconProps> = ({ icon, width, height, color,fontWeight,fontSize, cursor,onClick }) => {
    const isMaterialIcon = icon.startsWith('mui:');
    const muiIconName = icon.replace('mui:', '');

    if (isMaterialIcon) {
        const MuiIconComponent = MuiIcons[muiIconName as keyof typeof MuiIcons];
        if (MuiIconComponent) {
            return (
                <span onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <MuiIconComponent style={{ width, height, color ,fontWeight,fontSize,cursor}} />
                </span>
            );
        } else {
            console.error(`MUI Icon "${muiIconName}" not found.`);
            return null;
        }
    }
    return (
        <span onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Icon icon={icon} width={width} height={height} color={color} fontWeight={fontWeight} fontSize={fontSize} cursor={cursor}/>
        </span>
    );
};

export default CustomIcon;
