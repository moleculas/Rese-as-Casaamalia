import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListSubheader
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { withRouter } from "react-router-dom";

//carga componentes

//importaciones acciones
import { logoutUsuarioAccion } from '../redux/usuarioDucks';

const Menu = (props) => {

    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const onEstem = useSelector(store => store.variablesApp.onEstem);

    //states     

    //funciones

    const tancarSessio = () => {
        dispatch(logoutUsuarioAccion());
        localStorage.clear();
        props.history.push('/login');
    };

    const handleClick = (link) => {
        switch (link) {
            case '/':
                props.history.push('/');
                break;
            case '/comptes':
                props.history.push('/comptes');
                break;
            default:
        }
    };

    return (
        <div>
            {logged ? (
                <List component='nav'
                    subheader={
                        <ListSubheader component="div">
                            Gestió ressenyes
                        </ListSubheader>
                    }>
                    <Fragment>
                        <ListItem
                            button
                            disabled={onEstem === 'inici' ? true : false}
                            onClick={() => handleClick('/')}
                            style={{ marginTop: -8 }}                            
                        >
                            <ListItemIcon>
                                <RateReviewIcon />
                            </ListItemIcon>
                            <ListItemText primary='Ressenyes' />
                        </ListItem>
                        <ListItem
                            button
                            disabled={onEstem === 'comptes' ? true : false}
                            onClick={() => handleClick('/comptes')}
                            style={{ marginTop: -8 }}
                        >
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary='Comptes' />
                        </ListItem>
                        <Divider />
                    </Fragment>
                </List>
            ) : null}
            <List component='nav'>
                <ListItem
                    button
                    onClick={tancarSessio}
                >
                    <ListItemIcon>
                        <LockOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary={logged ? ('Logout') : ('Login')} />
                </ListItem>
                <Divider />
            </List>
        </div>
    )
}

export default withRouter(Menu)