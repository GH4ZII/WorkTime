import React, { useState, useEffect } from 'react'
import {NextPage} from 'next'
import { Layout } from '../components/Layout'
import axios from 'axios'

interface TimeOffRequest {
    id: string;
    userId: string;
    fromDate: string;
    toDate: string;
    type: 'VACATION' | 'SICK' | 'OTHER';
    reason?: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt?: string;
    updatedAt?: string;
    user?: User;
}

interface User {
    id: string;
    name: string;
}


const VacancyPage: NextPage = () => {
    const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [requestsResponse, usersResponse] = await Promise.all([
                axios.get<TimeOffRequest[]>('http://10.129.48.163:3001/time-off-requests', { withCredentials: true }),
                axios.get<User[]>('http://10.129.48.163:3001/users', { withCredentials: true })
            ]);

            setTimeOffRequests(requestsResponse.data);
            setUsers(usersResponse.data);
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

    const formatFromDate = (date: string) => {
        return new Date(date).toLocaleDateString('no-NO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const formatToDate = (date: string) => {
        return new Date(date).toLocaleDateString('no-NO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const getRequestTitle = (request: TimeOffRequest) => {
        const userName = getUserName(request.userId);
        const type = request.type.charAt(0).toUpperCase() + request.type.slice(1);
        return `${userName} ønsker ${type} fra ${formatFromDate(request.fromDate)} til ${formatToDate(request.toDate)}`;
    };

    const getRequestDescription = (request: TimeOffRequest) => {
        const userName = getUserName(request.userId);
        const type = request.type.charAt(0).toUpperCase() + request.type.slice(1);
        return `${userName} ønsker ${type} fra ${formatFromDate(request.fromDate)} til ${formatToDate(request.toDate)}`;
    };

    const handleApprove = async (requestId: string) => {
        try {
            await axios.post(`http://10.129.48.163:3001/time-off-requests/${requestId}/approve`, {}, { withCredentials: true });
            fetchData();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleReject = async (requestId: string) => {
        try {
            await axios.post(`http://10.129.48.163:3001/time-off-requests/${requestId}/reject`, {}, { withCredentials: true });
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
                return 'yellow';
            case 'APPROVED':
                return 'green';
            case 'REJECTED':
                return 'red';
            default:
                return 'yellow';
        }
    };
    return (
        <Layout>
            <h1>Fraværsforespørsler</h1>
            <div style={styles.container}>
                <div style={styles.requestList}>
                    {loading ? (
                        <p>Laster forespørsler...</p>
                    ) : (
                        timeOffRequests.map(request => {

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
                                    <div style={styles.requestContent}>
                                        <p style={styles.requestDescription}>
                                            {getRequestDescription(request)}
                                        </p>
                                    </div>
                                    <div style={styles.requestActions}>
                                        {request.status === 'PENDING' && (
                                            <>
                                                <button style={styles.approveButton} onClick={() => handleApprove(request.id)}>Godkjenn</button>
                                                <button style={styles.rejectButton} onClick={() => handleReject(request.id)}>Avvis</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default VacancyPage;

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    requestList: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px',
    },
    requestCard: {
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    requestHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    requestTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    statusBadge: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    requestContent: {
        marginBottom: '12px',
    },
    requestDescription: {
        margin: '0',
    },
    requestActions: {
        display: 'flex',
        gap: '8px',
    },
    approveButton: {
        backgroundColor: '#22c55e',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    rejectButton: {
        backgroundColor: '#ef4444',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
}


