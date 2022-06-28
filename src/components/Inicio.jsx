import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constantes from "../constantes";
import useIntersection from "../useIntersection";
import { withRouter } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

//carga componentes
import RessenyaDia from './RessenyaDia';
import HistoricRessenyes from './HistoricRessenyes';

//estilos
import Clases from "../clases";

//importaciones acciones
import { obtenerRessenyesAccion } from '../redux/appDucks';
import { obtenerComptesAccion } from '../redux/appDucks';
import { setRessenyesAGestionarAccion } from '../redux/appDucks';
import { reseteaExitoAccion } from '../redux/appDucks';
import { setOnEstemAccion } from '../redux/appDucks';
import { setHistoricRessenyesAccion } from '../redux/appDucks';
import { setAlertaAccion } from '../redux/appDucks';

const randomMesos = Constantes.RANDOM_MESOS;

const getHeightScrollable = () => (window.innerHeight - 100) || (document.documentElement.clientHeight - 100) || (document.body.clientHeight - 100);

//snackbar y alert
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Inicio = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const view = useRef();
    const inViewport = useIntersection(view, "0px");
    if (inViewport.estado && !inViewport.completado) {
        window.location.reload(false);
    };
    const logged = useSelector(store => store.variablesUsuario.activo);
    const openLoading = useSelector(store => store.variablesApp.loadingApp);
    const arrayRessenyes = useSelector(store => store.variablesApp.arrayRessenyes);
    const errorDeCargaRessenyes = useSelector(store => store.variablesApp.errorDeCargaRessenyes);
    const exitoActualizacionRessenya = useSelector(store => store.variablesApp.exitoActualizacionRessenya);
    const arrayComptes = useSelector(store => store.variablesApp.arrayComptes);
    const ressenyesAGestionar = useSelector(store => store.variablesApp.ressenyesAGestionar);
    const alerta = useSelector(store => store.variablesApp.alerta);

    //states
    const [heightScrollable, setHeightScrollable] = useState(getHeightScrollable());
    const [faltants, setFaltants] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    const esMobil = useMediaQuery(theme => theme.breakpoints.down('md'));

    //useEffect

    useEffect(() => {
        if (!logged) {
            props.history.push('/login')
        }
    }, [logged, props.history]);

    useEffect(() => {
        if (esMobil) {
            document.body.classList.add(classes.conScroll);
        } else {
            document.body.classList.add(classes.sinScroll);
        };
    }, []);

    useEffect(() => {
        dispatch(setOnEstemAccion('inici'));
        const resizeListener = () => {
            setHeightScrollable(getHeightScrollable());
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (arrayComptes.length === 0) {
            dispatch(obtenerComptesAccion('comptes'));
        };
    }, [arrayComptes]);

    useEffect(() => {
        if (arrayRessenyes.length === 0 || exitoActualizacionRessenya) {
            dispatch(obtenerRessenyesAccion('ressenyes'));
            if (exitoActualizacionRessenya) {
                dispatch(reseteaExitoAccion());
            };
        };
        calculFaltants();
    }, [arrayRessenyes, exitoActualizacionRessenya]);

    useEffect(() => {
        if (alerta.abierto) {
            setAlert({
                mensaje: alerta.mensaje,
                tipo: alerta.tipo
            })
            setOpenSnack(true);
        }
    }, [alerta]);

    useEffect(() => {
        if (errorDeCargaRessenyes) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Error de connexió amb la base de dades.",
                tipo: 'error'
            }));
        }
    }, [errorDeCargaRessenyes]);

    useEffect(() => {
        if (exitoActualizacionRessenya) {
            dispatch(setAlertaAccion({
                abierto: true,
                mensaje: "Ressenya generada correctament.",
                tipo: 'success'
            }));
        }
    }, [exitoActualizacionRessenya]);

    //funciones

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpenSnack(false);
        dispatch(setAlertaAccion({
            abierto: false,
            mensaje: '',
            tipo: ''
        }));
    };

    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    };

    const checkMateixDia = (elDia) => {
        const myDiaRessenyaSplitted = elDia.split(" ");
        const dia = myDiaRessenyaSplitted[0];
        const date = new Date();
        const month = pad2(date.getMonth() + 1);
        const day = pad2(date.getDate());
        const year = date.getFullYear();
        const formattedDate = year + "-" + month + "-" + day;
        if (dia === formattedDate) {
            return true
        } else {
            return false
        };
    };

    const calculFaltants = () => {
        let arrayTornat = [];
        let elUltimCompte = 1;
        let lesRessenyesPendents = [];
        let lesHistoricRessenyes = [];
        let objetoRessenya = {};
        if (arrayRessenyes.length > 0) {
            arrayRessenyes.forEach((ressenya, index) => {
                if (ressenya.usat === 'si') {
                    const esMateixDia = checkMateixDia(ressenya.dia);
                    if (esMateixDia) {
                        objetoRessenya = { ...ressenya, mateixDia: true };
                        lesRessenyesPendents.push(objetoRessenya);
                    } else {
                        elUltimCompte = parseInt(ressenya.compte) + 1;
                    };
                    lesHistoricRessenyes.push(ressenya);
                } else {
                    arrayTornat.push(ressenya.id);
                    objetoRessenya = { ...ressenya, mateixDia: false };
                    lesRessenyesPendents.push(ressenya);
                };
            });
        };
        setFaltants(arrayTornat.length);
        if (arrayComptes.length > 0) {
            retornaRessenyesDia(lesRessenyesPendents, elUltimCompte);
            if (lesHistoricRessenyes.length > 0) {
                dispatch(setHistoricRessenyesAccion(lesHistoricRessenyes));
            };
        };
    };

    const laData = () => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today = new Date();
        const data = today.toLocaleDateString("ca-ES", options);
        return data;
    };

    const retornaRessenyesDia = (lesRessenyesPendents, elUltimCompte) => {
        const data = new Date();
        const dia = data.getDate();
        let esParell = false;
        if (dia % 2 === 0) {
            esParell = true;
        };
        const numRessenyes = randomMesos[dia - 1];
        let arrayRessenyes = [];
        let objetoRessenya = {};
        for (let i = 0; i < numRessenyes; i++) {
            const compteId = (elUltimCompte % 90) + i;
            let compte;
            if (lesRessenyesPendents[i].mateixDia) {
                compte = arrayComptes.filter(elCompte => elCompte['id'] === parseInt(lesRessenyesPendents[i].compte));
            } else {
                compte = arrayComptes.filter(elCompte => elCompte['id'] === compteId);
            };
            objetoRessenya = {
                plataforma: '',
                compteId: compte[0].id,
                compteNom: compte[0].nom,
                compteGmail: compte[0].gmail,
                comptePass: compte[0].pass,
                compteImatge: compte[0].imatge,
                compteGenerat: compte[0].generat,
                ressenya: lesRessenyesPendents[i].el_text,
                numCar: lesRessenyesPendents[i].el_text.length,
                id: lesRessenyesPendents[i].id,
                usat: lesRessenyesPendents[i].usat,
                dia: lesRessenyesPendents[i].dia,
                usuari: lesRessenyesPendents[i].usuari,
            };
            arrayRessenyes.push(objetoRessenya);
        };
        dispatch(setRessenyesAGestionarAccion(arrayRessenyes));
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
                ref={view}
            >
                <Box p={2}>
                    <Chip label={`Falten: ` + faltants + ` ressenyes per gestionar`} color={(arrayRessenyes > 0 && faltants > 0) ? 'error' : (arrayRessenyes > 0 && faltants === 0) ? 'success' : 'error'} />
                </Box>
                <Grid
                    spacing={2}
                    container
                    direction="row"
                    justifycontent="flex-start"
                    alignItems="flex-start"
                    p={2}
                >
                    <Grid item xs={12} sm={12} md={8} lg={8} >
                        <Box
                            mt={2}
                            color="secondary.contrastText"
                            bgcolor="secondary.main"
                            className={classes.boxStl}
                            sx={{ width: '100%' }}
                        >
                            <Stack direction={'row'} spacing={1} >
                                <CalendarMonthIcon sx={{ marginTop: -0.3 }} />
                                <Typography variant="body2">{`Ressenyes a gestionar: ` + laData()}</Typography>
                            </Stack>
                        </Box >
                        <Box mt={2} pr={{ xs: 2, sm: 2, md: 2, lg: 2 }} className={classes.scrollable}
                            sx={{
                                height: {
                                    xs: 'auto',
                                    sm: 'auto',
                                    md: heightScrollable - 130,
                                    lg: heightScrollable - 130,
                                    xl: heightScrollable - 130
                                }
                            }}>
                            {ressenyesAGestionar.map((ressenya, index) => {
                                return <RessenyaDia key={index} prId={index} />
                            })}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <HistoricRessenyes prHeigt={heightScrollable} />
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
            {/* {console.log(esMobil)} */}
        </div>
    )
}

export default withRouter(Inicio)