import React, { useState } from 'react';
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
import { Box, Typography, Chip, Button, Grid, Card, CardContent } from '@mui/material';
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

// Sample data for demonstration
const sampleWorkLogs = [
  {
    id: 1,
    date: '2024-01-15',
    startTime: '08:00',
    endTime: '16:00',
    hours: 8,
    status: 'completed',
    notes: 'Regular workday'
  },
  {
    id: 2,
    date: '2024-01-16',
    startTime: '09:00',
    endTime: '17:30',
    hours: 8.5,
    status: 'completed',
    notes: 'Extended hours for project'
  },
  {
    id: 3,
    date: '2024-01-17',
    startTime: '08:30',
    endTime: '15:00',
    hours: 6.5,
    status: 'partial',
    notes: 'Left early for appointment'
  }
];

const HistoryPage: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(sampleWorkLogs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredData(sampleWorkLogs);
    } else {
      const filtered = sampleWorkLogs.filter(log =>
        log.date.includes(query) ||
        log.notes.toLowerCase().includes(query.toLowerCase()) ||
        log.status.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

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
      id: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Chip
          label={value}
          color={value === 'completed' ? 'success' : 'warning'}
          size="small"
          sx={{
            bgcolor: value === 'completed' ? '#4caf50' : '#ff9800',
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      )
    },
    {
      id: 'notes',
      label: 'Notes',
      sortable: false
    }
  ];

  const totalHours = sampleWorkLogs.reduce((sum, log) => sum + log.hours, 0);
  const averageHours = totalHours / sampleWorkLogs.length;

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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
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
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 0.3)',
                  }
                }}
                onClick={() => console.log('Total Hours clicked')}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Total Hours
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    This month
                  </Typography>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: '#667eea' }}>
                      {totalHours}h
                    </Typography>
                    <WorkIcon sx={{ fontSize: 48, color: '#667eea', mt: 2, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
          
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
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
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 0.3)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Average Hours
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Per day
                  </Typography>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: '#5a6fd8' }}>
                      {averageHours.toFixed(1)}h
                    </Typography>
                    <ScheduleIcon sx={{ fontSize: 48, color: '#5a6fd8', mt: 2, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
          
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
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
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 0.3)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Completion Rate
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Tasks completed
                  </Typography>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h3" component="div" fontWeight="bold" sx={{ color: '#4c5fd6' }}>
                      85%
                    </Typography>
                    <TrendingUpIcon sx={{ fontSize: 48, color: '#4c5fd6', mt: 2, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Box>

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
                data={filteredData}
                title="Work Log History"
                defaultRowsPerPage={10}
              />
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
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
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
                  borderColor: 'rgba(102, 126, 234, 0.3)',
                }
              }}
            >
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={isLoading}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #4c5fd6 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                    opacity: 0.7,
                  },
                  borderRadius: 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Refresh Data
              </Button>
            </Card>
          </motion.div>
          
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
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
                  borderColor: 'rgba(102, 126, 234, 0.3)',
                }
              }}
            >
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                sx={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5a6fd8',
                    backgroundColor: 'rgba(102, 126, 234, 0.04)',
                  },
                  borderRadius: 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Export Data
              </Button>
            </Card>
          </motion.div>
        </Box>
      </Box>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon={AddIcon}
        onClick={() => console.log('Add new work log')}
        tooltip="Add New Work Log"
        color="primary"
        animation="pulse"
        position="bottom-right"
      />
    </Layout>
  );
};

export default HistoryPage;
