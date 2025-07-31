// pages/skift.tsx
import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { Layout } from '../components/Layout'

interface Employee {
    id: string
    name: string
}

interface ShiftPayload {
    userId: string
    date: string
    startTime: string
    endTime: string
    location?: string
    notes?: string
    createdBy: string
}

const ShiftPage: NextPage = () => {
    // Boolean - for å vise/skjule skjemaet
    const [showForm, setShowForm] = useState(false)

    // Array - for å lagre ansatte fra API
    const [employees, setEmployees] = useState<Employee[]>([])

    // Interface - for å lagre skjema-data
    const [form, setForm] = useState<ShiftPayload>({
        userId: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        createdBy: 'admin', // Midlertidig fallback
    })

    // String | null - for feilmeldinger
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Hent ansatte for dropdown - bruk samme URL som index.tsx
        axios.get<Employee[]>('http://10.129.48.163:3001/users', { withCredentials: true })
            .then(res => setEmployees(res.data))
            .catch(err => setError(err.message))
    }, [])

    // Oppdaterer skjema-state når brukeren endrer input-felter
    // Kalles automatisk av onChange på alle input/select elementer
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // Sender skjema-data til serveren når brukeren trykker "Lagre"
    // Konverterer dato/tid til ISO-format som API-et forventer
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Kombiner dato og tid til ISO-format
        const startDateTime = new Date(`${form.date}T${form.startTime}`).toISOString()
        const endDateTime = new Date(`${form.date}T${form.endTime}`).toISOString()
        
        const payload = {
            userId: form.userId,
            startTime: startDateTime,
            endTime: endDateTime,
            location: form.location,
            notes: form.notes,
            createdBy: form.createdBy,
        }
        
        try {
            await axios.post('http://10.129.48.163:3001/shifts', payload, { withCredentials: true })
            // tilbakestill skjema, skjul form
            setForm({ userId: '', date: '', startTime: '', endTime: '', location: '', notes: '', createdBy: 'admin' })
            setShowForm(false)
            // evt. hent på nytt shifts-listen
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <Layout>
            <header style={styles.header}>
                <h1>Shift Management</h1>
                <button style={styles.button} onClick={() => setShowForm(true)}>
                    Opprett nytt skift
                </button>
            </header>

            {showForm && (
                <section style={styles.formSection}>
                    <h2>Opprett Skift</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <label>
                            Ansatt:
                            <select name="userId" value={form.userId} onChange={handleChange} required>
                                <option value="">Velg ansatt</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Dato:
                            <input type="date" name="date" value={form.date} onChange={handleChange} required />
                        </label>

                        <label>
                            Starttid:
                            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
                        </label>

                        <label>
                            Sluttid:
                            <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
                        </label>

                        <label>
                            Lokasjon (valgfritt):
                            <input type="text" name="location" value={form.location} onChange={handleChange} />
                        </label>

                        <label>
                            Notater (valgfritt):
                            <textarea name="notes" value={form.notes} onChange={handleChange} />
                        </label>

                        <div style={styles.formButtons}>
                            <button type="submit">Lagre</button>
                            <button type="button" onClick={() => setShowForm(false)}>Avbryt</button>
                        </div>
                    </form>
                </section>
            )}

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
                    {/* Rader dynmatisk her */}
                    </tbody>
                </table>
            </section>
        </Layout>
    )
}

export default ShiftPage

const styles: Record<string, React.CSSProperties> = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    button: { padding: '0.5rem 1rem', backgroundColor: '#2563EB', color: '#FFF', border: 'none', borderRadius: 4, cursor: 'pointer' },
    formSection: { backgroundColor: '#FFF', padding: '1rem', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' },
    form: { display: 'grid', gap: '1rem' },
    formButtons: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    calendar: { height: 300, backgroundColor: '#E5E7EB', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' },
    listSection: { backgroundColor: '#FFF', padding: '1rem', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    table: { width: '100%', borderCollapse: 'collapse' },
}
