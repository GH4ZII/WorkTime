import React from 'react'
import { Sidebar } from './Sidebar'
import { Box } from '@mui/material'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box 
            component="main" 
            sx={{ 
                flexGrow: 1,
                ml: 0, // Remove margin since Drawer handles positioning
                backgroundColor: '#f8f9ff',
                minHeight: '100vh',
                overflow: 'auto'
            }}
        >
            {children}
        </Box>
    </Box>
)
