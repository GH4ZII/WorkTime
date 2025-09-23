import React, { useMemo, useState } from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { 
  DataTable, 
  SearchInput, 
  StatusCard,
  AnimatedCard,
  FloatingActionButton,
  ParallaxHero,
  ParallaxCard,
  LoadingSpinner
} from '../components/ui';
import { Box, Typography, Chip, Button, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { 
  Work as WorkIcon, 
  Schedule as ScheduleIcon, 
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ParallaxContainer } from '../components/ui/ParallaxContainer';
import { useData } from '../context/DataContext';

const HistoryPage: NextPage = () => {
  const { employees, shifts } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

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
    const filtered = shifts
      .filter((s: any) => selectedEmployee ? (s.user?.id === selectedEmployee || s.userId === selectedEmployee) : true)
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

    // Søk
    const q = searchQuery.trim().toLowerCase();
    return q
      ? filtered.filter((l: any) => l.notes.toLowerCase().includes(q) || new Date(l.date).toLocaleDateString('no-NO').includes(q))
      : filtered;
  }, [shifts, selectedEmployee, searchQuery]);

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <ParallaxHero
        height="40vh"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Box sx={{ p: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              Work History
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Track your time and productivity
            </Typography>
          </motion.div>
        </Box>
      </ParallaxHero>

      <Box sx={{ p: 3 }}>
        {/* Animated Status Cards */}
        {/* Employee filter */}
        <Card elevation={3} sx={{ borderRadius: 3, border: '1px solid rgba(102,126,234,0.1)', mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
              Work log history
            </Typography>
            <FormControl size="small" sx={{ minWidth: 240 }}>
              <InputLabel>Ansatt</InputLabel>
              <Select
                value={selectedEmployee}
                label="Ansatt"
                onChange={(e) => setSelectedEmployee(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>Alle</em>
                </MenuItem>
                {employees.map((emp: any) => (
                  <MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Search Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Card
            elevation={3}
            sx={{
              mb: 4,
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
            <Box sx={{ p: 3, bgcolor: 'transparent' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#667eea', fontWeight: 'bold' }}>
                Search Work Logs
              </Typography>
              <SearchInput
                placeholder="Search work logs..."
                onSearch={handleSearch}
                debounceMs={300}
                loading={isLoading}
              />
            </Box>
          </Card>
        </motion.div>

        {/* Data Table with Loading State */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <LoadingSpinner
              variant="orbit"
              size="large"
              text="Refreshing data..."
              color="primary"
            />
          </Box>
        ) : (
          <motion.div
            whileHover={{ scale: 1.01 }}
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
              <DataTable
                columns={columns}
                data={workLogs}
                title={selectedEmployee ? `Work Log History – ${employees.find(e => e.id === selectedEmployee)?.name || ''}` : 'Work Log History'}
                defaultRowsPerPage={10}
              />
            </Card>
          </motion.div>
        )}
      </Box>
    </Layout>
  );
};

export default HistoryPage;
