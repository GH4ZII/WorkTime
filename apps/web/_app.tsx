// apps/web/pages/_app.tsx
import * as React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './shared-theme/AppTheme';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={ theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
