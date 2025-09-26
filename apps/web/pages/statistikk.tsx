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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Paper,
  Divider,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  AccessTime as AccessTimeIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

// Tids-hjelpere
const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
const addMonths = (date: Date, n: number) => new Date(date.getFullYear(), date.getMonth() + n, 1);
const startOfYear = (date: Date) => new Date(date.getFullYear(), 0, 1);
const endOfYear = (date: Date) => new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0-6, where 0 is Sunday
  const diff = (day === 0 ? -6 : 1) - day; // make Monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
};
const endOfWeek = (date: Date) => {
  const s = startOfWeek(date);
  const e = new Date(s);
  e.setDate(s.getDate() + 6);
  e.setHours(23,59,59,999);
  return e;
};

const StatisticsPage: NextPage = () => {
  const { employees, shifts, timeOffRequests } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState<'current' | 'previous'>('current');
  const [timeScale, setTimeScale] = useState<'week' | 'month' | 'year'>('month');
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Datarammer for valgt periode (uke/måned/år)
  const now = new Date();
  const rangeCurrent = useMemo(() => {
    const base = selectedPeriod === 'current' ? now : (timeScale === 'month' ? addMonths(now, -1) : timeScale === 'year' ? new Date(now.getFullYear()-1, now.getMonth(), now.getDate()) : new Date(now.getFullYear(), now.getMonth(), now.getDate()-7));
    if (timeScale === 'year') return { from: startOfYear(base), to: endOfYear(base) };
    if (timeScale === 'week') return { from: startOfWeek(base), to: endOfWeek(base) };
    return { from: startOfMonth(base), to: endOfMonth(base) };
  }, [selectedPeriod, timeScale]);

  const rangePrevious = useMemo(() => {
    if (timeScale === 'year') {
      const base = selectedPeriod === 'current' ? new Date(now.getFullYear()-1, now.getMonth(), now.getDate()) : new Date(now.getFullYear()-2, now.getMonth(), now.getDate());
      return { from: startOfYear(base), to: endOfYear(base) };
    }
    if (timeScale === 'week') {
      const base = selectedPeriod === 'current' ? new Date(now.getFullYear(), now.getMonth(), now.getDate()-7) : new Date(now.getFullYear(), now.getMonth(), now.getDate()-14);
      return { from: startOfWeek(base), to: endOfWeek(base) };
    }
    const base = selectedPeriod === 'current' ? addMonths(now, -1) : addMonths(now, -2);
    return { from: startOfMonth(base), to: endOfMonth(base) };
  }, [selectedPeriod, timeScale]);

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
          border: '1px solid rgba(118, 75, 162, 0.1)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            boxShadow: '0 12px 35px rgba(118, 75, 162, 0.2)',
            borderColor: 'rgba(118, 75, 162, 0.3)',
          }
        }}
        onClick={onClick}
      >
        <CardContent sx={{ p: 3, minHeight: 160, display: 'flex', flexDirection: 'column', gap: 1 }}>
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
          {change !== undefined ? (
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
          ) : (
            <Box sx={{ height: 25 }} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  // Fjernet PerformanceCard (ikke i bruk)

  const currentData = selectedPeriod === 'current' ? statsCurrent : statsPrevious;
  const previousData = selectedPeriod === 'current' ? statsPrevious : statsCurrent;

  return (
    <Layout>
      <Box sx={{ p: 4, pb: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Statistikk & Analyse
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Oversikt over arbeidstid, produktivitet og ytelse
        </Typography>
      </Box>

      <Box sx={{ p: 3, pt: 0 }}>
        {/* Filterbar + knapper */}
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, mb: 3, border: '1px dashed #e5e7eb', background: '#fff' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Periode</InputLabel>
                <Select
                  value={timeScale}
                  label="Periode"
                  onChange={(e) => setTimeScale(e.target.value)}
                >
                  <MenuItem value="week">Uke</MenuItem>
                  <MenuItem value="month">Måned</MenuItem>
                  <MenuItem value="year">År</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Datasett</InputLabel>
                <Select
                  value={selectedPeriod}
                  label="Datasett"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <MenuItem value="current">Nåværende</MenuItem>
                  <MenuItem value="previous">Forrige</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Paper component="button" elevation={0} onClick={() => window.print?.()}
                sx={{ px: 2, py: 1, borderRadius: 1, border: '1px solid #e5e7eb', bgcolor: '#fff', cursor: 'pointer' }}>
                Eksporter
              </Paper>
              <Paper component="button" elevation={0} onClick={handleRefresh}
                sx={{ px: 2, py: 1, borderRadius: 1, bgcolor: '#764ba2', color: '#fff', cursor: 'pointer' }}>
                Oppdater
              </Paper>
            </Box>
          </Box>
        </Paper>

        {/* Seksjonstabs */}
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': { color: '#764ba2' },
              },
              '& .MuiTabs-indicator': { backgroundColor: '#764ba2' },
            }}
          >
            <Tab label="Oversikt" icon={<AssessmentIcon />} />
          </Tabs>
        </Paper>

        {/* Innhold */}
        {selectedTab === 0 && (
          <Box>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, mb: 3, border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: '#6b7280' }}>
                Oversikt
              </Typography>
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' } }}>
                <Box>
                  <StatCard
                    title="Total arbeidstid"
                    value={`${currentData.totalHours}h`}
                    subtitle="Denne måneden"
                    icon={<WorkIcon />}
                    color="#764ba2"
                    change={calculateChange(currentData.totalHours, previousData.totalHours)}
                  />
                </Box>
                <Box>
                  <StatCard
                    title="Overtid"
                    value={`${currentData.overtimeHours}h`}
                    subtitle="Ekstra timer"
                    icon={<AccessTimeIcon />}
                    color="#4c5fd6"
                    change={calculateChange(currentData.overtimeHours, previousData.overtimeHours)}
                  />
                </Box>
                <Box>
                  <StatCard
                    title="Totalt fravær"
                    value={`${currentData.sickDays + currentData.vacationDays} dager`}
                    subtitle="Syk + Ferie"
                    icon={<BarChartIcon />}
                    color="#667eea"
                  />
                </Box>
              </Box>
            </Paper>

            <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid #e5e7eb', mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#764ba2', fontWeight: 'bold' }}>
                  Timer og fravær per ansatt
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ansatt</TableCell>
                      <TableCell align="right">Timer</TableCell>
                      <TableCell align="right">Fraværsdager</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((emp: any) => {
                      const empShifts = shifts.filter((s: any) => (s.user?.id || s.userId) === emp.id);
                      const withinRange = empShifts.filter((s: any) => {
                        const t = new Date(s.startTime).getTime();
                        return t >= rangeCurrent.from.getTime() && t <= rangeCurrent.to.getTime();
                      });
                      const empHours = Math.round(hoursForShifts(withinRange));
                      const empAbs = timeOffRequests.filter((r: any) => r.userId === emp.id).filter((r: any) => {
                        const t = new Date(r.fromDate).getTime();
                        return t >= rangeCurrent.from.getTime() && t <= rangeCurrent.to.getTime();
                      }).length;
                      return (
                        <TableRow key={emp.id}>
                          <TableCell>{emp.name}</TableCell>
                          <TableCell align="right">{empHours}h</TableCell>
                          <TableCell align="right">{empAbs}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '2px dashed #e5e7eb', color: '#9ca3af', textAlign: 'center' }}>
              Plassholder for grafer og detaljerte data
            </Paper>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default StatisticsPage;
