import React, {useEffect} from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { Layout } from '../components/Layout';

interface TimeOffRequest {
    id: string;
    userId: string;
    fromDate: string;
    toDate: string;
    type: 'VACATION' | 'SICK' | 'OTHER';
}

interface Shift {
    id: string;
    startTime: string;
}
interface SwapRequest {
    id: string;
    requestedById: string;
    fromShiftId: string;
    swapType: string;
    swapWithId: string;
    toShiftId: string;
}

interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'ADMIN' | 'EMPLOYEE';
}

type StatCardProps = { title: string; value: string | number }
const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
    <div style={styles.statCard}>
        <div style={styles.statValue}>{value}</div>
        <div style={styles.statTitle}>{title}</div>
    </div>
)

const HomePage: NextPage = () => {
    const [timeOffRequests, setTimeOffRequests] = React.useState<TimeOffRequest[]>([]);
    const [swapRequests, setSwapRequests] = React.useState<SwapRequest[]>([]);
    const [shifts, setShifts] = React.useState<Shift[]>([]);
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const totalEmployees = employees.length;
    const totalRequests = timeOffRequests.length + swapRequests.length;

    //Hent alle time off requests
    useEffect(() => {
        axios.get<TimeOffRequest[]>('http://10.129.48.163:3001/time-off-requests', { withCredentials: true })
            .then(res => setTimeOffRequests(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Hent alle skiftene
    useEffect(() => {
        axios.get<Shift[]>('http://10.129.48.163:3001/shifts', { withCredentials: true })
            .then(res => setShifts(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Oppslagskart
    const shiftDateById = React.useMemo(() => {
        return Object.fromEntries(
            shifts.map(s => [s.id, s.startTime])
        );
    }, [shifts]);

    // Formater datoen til norsk format (dd.mm.åååå)
    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString('no-NO');
    };

    // Hent alle employees
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get<Employee[]>('http://10.129.48.163:3001/users', {
                    withCredentials: true,
                });
                setEmployees(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    // Hent alle swap requests
    useEffect(() => {
        const fetchSwapRequests = async () => {
            try {
                const response = await axios.get<SwapRequest[]>('http://10.129.48.163:3001/shift-swap-requests', {
                    withCredentials: true,
                });
                setSwapRequests(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSwapRequests();
    }, []);


    return (
        <>
        <Head>
            <title>WorkTime</title>
        </Head>
        <Layout>
            <h1 style={styles.pageTitle}>Dashboard</h1>

                    {/* Stats Row */}
                    <div style={styles.statsRow}>
                        <StatCard title={"Totalt ansatte"} value={totalEmployees} />
                        <StatCard title={"Finn noe for denne"} value={6} />
                        <StatCard title={"Ventede forespørsler"} value={totalRequests} />
                    </div>

                        {/* Example table and cards */}
                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}> Ansatte og kommende skift</h2>
                            <table style={styles.table}>
                                <thead>
                                <tr>
                                    <th>Ansatt</th>
                                    <th>Rolle</th>
                                    <th>Telefonummer</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employees.length > 0 ? (
                                    employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.name}</td>
                                            <td>{employee.role}</td>
                                            <td>{employee.phone}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr key="no-employees"></tr>
                                )}
                                </tbody>
                            </table>
                        </section>
                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Bytteforespørsler</h2>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th>Ansatt</th>
                                <th>Bytte med</th>
                                <th>Fra</th>
                                <th>Til</th>
                            </tr>
                            </thead>
                            <tbody>
                            {swapRequests.map(sr => {
                                // finn employee-objektet for hver ID
                                const requester = employees.find(e => e.id === sr.requestedById)?.name
                                const swapWith  = employees.find(e => e.id === sr.swapWithId)?.name
                                const dateFrom = shiftDateById[sr.fromShiftId];
                                const dateTo = shiftDateById[sr.toShiftId];

                                return (
                                    <tr key={sr.id}>
                                        <td>{requester  || sr.requestedById}</td>
                                        <td>{swapWith  || sr.swapWithId}</td>
                                        <td>{dateFrom ? formatDate(dateFrom) : sr.fromShiftId}</td>
                                        <td>{dateTo ? formatDate(dateTo): sr.toShiftId}</td>
                                    </tr>
                                )
                            })}
                            </tbody>

                        </table>
                    </section>
                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Fraværsforespørsel</h2>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th>Ansatt</th>
                                <th>Fra</th>
                                <th>Til</th>
                            </tr>
                            </thead>
                            <tbody>
                            {timeOffRequests.map(sr => {
                                const requester = employees.find(e => e.id === sr.userId)?.name

                                return (
                                    <tr key={sr.id}>
                                        <td>{requester  || sr.userId}</td>
                                        <td>{formatDate(sr.fromDate)}</td>
                                        <td>{formatDate(sr.toDate)}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </section>
        </Layout>
        </>
)
}
export default HomePage

// Styles

const styles: Record<string, React.CSSProperties> = {
    pageTitle: {
        fontSize: '2rem',
        fontWeight: 600,
        marginBottom: '1.5rem',
        color: '#111827',
    },
    statsRow: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    statValue: {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#1F2937',
    },
    statTitle: {
        marginTop: '0.25rem',
        fontSize: '0.9rem',
        color: '#6B7280',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        marginBottom: '1rem',
        color: '#111827',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    'table th, table td': {
        textAlign: 'left',
        padding: '0.75rem',
        borderBottom: '1px solid #E5E7EB',
    },

}
