import React, { useMemo, useState } from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { 
  DataTable
} from '../components/ui';
import { 
  Box, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  Card, 
  CardContent, 
  Paper, 
  Chip,
  Avatar,
  Grid,
  Divider
} from '@mui/material';
import { 
  History as HistoryIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const HistoryPage: NextPage = () => {
  const { employees, shifts } = useData();
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  const columns = [
    {
      id: 'date',
      label: 'Date',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('no-NO')
    },
    {
      id: 'startTime',
      label: 'Start Time',
      sortable: true
    },
    {
      id: 'endTime',
      label: 'End Time',
      sortable: true
    },
    {
      id: 'hours',
      label: 'Hours',
      sortable: true,
      align: 'right' as const,
      render: (value: number) => `${value}h`
    },
    {
      id: 'notes',
      label: 'Notes',
      sortable: false
    }
  ];

  // Avled ekte skift for valgt ansatt
  const workLogs = useMemo(() => {
    if (!selectedEmployee) return [];

    const filtered = shifts
      .filter((s: any) => (s.user?.id === selectedEmployee || s.userId === selectedEmployee))
      .map((s: any) => {
        const start = new Date(s.startTime);
        const end = new Date(s.endTime);
        const hours = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
        return {
          id: s.id,
          date: start.toISOString(),
          startTime: start.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' }),
          endTime: end.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' }),
          hours: +hours.toFixed(2),
          notes: s.notes || s.location || ''
        };
      })
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return filtered;
  }, [shifts, selectedEmployee]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    if (!selectedEmployee || workLogs.length === 0) {
      return { totalHours: 0, totalShifts: 0, averageHours: 0 };
    }
    
    const totalHours = workLogs.reduce((sum, log) => sum + log.hours, 0);
    const totalShifts = workLogs.length;
    const averageHours = totalShifts > 0 ? totalHours / totalShifts : 0;
    
    return {
      totalHours: Math.round(totalHours * 10) / 10,
      totalShifts,
      averageHours: Math.round(averageHours * 10) / 10
    };
  }, [workLogs, selectedEmployee]);

  const selectedEmployeeData = employees.find((e: any) => e.id === selectedEmployee);

  return (
    <Layout>
      {/* Modern Header */}
      <Box sx={{ p: 4, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: '#764ba2', width: 56, height: 56 }}>
            <HistoryIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
              Arbeidshistorikk
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', mt: 0.5 }}>
              Se tidligere arbeidstimer og skift for ansatte
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 3, pt: 0 }}>
        {/* Employee Selection Card */}
        <Card 
          elevation={0} 
          sx={{ 
            mb: 3, 
            borderRadius: 3, 
            border: '1px solid #e5e7eb',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <PersonIcon sx={{ color: '#764ba2', fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                Velg Ansatt
              </Typography>
            </Box>
            
            <FormControl size="medium" sx={{ minWidth: 280 }}>
              <Select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value as string)}
                displayEmpty
                sx={{
                  height: 48,
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': { 
                    border: '2px solid #e5e7eb',
                    transition: 'border-color 0.3s ease'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': { 
                    border: '2px solid #764ba2' 
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                    border: '2px solid #764ba2' 
                  },
                  '& .MuiSelect-select': {
                    py: 1.5,
                    px: 2
                  }
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: '#9ca3af' }}>Velg en ansatt...</span>;
                  }
                  const emp = employees.find((e: any) => e.id === selected);
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#764ba2', fontSize: 14 }}>
                        {emp?.name?.charAt(0) || '?'}
                      </Avatar>
                      <Typography sx={{ fontWeight: 500 }}>
                        {emp?.name || 'Ukjent ansatt'}
                      </Typography>
                    </Box>
                  );
                }}
              >
                <MenuItem value="">
                  <em>Velg en ansatt...</em>
                </MenuItem>
                {employees.map((emp: any) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#764ba2', fontSize: 14 }}>
                        {emp.name?.charAt(0) || '?'}
                      </Avatar>
                      <Typography>{emp.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        {selectedEmployee && (
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 3, 
                    border: '1px solid #e5e7eb',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <AccessTimeIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {summaryStats.totalHours}h
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Totale timer
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 3, 
                    border: '1px solid #e5e7eb',
                    background: 'linear-gradient(135deg, #4c5fd6 0%, #667eea 100%)',
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {summaryStats.totalShifts}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Totale skift
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 3, 
                    border: '1px solid #e5e7eb',
                    background: 'linear-gradient(135deg, #764ba2 0%, #4c5fd6 100%)',
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <HistoryIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {summaryStats.averageHours}h
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Gjennomsnitt per skift
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        )}

        {/* Data Table */}
        <Card 
          elevation={0} 
          sx={{ 
            borderRadius: 3, 
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {selectedEmployee && (
              <Box sx={{ p: 3, pb: 2, borderBottom: '1px solid #e5e7eb' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#764ba2', width: 40, height: 40 }}>
                    {selectedEmployeeData?.name?.charAt(0) || '?'}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                      {selectedEmployeeData?.name || 'Ukjent ansatt'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Arbeidshistorikk - {workLogs.length} skift registrert
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            
            <Box sx={{ p: 3, pt: selectedEmployee ? 2 : 3 }}>
              <DataTable
                columns={columns}
                data={workLogs}
                defaultRowsPerPage={10}
                emptyMessage={selectedEmployee ? 'Ingen historikk funnet for valgt ansatt' : 'Velg en ansatt for å se historikken'}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default HistoryPage;
