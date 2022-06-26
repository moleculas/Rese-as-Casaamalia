import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { withRouter } from "react-router-dom";

//estilos
import Clases from "../clases";

//importaciones acciones
import { ingresoUsuarioAccion } from '../redux/usuarioDucks';

//snackbar y alert
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const errorDeAcceso = useSelector(store => store.variablesUsuario.errorDeAcceso);
    const logged = useSelector(store => store.variablesUsuario.activo);

    //useEffect
    useEffect(() => {
        if (logged) {
            props.history.push('/')
        }
    }, [logged, props.history]);

    useEffect(() => {
        if (errorDeAcceso) {
            setAlert({
                mensaje: "Dades incorrectes. Torna a provar.",
                tipo: 'error'
            })
            setOpenSnack(true);
            setValuesForm({
                nom: '',
                password: '',
                showPassword: false,
            });
        }
    }, [errorDeAcceso]);

    //alert
    const [openSnack, setOpenSnack] = useState(false);
    const [alert, setAlert] = useState({});

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    //form
    const [valuesForm, setValuesForm] = useState({
        nom: '',
        password: '',
        showPassword: false,
    });

    //funciones
    const handleChangeForm = (prop) => (event) => {
        setValuesForm({ ...valuesForm, [prop]: event.target.value });
    };

    const handleClickShowPasswordForm = () => {
        setValuesForm({ ...valuesForm, showPassword: !valuesForm.showPassword });
    };

    const handleMouseDownPasswordForm = (event) => {
        event.preventDefault();
    };

    const procesarDatos = (e) => {
        e.preventDefault();
        if (!valuesForm.nom.trim() || !valuesForm.password.trim()) {
            setAlert({
                mensaje: "Completa el formulari correctament, falten dades.",
                tipo: 'error'
            })
            setOpenSnack(true)
            return
        };
        dispatch(ingresoUsuarioAccion(valuesForm.nom, valuesForm.password));
    };

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                style={{ minHeight: '60vh' }}
            >
                <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={3}>
                        <Box
                            p={5}
                            mt={2}
                            textAlign="center"

                        >
                            <form onSubmit={procesarDatos}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                    fullWidth
                                    color="secondary"
                                >
                                    <InputLabel>Usuari</InputLabel>
                                    <OutlinedInput                                        
                                        className={classes.formInput}
                                        id="form-usuario"
                                        value={valuesForm.nom}
                                        onChange={handleChangeForm('nom')}   
                                        label="Usuari"
                                    />
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={classes.form}
                                    size="small"
                                    fullWidth
                                    color="secondary"
                                >
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput                                        
                                        className={classes.formInput}
                                        id="form-password"
                                        type={valuesForm.showPassword ? 'text' : 'password'}
                                        value={valuesForm.password}
                                        onChange={handleChangeForm('password')}                                      
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordForm}
                                                    onMouseDown={handleMouseDownPasswordForm}
                                                >
                                                    {valuesForm.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>                              
                                <Button
                                    fullWidth
                                    className={classes.formButton}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                >
                                    Login
                                </Button>

                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={12000} onClose={handleCloseSnack}>
                <Alert severity={alert.tipo} onClose={handleCloseSnack} sx={{ width: '100%' }}>
                    {alert.mensaje}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default withRouter(Login)