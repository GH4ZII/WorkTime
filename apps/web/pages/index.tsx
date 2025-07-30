import React, {useEffect} from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaChartBar, FaUsers, FaCalendarAlt, FaEnvelope, FaHistory, FaRegHandshake, FaUmbrellaBeach, FaChartLine } from 'react-icons/fa'
import axios from 'axios';


type MenuItem = { label: string; icon: React.ReactNode; href: string; }
const menuItems: MenuItem[] = [
    {label: 'Dashboard', icon: <FaChartBar size={20} />, href: '/' },
    {label: 'Medarbeidere', icon: <FaUsers size={20} />, href: '/medarbeidere' },
    {label: 'Skift', icon: <FaCalendarAlt size={20} />, href: '/skift' },
    {label: 'Bytteforespørsel', icon: <FaRegHandshake size={20} />, href: '/bytteforesporsel'},
    {label: 'Fraværsforespørsel', icon: <FaUmbrellaBeach size={20} />, href: '/fravaersforesporsel'},
    {label: 'Meldinger', icon: <FaEnvelope size={20} />, href: '/meldinger' },
    {label: 'Histortikk', icon: <FaHistory size={20} />, href: '/historikk'},
    {label: 'Statistikk', icon: <FaChartLine size={20} />, href: '/statistikk'}
]

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
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get<Employee[]>('http://10.129.48.163:3001/users', {
                    withCredentials: true,
                });
                console.log(response.data);
                setEmployees(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);



    return (
        <>
        <Head>
            <title>WorkTime</title>
        </Head>

            <div style={styles.container}>
                {/*Sidebar */}
                <aside style={styles.sidebar}>
                    <div style={styles.logo}>
                        <Image src="/logo.svg" width={32} height={32} alt="Logo" />
                        <span style={styles.logoText}>WorkTime</span>
                    </div>
                    <nav>
                        {menuItems.map((menuItem) => (
                            <Link href={menuItem.href} key={menuItem.label} style={styles.link}>
                            <div key={menuItem.label} style={styles.menuItem}>
                                <span style={styles.menuItemIcon}>{menuItem.icon}</span>
                                <span>{menuItem.label}</span>
                            </div>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main style={styles.main}>
                    <h1 style={styles.title}>Dashboard</h1>

                    {/* Stats Row */}
                    <div style={styles.statsRow}>
                        <StatCard title={"Totalt ansatte"} value={24} />
                        <StatCard title={"Skift idag"} value={6} />
                        <StatCard title={"Ventede forespørsler"} value={3} />
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
                            {[
                                { name: 'Ghazi', swapWith: 'Alex', from: '10.04', to: '12.04'  },
                                { name: 'Alex', swapWith: 'Ghazi', from: '12.04', to: '16.04'  },
                                { name: 'Zim', swapWith: 'Ghazi', from: '16.04', to: '20.04'  },
                            ].map((row) => (
                                <tr key={row.name}>
                                    <td>{row.name}</td>
                                    <td>{row.swapWith}</td>
                                    <td>{row.from}</td>
                                    <td>{row.to}</td>
                                </tr>
                            ))}
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
                            {[
                                { name: 'Ghazi', from: '10.04', to: '12.04'  },
                                { name: 'Alex', from: '12.04', to: '16.04'  },
                                { name: 'Zim', from: '16.04', to: '20.04'  },
                            ].map((row) => (
                                <tr key={row.name}>
                                    <td>{row.name}</td>
                                    <td>{row.from}</td>
                                    <td>{row.to}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </>
)
}
export default HomePage

// Styles

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
    },
    sidebar: {
        width: 240,
        backgroundColor: '#1F2937',
        color: '#E5E7EB',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    logoText: {
        marginLeft: 8,
        fontSize: '1.25rem',
        fontWeight: 'bold',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 0',
        cursor: 'pointer',
        borderRadius: 4,
        transition: 'background 0.2s',
    },
    menuIcon: {
        marginRight: '0.75rem',
        fontSize: '1.1rem',
    },
    main: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: '2rem',
        overflowY: 'auto',
    },
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
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block'
    },
}
