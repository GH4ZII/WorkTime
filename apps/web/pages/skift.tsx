import React from 'react'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'

const ShiftPage: NextPage = () => {
    return (
        <Layout>
                <header style={styles.header}>
                    <h1>Shift Management</h1>
                    <button style={styles.button}>Opprett nytt skift</button>
                </header>

                {/* Kalender placeholder */}
                <section style={styles.calendar}>
                    <p>Her kommer kalender-visning</p>
                </section>

                {/* Liste over skift */}
                <section style={styles.listSection}>
                    <h2>Eksisterende skift</h2>
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th>Ansatt</th>
                            <th>Dato / Tid</th>
                            <th>Varighet</th>
                            <th>Handling</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Ghazi</td>
                            <td>01.07.2025 08:00</td>
                            <td>8 t</td>
                            <td>
                                <button style={styles.smallBtn}>Rediger</button>
                                <button style={styles.smallBtn}>Slett</button>
                            </td>
                        </tr>
                        {/* Flere rader… */}
                        </tbody>
                    </table>
                </section>
        </Layout>
    )
}

export default ShiftPage

const styles: Record<string, React.CSSProperties> = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: '#2563EB',
        color: '#FFF',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
    },
    calendar: {
        height: 300,
        backgroundColor: '#E5E7EB',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    listSection: {
        backgroundColor: '#FFF',
        padding: '1rem',
        borderRadius: 8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    smallBtn: {
        marginRight: 8,
        padding: '0.25rem 0.5rem',
        border: '1px solid #999',
        borderRadius: 4,
        background: 'none',
        cursor: 'pointer',
    },
}
