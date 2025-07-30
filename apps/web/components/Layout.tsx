import React from 'react'
import { Sidebar } from './Sidebar'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={layoutStyles.container}>
        <Sidebar />
        <main style={layoutStyles.main}>{children}</main>
    </div>
)

const layoutStyles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
    },
    main: {
        marginLeft: 240,
        padding: '2rem',
        width: 'calc(100% - 240px)',
        minHeight: '100vh',
        backgroundColor: '#F3F4F6',
    },
}
