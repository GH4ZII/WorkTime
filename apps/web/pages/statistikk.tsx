import React, { useState, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Paper,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  EmojiEvents as TrophyIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as LineChartIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

// Tids-hjelpere
const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
const addMonths = (date: Date, n: number) => new Date(date.getFullYear(), date.getMonth() + n, 1);

const StatisticsPage: NextPage = () => {
  const { employees, shifts, timeOffRequests } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState<'current' | 'previous'>('current');
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Datarammer for valgt måned og forrige måned
  const now = new Date();
  const rangeCurrent = useMemo(() => {
    const base = selectedPeriod === 'current' ? now : addMonths(now, -1);
    return { from: startOfMonth(base), to: endOfMonth(base) };
  }, [selectedPeriod]);

  const rangePrevious = useMemo(() => {
    const base = selectedPeriod === 'current' ? addMonths(now, -1) : addMonths(now, -2);
    return { from: startOfMonth(base), to: endOfMonth(base) };
  }, [selectedPeriod]);

  const hoursForShifts = (items: any[]) => items.reduce((sum, s) => {
    const start = new Date(s.startTime).getTime();
    const end = new Date(s.endTime).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return sum;
    return sum + (end - start) / (1000 * 60 * 60);
  }, 0);

  const filterByRange = (items: any[], from: Date, to: Date, getter: (x: any) => string) => {
    const fromMs = from.getTime();
    const toMs = to.getTime();
    return items.filter(x => {
      const t = new Date(getter(x)).getTime();
      return !isNaN(t) && t >= fromMs && t <= toMs;
    });
  };

  const statsCurrent = useMemo(() => {
    const monthShifts = filterByRange(shifts, rangeCurrent.from, rangeCurrent.to, s => s.startTime);
    const totalHours = Math.round(hoursForShifts(monthShifts));
    const daysInMonth = endOfMonth(rangeCurrent.from).getDate();
    const averageHoursPerDay = +(totalHours / daysInMonth).toFixed(1);
    const baseline = 160;
    const overtimeHours = Math.max(totalHours - baseline, 0);
    const sickDays = filterByRange(timeOffRequests, rangeCurrent.from, rangeCurrent.to, r => r.fromDate).filter(r => r.type === 'SICK').length;
    const vacationDays = filterByRange(timeOffRequests, rangeCurrent.from, rangeCurrent.to, r => r.fromDate).filter(r => r.type === 'VACATION').length;

    const hoursByUser: Record<string, number> = {};
    monthShifts.forEach((s: any) => {
      const userId = s.user?.id || s.userId;
      if (!userId) return;
      const h = hoursForShifts([s]);
      hoursByUser[userId] = (hoursByUser[userId] || 0) + h;
    });
    const topPerformers = Object.entries(hoursByUser)
      .map(([userId, hours]) => ({
        name: employees.find(e => e.id === userId)?.name || userId,
        hours: Math.round(hours as number),
        productivity: 100
      }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 3);

    return {
      totalHours,
      averageHoursPerDay,
      overtimeHours,
      lateArrivals: 0,
      earlyDepartures: 0,
      sickDays,
      vacationDays,
      productivityScore: 0,
      completionRate: 0,
      topPerformers,
      departmentStats: [] as any[],
    };
  }, [shifts, timeOffRequests, employees, rangeCurrent.from, rangeCurrent.to]);

  const statsPrevious = useMemo(() => {
    const monthShifts = filterByRange(shifts, rangePrevious.from, rangePrevious.to, s => s.startTime);
    const totalHours = Math.round(hoursForShifts(monthShifts));
    const daysInMonth = endOfMonth(rangePrevious.from).getDate();
    const averageHoursPerDay = +(totalHours / daysInMonth).toFixed(1);
    const baseline = 160;
    const overtimeHours = Math.max(totalHours - baseline, 0);
    const sickDays = filterByRange(timeOffRequests, rangePrevious.from, rangePrevious.to, r => r.fromDate).filter(r => r.type === 'SICK').length;
    const vacationDays = filterByRange(timeOffRequests, rangePrevious.from, rangePrevious.to, r => r.fromDate).filter(r => r.type === 'VACATION').length;
    return {
      totalHours,
      averageHoursPerDay,
      overtimeHours,
      lateArrivals: 0,
      earlyDepartures: 0,
      sickDays,
      vacationDays,
      productivityScore: 0,
      completionRate: 0,
    };
  }, [shifts, timeOffRequests, rangePrevious.from, rangePrevious.to]);

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const StatCard = ({ title, value, subtitle, icon, color, change, onClick }: any) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          border: '1px solid rgba(102, 126, 234, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 12px 35px rgba(102, 126, 234, 0.2)',
            borderColor: 'rgba(102, 126, 234, 0.3)',
          }
        }}
        onClick={onClick}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            <Avatar sx={{ bgcolor: color, width: 40, height: 40 }}>
              {icon}
            </Avatar>
          </Box>
          <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: color, mb: 1 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
          {change !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`${change > 0 ? '+' : ''}${change.toFixed(1)}%`}
                size="small"
                color={change >= 0 ? 'success' : 'error'}
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                fra forrige måned
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const PerformanceCard = ({ title, data, type }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          border: '1px solid rgba(102, 126, 234, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
            borderColor: 'rgba(102, 126, 234, 0.2)',
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
            {title}
          </Typography>
          {type === 'list' ? (
            <List sx={{ p: 0 }}>
              {data.map((item: any, index: number) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                      color: 'white',
                      width: 32,
                      height: 32
                    }}>
                      {index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.hours}h • Produktivitet: ${item.productivity}%`}
                  />
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    sx={{
                      bgcolor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" component="div" fontWeight="bold" sx={{ color: '#667eea' }}>
                {(data?.avgHours ?? 0)}h
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gjennomsnitt per dag
              </Typography>
              <Typography variant="h6" sx={{ color: '#5a6fd8', mt: 1 }}>
                Produktivitet: {data?.productivity ?? 0}%
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const currentData = selectedPeriod === 'current' ? statsCurrent : statsPrevious;
  const previousData = selectedPeriod === 'current' ? statsPrevious : statsCurrent;

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
          color: 'white',
          textAlign: 'center',
          py: 6,
          px: 3
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Statistikk & Analyse
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Oversikt over arbeidstid, produktivitet og ytelse
          </Typography>
        </motion.div>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Tidsperiode</InputLabel>
              <Select
                value={selectedPeriod}
                label="Tidsperiode"
                onChange={(e) => setSelectedPeriod(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              >
                <MenuItem value="current">Denne måneden</MenuItem>
                <MenuItem value="previous">Forrige måned</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#5a6fd8',
                  backgroundColor: 'rgba(102, 126, 234, 0.04)',
                },
                borderRadius: 2,
              }}
            >
              Filtrer
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isLoading}
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#5a6fd8',
                  backgroundColor: 'rgba(102, 126, 234, 0.04)',
                },
                borderRadius: 2,
              }}
            >
              Oppdater
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #4c5fd6 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                },
                borderRadius: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Eksporter
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 4, borderRadius: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: '#667eea',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#667eea',
              },
            }}
          >
            <Tab label="Oversikt" icon={<AssessmentIcon />} />
            <Tab label="Arbeidstid" icon={<AccessTimeIcon />} />
            <Tab label="Produktivitet" icon={<TrendingUpIcon />} />
            <Tab label="Fravær" icon={<PersonIcon />} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {selectedTab === 0 && (
          <Box>
            {/* Key Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total arbeidstid"
                  value={`${currentData.totalHours}h`}
                  subtitle="Denne måneden"
                  icon={<WorkIcon />}
                  color="#667eea"
                  change={calculateChange(currentData.totalHours, previousData.totalHours)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Gjennomsnitt per dag"
                  value={`${currentData.averageHoursPerDay}h`}
                  subtitle="Arbeidstid per dag"
                  icon={<ScheduleIcon />}
                  color="#5a6fd8"
                  change={calculateChange(currentData.averageHoursPerDay, previousData.averageHoursPerDay)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Overtid"
                  value={`${currentData.overtimeHours}h`}
                  subtitle="Ekstra timer"
                  icon={<AccessTimeIcon />}
                  color="#4c5fd6"
                  change={calculateChange(currentData.overtimeHours, previousData.overtimeHours)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Produktivitet"
                  value={`${currentData.productivityScore}%`}
                  subtitle="Gjennomsnittlig score"
                  icon={<TrendingUpIcon />}
                  color="#4caf50"
                  change={calculateChange(currentData.productivityScore, previousData.productivityScore)}
                />
              </Grid>
            </Grid>

            {/* Performance Overview */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <PerformanceCard
                  title="Topp-performere"
                  data={currentData.topPerformers}
                  type="list"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <PerformanceCard
                    title="IT-avdeling"
                    data={currentData.departmentStats[0]}
                    type="summary"
                  />
                  <PerformanceCard
                    title="HR-avdeling"
                    data={currentData.departmentStats[1]}
                    type="summary"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {selectedTab === 1 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
                        Arbeidstids-analyse
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Regulære timer</Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {currentData.totalHours - currentData.overtimeHours}h
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Overtid</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#ff9800' }}>
                            {currentData.overtimeHours}h
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Gjennomsnitt per dag</Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {currentData.averageHoursPerDay}h
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Komplett måned</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#4caf50' }}>
                            {Math.round((currentData.totalHours / 160) * 100)}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
                        Tidsstempling
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Forsent ankomst</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#ff9800' }}>
                            {currentData.lateArrivals} ganger
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Tidlig avgang</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#ff9800' }}>
                            {currentData.earlyDepartures} ganger
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Perfekt oppmøte</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#4caf50' }}>
                            {22 - currentData.lateArrivals - currentData.earlyDepartures} dager
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        )}

        {selectedTab === 2 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
                        Produktivitets-målere
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: '#667eea' }}>
                            {currentData.productivityScore}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Produktivitetsscore
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" component="div" fontWeight="bold" sx={{ color: '#4caf50' }}>
                            {currentData.completionRate}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Oppgavefullføring
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
                        Avdelings-ytelse
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {currentData.departmentStats.map((dept: any, index: number) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">{dept.name}</Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                              <Typography variant="body2" color="text.secondary">
                                {dept.avgHours}h
                              </Typography>
                              <Chip
                                label={`${dept.productivity}%`}
                                size="small"
                                sx={{
                                  bgcolor: dept.productivity >= 90 ? '#4caf50' : dept.productivity >= 80 ? '#ff9800' : '#f44336',
                                  color: 'white',
                                  fontWeight: 'bold',
                                }}
                              />
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        )}

        {selectedTab === 3 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
                        Fraværs-oversikt
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Sykefravær</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#f44336' }}>
                            {currentData.sickDays} dager
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Ferie</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#2196f3' }}>
                            {currentData.vacationDays} dager
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Totalt fravær</Typography>
                          <Typography variant="body1" fontWeight="bold">
                            {currentData.sickDays + currentData.vacationDays} dager
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Oppmøte-rate</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#4caf50' }}>
                            {Math.round(((22 - currentData.sickDays - currentData.vacationDays) / 22) * 100)}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
                        Tidsstempling-status
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Perfekt oppmøte</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#4caf50' }}>
                            {22 - currentData.lateArrivals - currentData.earlyDepartures} dager
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Forsent ankomst</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#ff9800' }}>
                            {currentData.lateArrivals} ganger
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Tidlig avgang</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#ff9800' }}>
                            {currentData.earlyDepartures} ganger
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">Punktlighet</Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ color: '#4caf50' }}>
                            {Math.round(((22 - currentData.lateArrivals - currentData.earlyDepartures) / 22) * 100)}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default StatisticsPage;
