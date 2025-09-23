import React, { useState } from 'react'
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
    Badge,
    IconButton
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
    Work as WorkIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Assignment as AssignmentIcon
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
        label: 'Skiftsøknader', 
        icon: <AssignmentIcon />, 
        href: '/skiftsoknader',
        description: 'Håndter søknader om ledige skift'
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
    const [isCollapsed, setIsCollapsed] = useState(false)

    const isActive = (href: string) => {
        return router.pathname === href
    }

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    const sidebarWidth = isCollapsed ? 80 : 280

    return (
        <Box
            sx={{
                width: sidebarWidth,
                flexShrink: 0,
                transition: 'width 0.3s ease',
                position: 'relative',
                zIndex: 1200
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: 'auto',
                backgroundColor: '#764ba2 !important',
                borderRadius: '0 0 16px 0',
                marginBottom: 2,
                boxShadow: 'none !important',
                outline: 'none !important',
                border: 'none !important',
                '&::before': {
                    display: 'none !important'
                },
                '&::after': {
                    display: 'none !important'
                },
                '& *': {
                    boxShadow: 'none !important'
                }
            }}>
                                 {/* Logo Section */}
                 <Box sx={{ 
                     p: isCollapsed ? 2 : 3, 
                     borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                     background: 'transparent',
                     position: 'relative'
                 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                 <Avatar 
                             sx={{ 
                                 bgcolor: 'primary.main',
                                 width: isCollapsed ? 40 : 48,
                                 height: isCollapsed ? 40 : 48,
                                 backgroundColor: '#764ba2',
                                 transition: 'all 0.3s ease'
                             }}
                         >
                            <WorkIcon />
                        </Avatar>
                        {!isCollapsed && (
                            <Box>
                                <Typography 
                                    variant="h5" 
                                    component="div" 
                                    sx={{ 
                                        fontWeight: 'bold',
                                        color: '#ffffff',
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
                        )}
                    </Box>
                    
                    {/* Toggle Button - Repositioned to avoid collision */}
                    <IconButton
                        onClick={toggleSidebar}
                        sx={{
                            position: 'absolute',
                            top: isCollapsed ? 10 : 12,
                            right: isCollapsed ? 10 : 12,
                            color: 'rgba(255, 255, 255, 0.8)',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            width: isCollapsed ? 32 : 36,
                            height: isCollapsed ? 32 : 36,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: '#ffffff'
                            },
                            transition: 'all 0.3s ease',
                            zIndex: 10
                        }}
                    >
                        {isCollapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon />}
                    </IconButton>
                </Box>

                {/* Navigation Menu */}
                <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
                    <List sx={{ px: isCollapsed ? 1 : 2 }}>
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
                                    <Tooltip 
                                        title={isCollapsed ? item.label : ''} 
                                        placement="right"
                                        disableHoverListener={!isCollapsed}
                                    >
                                        <ListItemButton
                                            selected={isActive(item.href)}
                                            sx={{
                                                borderRadius: 2,
                                                py: 1.5,
                                                px: isCollapsed ? 1.5 : 2,
                                                transition: 'all 0.3s ease',
                                                background: isActive(item.href) 
                                                    ? 'rgba(255, 255, 255, 0.25)'
                                                    : 'transparent',
                                                border: isActive(item.href) 
                                                    ? '2px solid rgba(255, 255, 255, 0.4)'
                                                    : '1px solid transparent',
                                                '&:hover': {
                                                    background: isActive(item.href)
                                                        ? 'rgba(255, 255, 255, 0.35)'
                                                        : 'rgba(255, 255, 255, 0.08)',
                                                    transform: isCollapsed ? 'scale(1.05)' : 'translateX(4px)',
                                                },
                                                '&.Mui-selected': {
                                                    background: 'rgba(255, 255, 255, 0.25)',
                                                    '&:hover': {
                                                        background: 'rgba(255, 255, 255, 0.35)',
                                                    }
                                                }
                                            }}
                                        >
                                            <ListItemIcon 
                                                sx={{ 
                                                    minWidth: isCollapsed ? 32 : 40,
                                                    color: isActive(item.href) 
                                                        ? '#ffffff' 
                                                        : 'rgba(255, 255, 255, 0.8)'
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            {!isCollapsed && (
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
                                            )}
                                            {isActive(item.href) && !isCollapsed && (
                                                <Box
                                                    sx={{
                                                        width: 4,
                                                        height: 20,
                                                        bgcolor: '#ffffff',
                                                        borderRadius: 2,
                                                        ml: 1
                                                    }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </Tooltip>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                                     {/* Footer Section */}
                     {!isCollapsed && (
                         <Box sx={{ 
                             p: 3, 
                             borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                             background: 'transparent'
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
                )}
            </Box>
        </Box>
    )
}
