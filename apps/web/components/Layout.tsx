import React from 'react'
import { Sidebar } from './Sidebar'
import { Box } from '@mui/material'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Sidebar />
        <Box 
            component="main" 
            sx={{ 
                flexGrow: 1,
                ml: 0, // Remove margin since Drawer handles positioning
                backgroundColor: '#ffffff',
                overflow: 'auto'
            }}
        >
            {children}
        </Box>
    </Box>
)
