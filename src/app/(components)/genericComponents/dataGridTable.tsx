import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, DataGridProps, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

interface CustomDataGridProps<T extends GridValidRowModel> extends DataGridProps {
    columns: GridColDef<T>[];
    rows: T[];
}

function CustomDataGrid<T extends GridValidRowModel>({ columns, rows, ...props }: CustomDataGridProps<T>) {
    return (
        <Box sx={{ height: 'auto', width: '99%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                {...props}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
             pageSizeOptions={[5, 10, 20, 50, 100]}
                disableRowSelectionOnClick />
        </Box>
    );
}

export default CustomDataGrid;
