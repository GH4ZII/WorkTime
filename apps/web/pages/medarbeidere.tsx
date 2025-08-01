import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import axios from 'axios';
import { Layout } from '../components/Layout';

interface Employee {
    id: string;
    name: string;
    email: string;
    role?: string;
    phone?: string;
    hireDate?: string;
}

interface CreateEmployeeDto {
    name: string;
    email: string;
    password: string;
    role?: string;
    phone?: string;
    hireDate?: string;
}

const CoWorkerPage: NextPage = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Form state for ny ansatt
    const [form, setForm] = useState<CreateEmployeeDto>({
        name: '',
        email: '',
        password: '',
        role: '',
        phone: '',
        hireDate: new Date().toISOString().split('T')[0]
    });

    // Form state for redigering
    const [editForm, setEditForm] = useState<CreateEmployeeDto>({
        name: '',
        email: '',
        password: '',
        role: '',
        phone: '',
        hireDate: '',
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Employee[]>('http://10.129.48.163:3001/users', { 
                withCredentials: true 
            });
            setEmployees(response.data);
        } catch (err: any) {
            setError('Kunne ikke hente ansatte: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await axios.post('http://10.129.48.163:3001/users', form, { 
                withCredentials: true 
            });
            
            setSuccess('Ansatt opprettet!');
            setForm({ name: '', email: '', password: '', role: '', phone: '', hireDate: new Date().toISOString().split('T')[0] });
            setShowForm(false);
            fetchEmployees();
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError('Kunne ikke opprette ansatt: ' + err.message);
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!editingEmployee) return;

        try {
            const updateData = { ...editForm };
            // Fjern password hvis det er tomt (ikke endret)
            if (!updateData.password) {
                delete updateData.password;
            }

            await axios.put(`http://10.129.48.163:3001/users/${editingEmployee.id}`, updateData, { 
                withCredentials: true 
            });
            
            setSuccess('Ansatt oppdatert!');
            setShowEditForm(false);
            setEditingEmployee(null);
            setEditForm({ name: '', email: '', password: '', role: '', phone: '', hireDate: '' });
            fetchEmployees();
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError('Kunne ikke oppdatere ansatt: ' + err.message);
        }
    };

    const handleDelete = async (employeeId: string, employeeName: string) => {
        if (!confirm(`Er du sikker på at du vil slette ${employeeName}? Dette kan ikke angres.`)) {
            return;
        }

        try {
            await axios.delete(`http://10.129.48.163:3001/users/${employeeId}`, { 
                withCredentials: true 
            });
            
            setSuccess('Ansatt slettet!');
            fetchEmployees();
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError('Kunne ikke slette ansatt: ' + err.message);
        }
    };

    const startEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setEditForm({
            name: employee.name,
            email: employee.email,
            password: '', // Tomt for sikkerhet
            role: employee.role || '',
            phone: employee.phone || '',
            hireDate: employee.hireDate || '',
        });
        setShowEditForm(true);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Ikke satt';
        return new Date(dateString).toLocaleDateString('nb-NO');
    };

    const getRoleDisplayName = (role?: string) => {
        switch (role) {
            case 'ADMIN':
                return 'Administrator';
            case 'EMPLOYEE':
                return 'Ansatt';
            default:
                return 'Ikke satt';
        }
    };

    return (
        <Layout>
            <header style={styles.header}>
                <h1>Medarbeider Administrasjon</h1>
                <button 
                    style={styles.addButton} 
                    onClick={() => setShowForm(true)}
                >
                    Legg til ny ansatt
                </button>
            </header>

            {error && <div style={styles.message.error}>{error}</div>}
            {success && <div style={styles.message.success}>{success}</div>}

            {/* Skjema for ny ansatt */}
            {showForm && (
                <section style={styles.formSection}>
                    <h2>Legg til ny ansatt</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formRow}>
                            <label style={styles.label}>
                                Navn *
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </label>
                            <label style={styles.label}>
                                E-post *
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </label>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label}>
                                Passord *
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </label>
                            <label style={styles.label}>
                                Rolle
                                <select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    style={styles.input}
                                >
                                    <option value="">Velg rolle</option>
                                    <option value="EMPLOYEE">Ansatt</option>
                                    <option value="ADMIN">Administrator</option>
                                </select>
                            </label>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label}>
                                Telefon
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </label>
                            <label style={styles.label}>
                                Ansettelsesdato *
                                <input
                                    type="date"
                                    name="hireDate"
                                    value={form.hireDate}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </label>
                        </div>

                        <div style={styles.formButtons}>
                            <button type="submit" style={styles.submitButton}>
                                Lagre ansatt
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowForm(false)}
                                style={styles.cancelButton}
                            >
                                Avbryt
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {/* Skjema for redigering */}
            {showEditForm && editingEmployee && (
                <section style={styles.formSection}>
                    <h2>Rediger ansatt: {editingEmployee.name}</h2>
                    <form onSubmit={handleEdit} style={styles.form}>
                        <div style={styles.formRow}>
                            <label style={styles.label}>
                                Navn *
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleEditChange}
                                    required
                                    style={styles.input}
                                />
                            </label>
                            <label style={styles.label}>
                                E-post *
                                <input
                                    type="email"
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleEditChange}
                                    required
                                    style={styles.input}
                                />
                            </label>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label}>
                                Nytt passord (la stå tomt for å beholde)
                                <input
                                    type="password"
                                    name="password"
                                    value={editForm.password}
                                    onChange={handleEditChange}
                                    style={styles.input}
                                    placeholder="La stå tomt for å beholde nåværende"
                                />
                            </label>
                            <label style={styles.label}>
                                Rolle
                                <select
                                    name="role"
                                    value={editForm.role}
                                    onChange={handleEditChange}
                                    style={styles.input}
                                >
                                    <option value="">Velg rolle</option>
                                    <option value="EMPLOYEE">Ansatt</option>
                                    <option value="ADMIN">Administrator</option>
                                </select>
                            </label>
                        </div>

                        <div style={styles.formRow}>
                            <label style={styles.label}>
                                Telefon
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editForm.phone}
                                    onChange={handleEditChange}
                                    style={styles.input}
                                />
                            </label>
                            <label style={styles.label}>
                                Ansettelsesdato *
                                <input
                                    type="date"
                                    name="hireDate"
                                    value={editForm.hireDate}
                                    onChange={handleEditChange}
                                    required
                                    style={styles.input}
                                />
                            </label>
                        </div>

                        <div style={styles.formButtons}>
                            <button type="submit" style={styles.submitButton}>
                                Oppdater ansatt
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowEditForm(false)}
                                style={styles.cancelButton}
                            >
                                Avbryt
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {/* Oversikt over ansatte */}
            <section style={styles.employeesSection}>
                <h2>Oversikt over ansatte ({employees.length})</h2>
                
                {loading ? (
                    <div style={styles.loading}>Laster ansatte...</div>
                ) : employees.length === 0 ? (
                    <div style={styles.noEmployees}>Ingen ansatte funnet</div>
                ) : (
                    <div style={styles.employeesGrid}>
                        {employees.map(employee => (
                            <div key={employee.id} style={styles.employeeCard}>
                                <div style={styles.employeeHeader}>
                                    <h3 style={styles.employeeName}>{employee.name}</h3>
                                    <div style={styles.employeeActions}>
                                        <button
                                            style={styles.actionButton.edit}
                                            onClick={() => startEdit(employee)}
                                        >
                                            Rediger
                                        </button>
                                        <button
                                            style={styles.actionButton.delete}
                                            onClick={() => handleDelete(employee.id, employee.name)}
                                        >
                                            Slett
                                        </button>
                                    </div>
                                </div>
                                
                                <div style={styles.employeeDetails}>
                                    <p><strong>E-post:</strong> {employee.email}</p>
                                    <p><strong>Rolle:</strong> {getRoleDisplayName(employee.role)}</p>
                                    <p><strong>Telefon:</strong> {employee.phone || 'Ikke satt'}</p>
                                    <p><strong>Ansettelsesdato:</strong> {formatDate(employee.hireDate)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default CoWorkerPage;

const styles: Record<string, React.CSSProperties> = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #E5E7EB'
    },
    addButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#2563EB',
        color: '#FFF',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'background-color 0.2s'
    },
    formSection: {
        backgroundColor: '#FFF',
        padding: '2rem',
        borderRadius: 12,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        fontWeight: '500'
    },
    input: {
        padding: '0.75rem',
        border: '1px solid #D1D5DB',
        borderRadius: 6,
        fontSize: '1rem',
        transition: 'border-color 0.2s'
    },
    formButtons: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem'
    },
    submitButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#059669',
        color: '#FFF',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500'
    },
    cancelButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#6B7280',
        color: '#FFF',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500'
    },
    employeesSection: {
        backgroundColor: '#FFF',
        padding: '2rem',
        borderRadius: 12,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    loading: {
        textAlign: 'center',
        padding: '2rem',
        color: '#6B7280',
        fontSize: '1.1rem'
    },
    noEmployees: {
        textAlign: 'center',
        padding: '2rem',
        color: '#6B7280',
        fontSize: '1.1rem'
    },
    employeesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
    },
    employeeCard: {
        border: '1px solid #E5E7EB',
        borderRadius: 8,
        padding: '1.5rem',
        backgroundColor: '#F9FAFB',
        transition: 'box-shadow 0.2s'
    },
    employeeHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #E5E7EB'
    },
    employeeName: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1F2937'
    },
    employeeActions: {
        display: 'flex',
        gap: '0.5rem'
    },
    actionButton: {
        edit: {
            padding: '0.5rem 1rem',
            backgroundColor: '#059669',
            color: '#FFF',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
        },
        delete: {
            padding: '0.5rem 1rem',
            backgroundColor: '#DC2626',
            color: '#FFF',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
        }
    },
    employeeDetails: {
        fontSize: '0.875rem',
        lineHeight: '1.5'
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
};
