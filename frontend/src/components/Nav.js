import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Nav(props) {
    
    const mainOpen =() =>{
        props.mainOpen();
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography style={{ cursor: 'pointer' }} onClick={() =>mainOpen()} variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        어디야
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Nav;