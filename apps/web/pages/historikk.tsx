import React, { useMemo, useState } from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { 
  DataTable
} from '../components/ui';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
// removed unused ParallaxContainer
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

  return (
    <Layout>
      {/* Simple header */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Work History
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Filter + Table unified, no card background */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 240 }}>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>Ansatt</Typography>
            <Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value as string)}
              displayEmpty
              sx={{
                height: 40,
                bgcolor: 'transparent',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                borderRadius: 1,
                px: 1,
                color: '#111827'
              }}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: '#9ca3af' }}>Velg Ansatt</span>;
                }
                const emp = employees.find((e: any) => e.id === selected);
                return emp?.name || 'Velg Ansatt';
              }}
            >
              <MenuItem value="">
                <em>Velg Ansatt</em>
              </MenuItem>
              {employees.map((emp: any) => (
                <MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {selectedEmployee && (
          <DataTable
            columns={columns}
            data={workLogs}
            defaultRowsPerPage={10}
          />
        )}
      </Box>
    </Layout>
  );
};

export default HistoryPage;
