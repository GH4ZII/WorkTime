import React, { useState, useEffect } from "react";
import {NextPage} from "next";
import { Layout } from '../components/Layout';
import axios from 'axios';

interface User {
    id: string;
    name: string;
}

interface Shift {
    id: string;
    startTime: string;
    endTime: string;
    user: User;
}

interface ShiftSwapRequest {
    id: string;
    requestedById: string;
    fromShiftId: string;
    swapType: string;
    swapWithId?: string;
    toShiftId?: string;
    status?: string;
    fromShift?: Shift;
    toShift?: Shift;
}

const ShiftSwapPage: NextPage = () => {
    const [swapRequests, setSwapRequests] = useState<ShiftSwapRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [swapResponse, usersResponse, shiftsResponse] = await Promise.all([
                axios.get<ShiftSwapRequest[]>('http://localhost:3001/shift-swap-requests', {
                    withCredentials: true
                }),
                axios.get<User[]>('http://localhost:3001/users', {
                    withCredentials: true
                }),
                axios.get<Shift[]>('http://localhost:3001/shifts', {
                    withCredentials: true
                })
            ]);
            
            setSwapRequests(swapResponse.data);
            setUsers(usersResponse.data);
            setShifts(shiftsResponse.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserName = (userId: string) => {
        const user = users.find(u => u.id === userId);
        return user?.name || 'Ukjent bruker';
    };

    const getShiftInfo = (shiftId: string) => {
        const shift = shifts.find(s => s.id === shiftId);
        if (!shift) return null;
        
        const startDate = new Date(shift.startTime);
        const endDate = new Date(shift.endTime);
        
        return {
            userName: getUserName(shift.user.id),
            startTime: startDate.toLocaleString('nb-NO', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            endTime: endDate.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }),
            duration: `${Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60))}t ${Math.floor(((endDate.getTime() - startDate.getTime()) % (1000 * 60 * 60)) / (1000 * 60))}m`
        };
    };

    const getRequestTitle = (request: ShiftSwapRequest) => {
        const fromShiftInfo = getShiftInfo(request.fromShiftId);
        if (!fromShiftInfo) return 'Ukjent skift';
        
        if (request.swapType === 'SWAP' && request.toShiftId) {
            const toShiftInfo = getShiftInfo(request.toShiftId);
            if (!toShiftInfo) return 'Ukjent skift';
            
            return `${fromShiftInfo.userName} ↔ ${toShiftInfo.userName}`;
        } else {
            return `${fromShiftInfo.userName} gir bort vakt`;
        }
    };

    const getRequestDescription = (request: ShiftSwapRequest) => {
        const fromShiftInfo = getShiftInfo(request.fromShiftId);
        if (!fromShiftInfo) return 'Ukjent skift';
        
        if (request.swapType === 'SWAP' && request.toShiftId) {
            const toShiftInfo = getShiftInfo(request.toShiftId);
            if (!toShiftInfo) return 'Ukjent skift';
            
            return `${fromShiftInfo.userName} ønsker å bytte sitt skift (${fromShiftInfo.startTime}) med ${toShiftInfo.userName}s skift (${toShiftInfo.startTime})`;
        } else {
            return `${fromShiftInfo.userName} ønsker å gi bort sitt skift (${fromShiftInfo.startTime})`;
        }
    };

    const handleApprove = async (requestId: string) => {
        try {
            await axios.post(`http://localhost:3001/shift-swap-requests/${requestId}/approve`, {}, {
                withCredentials: true
            });
            fetchData();
        } catch (err: any) {
            setError(err.message);
        }
    }

    const handleReject = async (requestId: string) => {
        try {
            await axios.post(`http://localhost:3001/shift-swap-requests/${requestId}/reject`, {}, {
                withCredentials: true
            });
            fetchData();
        } catch (err: any) {
            setError(err.message);
        }
    }

    const getStatusDisplay = (status?: string) => {
        switch (status) {
            case 'PENDING':
                return 'Venter';
            case 'APPROVED':
                return 'Godkjent';
            case 'REJECTED':
                return 'Avvist';
            default:
                return 'Venter';
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'PENDING':
                return '#F59E0B';
            case 'APPROVED':
                return '#059669';
            case 'REJECTED':
                return '#DC2626';
            default:
                return '#6B7280';
        }
    };

    return (
        <Layout>
            <h1>Bytteforespørsler</h1>
            <div style={styles.container}>
                <div style={styles.requestList}>
                    {loading ? (
                        <p>Laster forespørsler...</p>
                    ) : (
                        swapRequests.map(request => {
                            const fromShiftInfo = getShiftInfo(request.fromShiftId);
                            const toShiftInfo = request.toShiftId ? getShiftInfo(request.toShiftId) : null;
                            
                            return (
                                <div key={request.id} style={styles.requestCard}>
                                    <div style={styles.requestHeader}>
                                        <h3 style={styles.requestTitle}>
                                            {getRequestTitle(request)}
                                        </h3>
                                        <span style={{
                                            ...styles.statusBadge,
                                            backgroundColor: getStatusColor(request.status)
                                        }}>
                                            {getStatusDisplay(request.status)}
                                        </span>
                                    </div>
                                    
                                    <p style={styles.requestDescription}>
                                        {getRequestDescription(request)}
                                    </p>
                                    
                                    <div style={styles.shiftsContainer}>
                                        <div style={styles.shiftCard}>
                                            <h4 style={styles.shiftTitle}>Fra skift</h4>
                                            {fromShiftInfo ? (
                                                <div style={styles.shiftDetails}>
                                                    <p><strong>Ansatt:</strong> {fromShiftInfo.userName}</p>
                                                    <p><strong>Tid:</strong> {fromShiftInfo.startTime} - {fromShiftInfo.endTime}</p>
                                                    <p><strong>Varighet:</strong> {fromShiftInfo.duration}</p>
                                                </div>
                                            ) : (
                                                <p style={styles.errorText}>Skift ikke funnet</p>
                                            )}
                                        </div>
                                        
                                        {request.swapType === 'SWAP' && toShiftInfo && (
                                            <div style={styles.swapArrow}>↔</div>
                                        )}
                                        
                                        {request.swapType === 'SWAP' && toShiftInfo && (
                                            <div style={styles.shiftCard}>
                                                <h4 style={styles.shiftTitle}>Til skift</h4>
                                                <div style={styles.shiftDetails}>
                                                    <p><strong>Ansatt:</strong> {toShiftInfo.userName}</p>
                                                    <p><strong>Tid:</strong> {toShiftInfo.startTime} - {toShiftInfo.endTime}</p>
                                                    <p><strong>Varighet:</strong> {toShiftInfo.duration}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {request.status === 'PENDING' && (
                                        <div style={styles.actions}>
                                            <button 
                                                style={styles.approveButton}
                                                onClick={() => handleApprove(request.id)}
                                            >
                                                Godkjenn
                                            </button>
                                            <button 
                                                style={styles.rejectButton}
                                                onClick={() => handleReject(request.id)}
                                            >
                                                Avvis
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                    {error && <p style={styles.error}>{error}</p>}
                    {swapRequests.length === 0 && !loading && (
                        <p style={styles.noRequests}>Ingen forespørsler funnet</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default ShiftSwapPage;

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    requestList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    requestCard: {
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '1.5rem',
        backgroundColor: '#F9FAFB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    requestHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    requestTitle: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1F2937'
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        color: '#FFF',
        fontSize: '0.875rem',
        fontWeight: '500'
    },
    requestDescription: {
        color: '#4B5563',
        marginBottom: '1rem',
        fontSize: '1rem'
    },
    shiftsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
    },
    shiftCard: {
        backgroundColor: '#FFF',
        padding: '1rem',
        borderRadius: '6px',
        border: '1px solid #E5E7EB',
        flex: 1,
        minWidth: '250px'
    },
    shiftTitle: {
        margin: '0 0 0.5rem 0',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#374151'
    },
    shiftDetails: {
        fontSize: '0.875rem'
    },
    swapArrow: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#6B7280',
        padding: '0 0.5rem'
    },
    errorText: {
        color: '#DC2626',
        fontSize: '0.875rem'
    },
    actions: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem'
    },
    approveButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#059669',
        color: '#FFF',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'background-color 0.2s'
    },
    rejectButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#DC2626',
        color: '#FFF',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'background-color 0.2s'
    },
    error: {
        color: '#DC2626',
        backgroundColor: '#FEE2E2',
        padding: '1rem',
        borderRadius: '4px',
        border: '1px solid #FCA5A5'
    },
    noRequests: {
        textAlign: 'center',
        color: '#6B7280',
        padding: '2rem',
        fontSize: '1.1rem'
    }
};
