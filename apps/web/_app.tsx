// apps/web/pages/_app.tsx

import * as React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCache } from '@emotion/cache';
import createEmotionCache from "./utils/createEmotionCache";
import { ChatProvider } from './context/ChatContext';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

// Denne koden er for å håndtere server-side rendering av stiler
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {Component, pageProps, emotionCache = clientSideEmotionCache} = props;

    return (
        <ThemeProvider theme={theme}>
            <ChatProvider>
                <CssBaseline />
                <Component {...pageProps} />
            </ChatProvider>
        </ThemeProvider>
    );
}
