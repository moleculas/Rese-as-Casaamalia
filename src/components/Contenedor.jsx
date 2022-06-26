import React, { useState } from 'react';
import Constantes from "../constantes";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import Hidden from '@mui/material/Hidden';

//carga componentes
import Cajon from './Cajon';
import Inicio from './Inicio';
import Login from './Login';
import Comptes from './Comptes';

//estilos
import Clases from "../clases";

const subProduccio = Constantes.SUBDIRECTORI_PRODUCCIO;

const Contenedor = () => {

    const classes = Clases();
    let baseName;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        baseName = '';
    } else {
        baseName = subProduccio;
    };

    //states

    const [abrir, setAbrir] = useState(false);

    //funciones    

    const accionAbrir = () => {
        setAbrir(!abrir)
    };

    return (
        <div className={classes.rootCont}>
            <CssBaseline />
            <Router basename={baseName} >
                <Navbar accionAbrir={accionAbrir} />
                <Hidden only={'xs'}>
                    <Cajon
                        variant="permanent"
                        open={true}
                    />
                </Hidden>
                <Hidden smUp>
                    <Cajon
                        variant="temporary"
                        open={abrir}
                        onClose={accionAbrir}
                    />
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Switch>
                        <Route path="/" exact>
                            <Inicio />
                        </Route>
                        <Route path="/login" >
                            <Login />
                        </Route>
                        <Route path="/comptes" >
                            <Comptes />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Contenedor

