import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#666',
    },
};

const HomePage: React.FC = () => {
    return (
        <main style={styles.container}>
            <h1 style={styles.title}>
                Admin Dashboard
            </h1>
            <p style={styles.subtitle}>
                Velkommen til administrasjonspanelet.
            </p>
        </main>
    );
};

export default HomePage;
