import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../images/logo_header.png';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Hidden from '@mui/material/Hidden';

//estilos
import Clases from "../clases";

const Navbar = (props) => {

    const classes = Clases();   

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                    onClick={() => props.accionAbrir()}
                >
                    <MenuIcon />
                </IconButton>
                <Hidden only={'xs'}>
                    <Box className={classes.fonsLogo}>
                        <img src={logo} className={classes.logo} alt="logo" />
                    </Box>
                    <Typography className={classes.title} variant="h5">
                        Gestió Ressenyes Casa Amàlia
                    </Typography>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;