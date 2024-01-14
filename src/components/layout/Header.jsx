// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Switch, Box } from '@mui/material';
import useGunUser from '../../context/useGunUser';

const Header = ({isDarkMode, toggleTheme}) => {
    const { user } = useGunUser(); 
    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <Switch checked={isDarkMode} onChange={toggleTheme} />
                    <Typography variant="body1" sx={{ marginLeft: 1 }}>
                        {isDarkMode ? 'Dark' : 'Light'}
                    </Typography>
                </Box>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                   MY DAPP CHAT
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 2, textAlign: 'left' }}>
                {user ? user.alias : "Not Logged In"}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
