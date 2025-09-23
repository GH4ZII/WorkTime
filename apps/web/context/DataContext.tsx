import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/api';

interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'ADMIN' | 'EMPLOYEE';
}

interface Shift {
    id: string;
    startTime: string;
    endTime: string;
    userId: string;
    user?: Employee;
}

interface TimeOffRequest {
    id: string;
    userId: string;
    fromDate: string;
    toDate: string;
    type: 'VACATION' | 'SICK' | 'OTHER';
    status?: string;
}

interface SwapRequest {
    id: string;
    requestedById: string;
    fromShiftId: string;
    swapType: string;
    swapWithId: string;
    toShiftId: string;
    status?: string;
}

interface DataContextType {
    employees: Employee[];
    shifts: Shift[];
    timeOffRequests: TimeOffRequest[];
    swapRequests: SwapRequest[];
    loading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
    refreshEmployees: () => Promise<void>;
    refreshShifts: () => Promise<void>;
    refreshTimeOffRequests: () => Promise<void>;
    refreshSwapRequests: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([]);
    const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get<Employee[]>(apiUrl('/users'), {
                withCredentials: true
            });
            setEmployees(response.data);
        } catch (err: any) {
            console.error('Error fetching employees:', err);
            setError('Kunne ikke hente ansatte');
        }
    };

    const fetchShifts = async () => {
        try {
            const response = await axios.get<Shift[]>(apiUrl('/shifts'), {
                withCredentials: true
            });
            setShifts(response.data);
        } catch (err: any) {
            console.error('Error fetching shifts:', err);
            setError('Kunne ikke hente skift');
        }
    };

    const fetchTimeOffRequests = async () => {
        try {
            const response = await axios.get<TimeOffRequest[]>(apiUrl('/time-off-requests'), {
                withCredentials: true
            });
            setTimeOffRequests(response.data);
        } catch (err: any) {
            console.error('Error fetching time off requests:', err);
            setError('Kunne ikke hente fraværsforespørsler');
        }
    };

    const fetchSwapRequests = async () => {
        try {
            const response = await axios.get<SwapRequest[]>(apiUrl('/shift-swap-requests'), {
                withCredentials: true
            });
            setSwapRequests(response.data);
        } catch (err: any) {
            console.error('Error fetching swap requests:', err);
            setError('Kunne ikke hente bytteforespørsler');
        }
    };

    const refreshData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Bruk Promise.all for parallell lasting
            await Promise.all([
                fetchEmployees(),
                fetchShifts(),
                fetchTimeOffRequests(),
                fetchSwapRequests()
            ]);
        } catch (err) {
            console.error('Error refreshing data:', err);
        } finally {
            setLoading(false);
        }
    };

    const refreshEmployees = async () => {
        await fetchEmployees();
    };

    const refreshShifts = async () => {
        await fetchShifts();
    };

    const refreshTimeOffRequests = async () => {
        await fetchTimeOffRequests();
    };

    const refreshSwapRequests = async () => {
        await fetchSwapRequests();
    };

    // Last initial data
    useEffect(() => {
        refreshData();
    }, []);

    const value: DataContextType = {
        employees,
        shifts,
        timeOffRequests,
        swapRequests,
        loading,
        error,
        refreshData,
        refreshEmployees,
        refreshShifts,
        refreshTimeOffRequests,
        refreshSwapRequests,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
