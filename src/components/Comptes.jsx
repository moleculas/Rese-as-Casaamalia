import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

//carga componentes

//importaciones acciones
import { obtenerComptesAccion } from '../redux/appDucks';
import { actualizarCompteAccion } from '../redux/appDucks';
import { reseteaExitoAccion } from '../redux/appDucks';
import { obtenerRessenyesAccion } from '../redux/appDucks';
import { setOnEstemAccion } from '../redux/appDucks';
import { setAlertaAccion } from '../redux/appDucks';

//estilos
import Clases from "../clases";

const getHeightScrollable = () => (window.innerHeight - 100) || (document.documentElement.clientHeight - 100) || (document.body.clientHeight - 100);

//snackbar y alert
//snackbar y alert
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Comptes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const logged = useSelector(store => store.variablesUsuario.activo);
    const arrayComptes = useSelector(store => store.variablesApp.arrayComptes);
    const errorDeCargaComptes = useSelector(store => store.variablesApp.errorDeCargaComptes);
    const openLoading = useSelector(store => store.variablesApp.loadingApp);
    const exitoActualizacionCompte = useSelector(store => store.variablesApp.exitoActualizacionCompte);
    const arrayRessenyes = useSelector(store => store.variablesApp.arrayRessenyes);
    const alerta = useSelector(store => store.variablesApp.alerta);

    //states
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        document.body.classList.add(classes.sinScroll);
    }, []);

    useEffect(() => {
        dispatch(setOnEstemAccion('comptes'));
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable());
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (arrayComptes.length === 0 || exitoActualizacionCompte) {
            dispatch(obtenerComptesAccion('comptes'));
            if (exitoActualizacionCompte) {
                dispatch(reseteaExitoAccion());
            };
        };
    }, [arrayComptes, exitoActualizacionCompte]);

    useEffect(() => {
        if (arrayRessenyes.length === 0) {
            dispatch(obtenerRessenyesAccion('ressenyes'));
        };
    }, [arrayRessenyes]);

    useEffect(() => {
        if (errorDeCargaComptes) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Error de connexió amb la base de dades.",
                tipo: 'error'
            }));
        }
    }, [errorDeCargaComptes]);

    useEffect(() => {
        if (exitoActualizacionCompte) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Compte generat correctament.",
                tipo: 'success'
            })); 
        }
    }, [exitoActualizacionCompte]);

    //funciones

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        dispatch(setAlertaAccion({
            abierto: false,
            mensaje: '',
            tipo: 'success'
        }));
    };

    const handleChangeSwitchEstadoComptes = (id) => (e) => {
        dispatch(actualizarCompteAccion('comptes', id, e.target.checked));       
    };

    const retornaRessenyesFetes = (id) => {
        if (arrayRessenyes.length > 0) {
            let arrayTrobats = [];
            arrayRessenyes.forEach((ressenya) => {
                if (parseInt(ressenya.compte) === id) {
                    arrayTrobats.push(ressenya.id);
                };
            });
            return arrayTrobats.length
        };
    };

    const retornaComptes = (compte, index) => {
        return (
            <Grid container key={'listaComptes' + index}>
                <Grid item xs={12} sm={12} md={12} lg={8} >
                    <Paper className={classes.casillaCompteBox}>
                        <ListItem alignItems="flex-start" className={classes.casillaCompte}>
                            <ListItemAvatar>
                                <Badge
                                    overlap="circular"
                                    classes={{
                                        badge: compte.generat === 'si' ? classes.badgeVerd : classes.badgeVermell
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar alt={compte.nom} src={`comptes_imatges/` + compte.imatge} style={{ width: 56, height: 56 }} />
                                </Badge>
                            </ListItemAvatar>
                            <Box
                                mt={1}
                                ml={2}
                                sx={{ width: '100%' }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="center"
                                    alignItems="center">
                                    <Grid item xs={12} sm={10} md={10} lg={10}>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            color="text.primary"
                                        >
                                            {compte.nom}
                                        </Typography>
                                        <Grid container>
                                            <Stack direction={'row'} spacing={1}>
                                                <Grid>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Data Naix:
                                                    </Typography>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {` ` + compte.naixament}
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Compte:
                                                    </Typography>
                                                    <Typography
                                                        sx={{ wordBreak: 'break-word' }}
                                                        variant="body2"
                                                        component="span"
                                                        color="text.secondary"
                                                    >
                                                        {` ` + compte.gmail}
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Pass:
                                                    </Typography>
                                                    <Typography
                                                        sx={{ wordBreak: 'break-word' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {` ` + compte.pass}
                                                    </Typography>
                                                </Grid>
                                            </Stack>
                                        </Grid>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Ressenyes fetes:
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {` ` + retornaRessenyesFetes(compte.id)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={1} md={1} lg={1}></Grid>
                                    <Grid item xs={12} sm={1} md={1} lg={1}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={compte.generat === 'si' ? true : false}
                                                        color="secondary"
                                                        onChange={handleChangeSwitchEstadoComptes(compte.id)}
                                                        disabled={compte.generat === 'si' ? true : false}
                                                    />
                                                }
                                                label={<Typography variant="body2">Generat</Typography>}
                                                labelPlacement="start"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </ListItem>
                    </Paper>
                </Grid>
            </Grid>
        )
    };

    return (
        <div>
            <Backdrop className={classes.loading} open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid
                spacing={1}
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={12} md={12} lg={12}>
                    <Box pr={{ xs: 2, sm: 2, md: 2, lg: 2 }} className={classes.scrollable} style={{ height: heightScrollable }}>
                        <List>
                            {arrayComptes.map((compte, index) => (
                                retornaComptes(compte, index)
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={alerta.abierto} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alerta.tipo} onClose={handleCloseSnack}>
                    {alerta.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(arrayComptes)} */}
        </div>
    )
}

export default withRouter(Comptes)