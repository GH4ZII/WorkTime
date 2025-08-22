import React from 'react'
import { Sidebar } from './Sidebar'
import { Box } from '@mui/material'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#e8edf5' }}>
        <Sidebar />
        <Box 
            component="main" 
            sx={{ 
                flexGrow: 1,
                ml: 0, // Remove margin since Drawer handles positioning
                backgroundColor: '#e8edf5',
                overflow: 'auto'
            }}
        >
            {children}
        </Box>
    </Box>
)
