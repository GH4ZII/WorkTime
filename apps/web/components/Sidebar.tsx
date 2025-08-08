import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Avatar,
    Tooltip,
    Badge
} from '@mui/material'
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Schedule as ScheduleIcon,
    SwapHoriz as SwapIcon,
    Event as EventIcon,
    Chat as ChatIcon,
    History as HistoryIcon,
    Analytics as AnalyticsIcon,
    Work as WorkIcon
} from '@mui/icons-material'

const menuItems = [
    { 
        label: 'Dashboard', 
        icon: <DashboardIcon />, 
        href: '/',
        description: 'Oversikt over systemet'
    },
    { 
        label: 'Medarbeidere', 
        icon: <PeopleIcon />, 
        href: '/medarbeidere',
        description: 'Administrer ansatte'
    },
    { 
        label: 'Skift', 
        icon: <ScheduleIcon />, 
        href: '/skift',
        description: 'Planlegg og administrer skift'
    },
    { 
        label: 'Bytteforespørsel', 
        icon: <SwapIcon />, 
        href: '/bytteforesporsel',
        description: 'Håndter skiftbytte-forespørsler'
    },
    { 
        label: 'Fraværsforespørsel', 
        icon: <EventIcon />, 
        href: '/fravaersforesporsel',
        description: 'Administrer fraværsforespørsler'
    },
    { 
        label: 'Meldinger', 
        icon: <ChatIcon />, 
        href: '/meldinger',
        description: 'Chat og kommunikasjon'
    },
    { 
        label: 'Historikk', 
        icon: <HistoryIcon />, 
        href: '/historikk',
        description: 'Se tidligere aktiviteter'
    },
    { 
        label: 'Statistikk', 
        icon: <AnalyticsIcon />, 
        href: '/statistikk',
        description: 'Analyser og rapporter'
    },
]

export const Sidebar: React.FC = () => {
    const router = useRouter()

    const isActive = (href: string) => {
        return router.pathname === href
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 280,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 280,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative', // Add this to fix positioning
                },
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)'
            }}>
                {/* Logo Section */}
                <Box sx={{ 
                    p: 3, 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                            sx={{ 
                                bgcolor: 'primary.main',
                                width: 48,
                                height: 48,
                                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                            }}
                        >
                            <WorkIcon />
                        </Avatar>
                        <Box>
                            <Typography 
                                variant="h5" 
                                component="div" 
                                sx={{ 
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                WorkTime
                            </Typography>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '0.75rem'
                                }}
                            >
                                Administrasjonssystem
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Navigation Menu */}
                <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
                    <List sx={{ px: 2 }}>
                        {menuItems.map((item, index) => (
                            <ListItem 
                                key={item.label} 
                                disablePadding 
                                sx={{ mb: 1 }}
                            >
                                <Link 
                                    href={item.href} 
                                    style={{ 
                                        textDecoration: 'none', 
                                        color: 'inherit',
                                        width: '100%'
                                    }}
                                >
                                    <ListItemButton
                                        selected={isActive(item.href)}
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.5,
                                            px: 2,
                                            transition: 'all 0.3s ease',
                                            background: isActive(item.href) 
                                                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%)'
                                                : 'transparent',
                                            border: isActive(item.href) 
                                                ? '1px solid rgba(59, 130, 246, 0.3)'
                                                : '1px solid transparent',
                                            '&:hover': {
                                                background: isActive(item.href)
                                                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.3) 100%)'
                                                    : 'rgba(255, 255, 255, 0.05)',
                                                transform: 'translateX(4px)',
                                            },
                                            '&.Mui-selected': {
                                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.3) 100%)',
                                                }
                                            }
                                        }}
                                    >
                                        <ListItemIcon 
                                            sx={{ 
                                                minWidth: 40,
                                                color: isActive(item.href) 
                                                    ? '#3b82f6' 
                                                    : 'rgba(255, 255, 255, 0.8)'
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontSize: '0.95rem',
                                                fontWeight: isActive(item.href) ? 'bold' : 'normal',
                                                color: isActive(item.href) 
                                                    ? '#ffffff' 
                                                    : 'rgba(255, 255, 255, 0.9)'
                                            }}
                                            secondary={item.description}
                                            secondaryTypographyProps={{
                                                fontSize: '0.75rem',
                                                color: 'rgba(255, 255, 255, 0.6)',
                                                display: { xs: 'none', md: 'block' }
                                            }}
                                        />
                                        {isActive(item.href) && (
                                            <Box
                                                sx={{
                                                    width: 4,
                                                    height: 20,
                                                    bgcolor: '#3b82f6',
                                                    borderRadius: 2,
                                                    ml: 1
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Footer Section */}
                <Box sx={{ 
                    p: 3, 
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.1)'
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: '0.7rem'
                            }}
                        >
                            WorkTime v1.0
                        </Typography>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                display: 'block',
                                color: 'rgba(255, 255, 255, 0.4)',
                                fontSize: '0.65rem',
                                mt: 0.5
                            }}
                        >
                            Administrasjonssystem
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}
