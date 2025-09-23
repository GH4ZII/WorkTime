import React from 'react'
import { Sidebar } from './Sidebar'
import { Box } from '@mui/material'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Sidebar />
        <Box 
            component="main" 
            sx={{ 
                flexGrow: 1,
                ml: 0, // Remove margin since Drawer handles positioning
                backgroundColor: '#f5f5f5',
                overflow: 'auto'
            }}
        >
            {children}
        </Box>
    </Box>
)
