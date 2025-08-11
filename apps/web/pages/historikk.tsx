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
import { Box, Typography, Chip, Button, Grid } from '@mui/material';
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <AnimatedCard
              title="Total Hours"
              subtitle="This month"
              hoverEffect="lift"
              entranceAnimation="slideUp"
              delay={0.1}
              interactive={true}
              onClick={() => console.log('Total Hours clicked')}
            >
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" component="div" fontWeight="bold" color="primary">
                  {totalHours}h
                </Typography>
                <WorkIcon sx={{ fontSize: 48, color: 'primary.main', mt: 2 }} />
              </Box>
            </AnimatedCard>
          </Box>
          
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <AnimatedCard
              title="Average Hours"
              subtitle="Per day"
              hoverEffect="glow"
              entranceAnimation="slideUp"
              delay={0.2}
            >
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" component="div" fontWeight="bold" color="success.main">
                  {averageHours.toFixed(1)}h
                </Typography>
                <ScheduleIcon sx={{ fontSize: 48, color: 'success.main', mt: 2 }} />
              </Box>
            </AnimatedCard>
          </Box>
          
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <AnimatedCard
              title="Completion Rate"
              subtitle="Tasks completed"
              hoverEffect="scale"
              entranceAnimation="slideUp"
              delay={0.3}
            >
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" component="div" fontWeight="bold" color="info.main">
                  85%
                </Typography>
                <TrendingUpIcon sx={{ fontSize: 48, color: 'info.main', mt: 2 }} />
              </Box>
            </AnimatedCard>
          </Box>
        </Box>

        {/* Search Section with Parallax */}
        <ParallaxCard sx={{ mb: 4 }}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Search Work Logs
            </Typography>
            <SearchInput
              placeholder="Search work logs..."
              onSearch={handleSearch}
              debounceMs={300}
              loading={isLoading}
            />
          </Box>
        </ParallaxCard>

        {/* Data Table with Loading State */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <LoadingSpinner
              variant="orbit"
              size="large"
              text="Refreshing data..."
              color="primary.main"
            />
          </Box>
        ) : (
          <ParallaxContainer
            speed={0.1}
            direction="up"
            opacity={true}
            scale={true}
          >
            <DataTable
              columns={columns}
              data={filteredData}
              title="Work Log History"
              defaultRowsPerPage={10}
            />
          </ParallaxContainer>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
          <AnimatedCard
            hoverEffect="tilt"
            entranceAnimation="bounce"
            delay={0.4}
            interactive={true}
          >
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isLoading}
            >
              Refresh Data
            </Button>
          </AnimatedCard>
          
          <AnimatedCard
            hoverEffect="tilt"
            entranceAnimation="bounce"
            delay={0.5}
            interactive={true}
          >
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Export Data
            </Button>
          </AnimatedCard>
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
