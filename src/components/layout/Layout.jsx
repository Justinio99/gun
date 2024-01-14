import React, { useState } from 'react'
import {darkTheme, lightTheme} from '../../theme';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';

function Layout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
         <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
          <Container style={{ marginTop: '20px' }}>
          {children}
          </Container>
        </ThemeProvider>
    )
}

export default Layout
