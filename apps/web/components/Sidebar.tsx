import React from 'react'
import Link from 'next/link'
import { FaChartBar, FaUsers, FaCalendarAlt, FaRegHandshake, FaUmbrellaBeach, FaEnvelope, FaHistory, FaChartLine } from 'react-icons/fa'

const menuItems = [
    { label: 'Dashboard', icon: <FaChartBar size={20} />, href: '/' },
    { label: 'Medarbeidere', icon: <FaUsers size={20} />, href: '/medarbeidere' },
    { label: 'Skift', icon: <FaCalendarAlt size={20} />, href: '/skift' },
    { label: 'Bytteforespørsel', icon: <FaRegHandshake size={20} />, href: '/bytteforesporsel' },
    { label: 'Fraværsforespørsel', icon: <FaUmbrellaBeach size={20} />, href: '/fravaersforesporsel' },
    { label: 'Meldinger', icon: <FaEnvelope size={20} />, href: '/meldinger' },
    { label: 'Historikk', icon: <FaHistory size={20} />, href: '/historikk' },
    { label: 'Statistikk', icon: <FaChartLine size={20} />, href: '/statistikk' },
]

export const Sidebar: React.FC = () => (
    <aside style={styles.sidebar}>
        <div style={styles.logo}>
            <span style={styles.logoText}>WorkTime</span>
        </div>
        <nav>
            {menuItems.map(item => (
                <Link href={item.href} key={item.label} style={styles.link}>
                    <div style={styles.menuItem}>
                        <span style={styles.menuIcon}>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                </Link>
            ))}
        </nav>
    </aside>
)

const styles: Record<string, React.CSSProperties> = {
    sidebar: {
        width: 240,
        backgroundColor: '#1F2937',
        color: '#E5E7EB',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
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
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
    },
}
