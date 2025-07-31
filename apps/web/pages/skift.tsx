// pages/skift.tsx
import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { Layout } from '../components/Layout'

interface Employee {
    id: string
    name: string
}

interface Shift {
    id: string
    userId: string
    startTime: string
    endTime: string
    location?: string
    notes?: string
    createdBy: string
    user?: Employee
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

type TabType = 'today' | 'week' | 'month'

const ShiftPage: NextPage = () => {
    // Boolean - for å vise/skjule skjemaet
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)

    // Array - for å lagre ansatte fra API
    const [employees, setEmployees] = useState<Employee[]>([])
    const [shifts, setShifts] = useState<Shift[]>([])

    // Interface - for å lagre skjema-data
    const [form, setForm] = useState<ShiftPayload>({
        userId: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        createdBy: 'admin',
    })

    // State for redigering
    const [editingShift, setEditingShift] = useState<Shift | null>(null)
    const [editForm, setEditForm] = useState<ShiftPayload>({
        userId: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        createdBy: 'admin',
    })

    // Kalender state
    const [activeTab, setActiveTab] = useState<TabType>('today')
    const [selectedDate, setSelectedDate] = useState(new Date())

    // String | null - for feilmeldinger
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        fetchEmployees()
        fetchShifts()
    }, [])

    const fetchEmployees = async () => {
        try {
            const res = await axios.get<Employee[]>('http://10.129.48.163:3001/users', { withCredentials: true })
            setEmployees(res.data)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const fetchShifts = async () => {
        try {
            const res = await axios.get<Shift[]>('http://10.129.48.163:3001/shifts', { withCredentials: true })
            setShifts(res.data)
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Oppdaterer skjema-state når brukeren endrer input-felter
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    // Sender skjema-data til serveren når brukeren trykker "Lagre"
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
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
            setForm({ userId: '', date: '', startTime: '', endTime: '', location: '', notes: '', createdBy: 'admin' })
            setShowForm(false)
            setSuccess('Skift opprettet!')
            fetchShifts()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Rediger skift
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!editingShift) return

        const startDateTime = new Date(`${editForm.date}T${editForm.startTime}`).toISOString()
        const endDateTime = new Date(`${editForm.date}T${editForm.endTime}`).toISOString()
        
        const payload = {
            userId: editForm.userId,
            startTime: startDateTime,
            endTime: endDateTime,
            location: editForm.location,
            notes: editForm.notes,
            createdBy: editForm.createdBy,
        }
        
        try {
            await axios.put(`http://10.129.48.163:3001/shifts/${editingShift.id}`, payload, { withCredentials: true })
            setShowEditForm(false)
            setEditingShift(null)
            setSuccess('Skift oppdatert!')
            fetchShifts()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Slett skift
    const handleDelete = async (shiftId: string) => {
        if (!confirm('Er du sikker på at du vil slette dette skiftet?')) return
        
        try {
            await axios.delete(`http://10.129.48.163:3001/shifts/${shiftId}`, { withCredentials: true })
            setSuccess('Skift slettet!')
            fetchShifts()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Start redigering
    const startEdit = (shift: Shift) => {
        const shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
        const startTime = new Date(shift.startTime).toTimeString().slice(0, 5)
        const endTime = new Date(shift.endTime).toTimeString().slice(0, 5)
        
        setEditingShift(shift)
        setEditForm({
            userId: shift.userId,
            date: shiftDate,
            startTime: startTime,
            endTime: endTime,
            location: shift.location || '',
            notes: shift.notes || '',
            createdBy: shift.createdBy,
        })
        setShowEditForm(true)
    }

    // Filtrer skift basert på aktiv tab
    const getFilteredShifts = () => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

        return shifts.filter(shift => {
            const shiftDate = new Date(shift.startTime)
            
            switch (activeTab) {
                case 'today':
                    return shiftDate >= today && shiftDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
                case 'week':
                    return shiftDate >= weekAgo
                case 'month':
                    return shiftDate >= monthAgo
                default:
                    return true
            }
        }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    }

    // Hjelpefunksjoner for formatering
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('nb-NO', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })
    }

    const getDuration = (startTime: string, endTime: string) => {
        const start = new Date(startTime)
        const end = new Date(endTime)
        const diffMs = end.getTime() - start.getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
        return `${diffHours}t ${diffMinutes}m`
    }

    const getEmployeeName = (userId: string) => {
        const employee = employees.find(emp => emp.id === userId)
        return employee?.name || 'Ukjent'
    }

    const filteredShifts = getFilteredShifts()

    return (
        <Layout>
            <header style={styles.header}>
                <h1>Shift Management</h1>
                <button style={styles.button} onClick={() => setShowForm(true)}>
                    Opprett nytt skift
                </button>
            </header>

            {error && <div style={styles.message.error}>{error}</div>}
            {success && <div style={styles.message.success}>{success}</div>}

            {showForm && (
                <section style={styles.formSection}>
                    <h2>Opprett Skift</h2>
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

            {showEditForm && editingShift && (
                <section style={styles.formSection}>
                    <h2>Rediger Skift</h2>
                    <form onSubmit={handleEdit} style={styles.form}>
                        <label>
                            Ansatt:
                            <select name="userId" value={editForm.userId} onChange={handleEditChange} required>
                                <option value="">Velg ansatt</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Dato:
                            <input type="date" name="date" value={editForm.date} onChange={handleEditChange} required />
                        </label>

                        <label>
                            Starttid:
                            <input type="time" name="startTime" value={editForm.startTime} onChange={handleEditChange} required />
                        </label>

                        <label>
                            Sluttid:
                            <input type="time" name="endTime" value={editForm.endTime} onChange={handleEditChange} required />
                        </label>

                        <label>
                            Lokasjon (valgfritt):
                            <input type="text" name="location" value={editForm.location} onChange={handleEditChange} />
                        </label>

                        <label>
                            Notater (valgfritt):
                            <textarea name="notes" value={editForm.notes} onChange={handleEditChange} />
                        </label>

                        <div style={styles.formButtons}>
                            <button type="submit">Oppdater</button>
                            <button type="button" onClick={() => setShowEditForm(false)}>Avbryt</button>
                        </div>
                    </form>
                </section>
            )}

            {/* Kalender med tabs */}
            <section style={styles.calendarSection}>
                <div style={styles.tabContainer}>
                    <button 
                        style={{ ...styles.tab, ...(activeTab === 'today' ? styles.activeTab : {}) }}
                        onClick={() => setActiveTab('today')}
                    >
                        I dag
                    </button>
                    <button 
                        style={{ ...styles.tab, ...(activeTab === 'week' ? styles.activeTab : {}) }}
                        onClick={() => setActiveTab('week')}
                    >
                        Siste uke
                    </button>
                    <button 
                        style={{ ...styles.tab, ...(activeTab === 'month' ? styles.activeTab : {}) }}
                        onClick={() => setActiveTab('month')}
                    >
                        Siste måned
                    </button>
                </div>

                <div style={styles.calendarContent}>
                    {filteredShifts.length === 0 ? (
                        <p style={styles.noShifts}>Ingen skift funnet for valgt periode</p>
                    ) : (
                        <div style={styles.shiftGrid}>
                            {filteredShifts.map(shift => (
                                <div key={shift.id} style={styles.shiftCard}>
                                    <div style={styles.shiftHeader}>
                                        <h3>{getEmployeeName(shift.userId)}</h3>
                                        <div style={styles.shiftActions}>
                                            <button 
                                                style={styles.actionButton.edit}
                                                onClick={() => startEdit(shift)}
                                            >
                                                Rediger
                                            </button>
                                            <button 
                                                style={styles.actionButton.delete}
                                                onClick={() => handleDelete(shift.id)}
                                            >
                                                Slett
                                            </button>
                                        </div>
                                    </div>
                                    <div style={styles.shiftDetails}>
                                        <p><strong>Dato:</strong> {formatDateTime(shift.startTime)}</p>
                                        <p><strong>Tid:</strong> {formatTime(shift.startTime)} - {formatTime(shift.endTime)}</p>
                                        <p><strong>Varighet:</strong> {getDuration(shift.startTime, shift.endTime)}</p>
                                        {shift.location && <p><strong>Lokasjon:</strong> {shift.location}</p>}
                                        {shift.notes && <p><strong>Notater:</strong> {shift.notes}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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
        marginBottom: '1.5rem' 
    },
    button: { 
        padding: '0.5rem 1rem', 
        backgroundColor: '#2563EB', 
        color: '#FFF', 
        border: 'none', 
        borderRadius: 4, 
        cursor: 'pointer' 
    },
    formSection: { 
        backgroundColor: '#FFF', 
        padding: '1rem', 
        borderRadius: 8, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
        marginBottom: '2rem' 
    },
    form: { 
        display: 'grid', 
        gap: '1rem' 
    },
    formButtons: { 
        display: 'flex', 
        gap: '1rem', 
        marginTop: '1rem' 
    },
    calendarSection: { 
        backgroundColor: '#FFF', 
        borderRadius: 8, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
        marginBottom: '2rem',
        overflow: 'hidden'
    },
    tabContainer: { 
        display: 'flex', 
        borderBottom: '1px solid #E5E7EB' 
    },
    tab: { 
        flex: 1, 
        padding: '1rem', 
        border: 'none', 
        backgroundColor: 'transparent', 
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500'
    },
    activeTab: { 
        backgroundColor: '#2563EB', 
        color: '#FFF' 
    },
    calendarContent: { 
        padding: '1rem' 
    },
    noShifts: { 
        textAlign: 'center', 
        color: '#6B7280', 
        padding: '2rem' 
    },
    shiftGrid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1rem' 
    },
    shiftCard: { 
        border: '1px solid #E5E7EB', 
        borderRadius: 8, 
        padding: '1rem',
        backgroundColor: '#F9FAFB'
    },
    shiftHeader: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1rem' 
    },
    shiftActions: { 
        display: 'flex', 
        gap: '0.5rem' 
    },
    actionButton: {
        edit: { 
            padding: '0.25rem 0.5rem', 
            backgroundColor: '#059669', 
            color: '#FFF', 
            border: 'none', 
            borderRadius: 4, 
            cursor: 'pointer',
            fontSize: '0.875rem'
        },
        delete: { 
            padding: '0.25rem 0.5rem', 
            backgroundColor: '#DC2626', 
            color: '#FFF', 
            border: 'none', 
            borderRadius: 4, 
            cursor: 'pointer',
            fontSize: '0.875rem'
        }
    },
    shiftDetails: { 
        fontSize: '0.875rem' 
    },
    message: {
        error: { 
            backgroundColor: '#FEE2E2', 
            color: '#DC2626', 
            padding: '1rem', 
            borderRadius: 8, 
            marginBottom: '1rem',
            border: '1px solid #FCA5A5'
        },
        success: { 
            backgroundColor: '#D1FAE5', 
            color: '#059669', 
            padding: '1rem', 
            borderRadius: 8, 
            marginBottom: '1rem',
            border: '1px solid #A7F3D0'
        }
    }
}
