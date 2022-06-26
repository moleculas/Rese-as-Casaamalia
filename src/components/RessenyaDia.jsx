import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckIcon from '@mui/icons-material/Check';
import Paper from '@mui/material/Paper';

//carga componentes
import { setRessenyesAGestionarAccion } from '../redux/appDucks';
import { actualizarRessenyaAccion } from '../redux/appDucks';

//estilos
import Clases from "../clases";

const RessenyaDia = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const ressenyesAGestionar = useSelector(store => store.variablesApp.ressenyesAGestionar);
    const usuarioActivo = useSelector(store => store.variablesUsuario.usuarioActivo);

    //states
    const [stateCopiat, setStateCopiat] = useState('Click per copiar');

    //useEffect   

    //funciones

    const handleChangeTextRessenya = (e) => {
        let elArrayRessenyes = [...ressenyesAGestionar];
        let elObjetoRessenya = { ...elArrayRessenyes[props.prId] };
        elObjetoRessenya = { ...elObjetoRessenya, ressenya: e.target.value };
        elArrayRessenyes[props.prId] = elObjetoRessenya;
        dispatch(setRessenyesAGestionarAccion(elArrayRessenyes));
    };

    const toSqlDatetime = () => {
        const date = new Date()
        const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        return dateWithOffest
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')
    };

    const handleChangeSwitchEstadoRessenyes = (id) => (e) => {
        if (e.target.checked) {
            const usuari = usuarioActivo.nombre.charAt(0).toUpperCase() + usuarioActivo.nombre.slice(1);
            const ressenyaAGuardar = {
                id: id,
                el_text: ressenyesAGestionar[props.prId].ressenya,
                usat: 'si',
                compte: ressenyesAGestionar[props.prId].compteId,
                dia: toSqlDatetime(),
                usuari: usuari,
                plataforma: ressenyesAGestionar[props.prId].plataforma
            };
            dispatch(actualizarRessenyaAccion('ressenyes', id, ressenyaAGuardar));
        };
    };

    return (
        <div>
            <Grid
                spacing={1}
                container
                direction="row"
                justifycontent="flex-start"
                alignItems="flex-start"
            >
                <Paper className={classes.ressenyaDia}>
                    <List>
                        <ListItem alignItems="flex-start" >
                            <Grid container mt={2}>
                                <Box
                                    color="primary.contrastText"
                                    className={ressenyesAGestionar[props.prId].usat === 'si' ? classes.boxStl3 : classes.boxStl2}
                                    sx={{ width: '100%', marginTop: -2 }}
                                >
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Stack direction={'row'} spacing={1}>
                                                <Avatar sx={{ bgcolor: 'secondary.main', width: 22, height: 22 }}><Typography color='secondary.contrastText' variant="body2">{props.prId + 1}</Typography></Avatar>
                                                {ressenyesAGestionar[props.prId].usat === 'si' ? (
                                                    <Stack direction={'row'} >
                                                        <Typography variant="body2" className={classes.textVerd} sx={{ marginRight: 1 }}>{'Ressenya per a ' + ressenyesAGestionar[props.prId].plataforma}</Typography>
                                                        <CheckIcon fontSize="small" className={classes.textVerd} />
                                                        <Typography variant="body2" className={classes.textVerd} >{'Gestionat el ' + ressenyesAGestionar[props.prId].dia + ' per: ' + ressenyesAGestionar[props.prId].usuari}</Typography>
                                                    </Stack>
                                                ) : (
                                                    <Link
                                                        href={ressenyesAGestionar[props.prId].plataforma === 'google' ? 'https://www.google.com/search?q=casa+amalia&rlz=1C1OPNX_esES958ES958&oq=casa+amalia' : 'https://www.tripadvisor.com/Restaurant_Review-g187497-d2002185-Reviews-Casa_Amalia_1950-Barcelona_Catalonia.html'}
                                                        target="_blank"
                                                        color="inherit"
                                                        underline="none"
                                                    >
                                                        <Typography variant="body2" >{'Ressenya per a ' + ressenyesAGestionar[props.prId].plataforma}</Typography>
                                                    </Link>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item mt={-1}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={ressenyesAGestionar[props.prId].usat === 'si' ? true : false}
                                                        color="secondary"
                                                        onChange={handleChangeSwitchEstadoRessenyes(ressenyesAGestionar[props.prId].id)}
                                                        disabled={ressenyesAGestionar[props.prId].usat === 'si' ? true : false}
                                                    />
                                                }
                                                label={<Typography variant="body2">Generat</Typography>}
                                                labelPlacement="start"
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Grid container mt={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} >
                                        <Stack direction={'row'} spacing={2} >
                                            <Badge
                                                overlap="circular"
                                                classes={{
                                                    badge: ressenyesAGestionar[props.prId].compteGenerat === 'si' ? classes.badgeVerd : classes.badgeVermell
                                                }}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                variant="dot"
                                            >
                                                <Avatar alt={ressenyesAGestionar[props.prId].compteNom} src={`comptes/` + ressenyesAGestionar[props.prId].compteImatge} style={{ width: 56, height: 56 }} />
                                            </Badge>
                                            <Stack direction={'column'} >
                                                <CopyToClipboard
                                                    text={ressenyesAGestionar[props.prId].compteNom}
                                                    onCopy={() => setStateCopiat('Copiat!')}>
                                                    <span>
                                                        <Tooltip title={stateCopiat} placement="top" onOpen={() => setStateCopiat('Click per copiar')}>
                                                            <Stack direction={'row'} spacing={1} >
                                                                <PersonIcon fontSize="small" />
                                                                <Typography variant="body1" ><b>{ressenyesAGestionar[props.prId].compteNom}</b></Typography>
                                                            </Stack>
                                                        </Tooltip>
                                                    </span>
                                                </CopyToClipboard>
                                                <CopyToClipboard
                                                    text={ressenyesAGestionar[props.prId].compteGmail}
                                                    onCopy={() => setStateCopiat('Copiat!')}>
                                                    <span>
                                                        <Tooltip title={stateCopiat} placement="top" onOpen={() => setStateCopiat('Click per copiar')}>
                                                            <Stack direction={'row'} spacing={1} sx={{ width: '100%' }}>
                                                                <EmailIcon fontSize="small" />
                                                                <Box sx={{
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    width: {
                                                                        xs: '15.5rem',
                                                                        sm: '15.5rem',
                                                                        md: '8rem',
                                                                        lg: '10rem',
                                                                        xl: '17rem'
                                                                    },
                                                                }}>
                                                                    <Typography noWrap variant="body2" >
                                                                        {ressenyesAGestionar[props.prId].compteGmail}
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                        </Tooltip>
                                                    </span>
                                                </CopyToClipboard>
                                                <CopyToClipboard
                                                    text={ressenyesAGestionar[props.prId].comptePass}
                                                    onCopy={() => setStateCopiat('Copiat!')}>
                                                    <span>
                                                        <Tooltip title={stateCopiat} placement="top" onOpen={() => setStateCopiat('Click per copiar')}>
                                                            <Stack direction={'row'} spacing={1} >
                                                                <KeyIcon fontSize="small" />
                                                                <Typography variant="body2" >{ressenyesAGestionar[props.prId].comptePass}</Typography>
                                                            </Stack>
                                                        </Tooltip>
                                                    </span>
                                                </CopyToClipboard>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} >
                                        <CopyToClipboard
                                            text={ressenyesAGestionar[props.prId].ressenya}
                                            onCopy={() => setStateCopiat('Copiat!')}>
                                            <span>
                                                <Tooltip
                                                    title={ressenyesAGestionar[props.prId].usat === 'si' ? '' : stateCopiat}
                                                    placement="top"
                                                    onOpen={() => setStateCopiat('Click per copiar')}>
                                                    <TextField
                                                        className={clsx(classes.form, classes.mb10)}
                                                        id="form-ressenya"
                                                        label="Ressenya"
                                                        value={ressenyesAGestionar[props.prId].ressenya}
                                                        fullWidth
                                                        color='secondary'
                                                        multiline
                                                        rows={5}
                                                        //InputProps={{ style: { fontSize: 13 }}}                                            I
                                                        variant="outlined"
                                                        onChange={handleChangeTextRessenya}
                                                        disabled={ressenyesAGestionar[props.prId].usat === 'si' ? true : false}
                                                    />
                                                </Tooltip>
                                            </span>
                                        </CopyToClipboard>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
            {/* {console.log(ressenyesAGestionar)} */}
        </div >
    )
}

export default RessenyaDia