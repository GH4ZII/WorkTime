// apps/web/pages/_app.tsx

import * as React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCache } from '@emotion/cache';
import createEmotionCache from "./utils/createEmotionCache";
// Et enkelt, sentralt tema som kan utvides senere
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // En standard blåfarge
        },
        secondary: {
            main: '#dc004e', // En standard rødfarge
        },
    },
});

// Denne koden er for å håndtere server-side rendering av stiler
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline normaliserer stiler på tvers av nettlesere */}
            <CssBaseline />
            {/* Component representerer den aktive siden (f.eks. login.tsx) */}
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
