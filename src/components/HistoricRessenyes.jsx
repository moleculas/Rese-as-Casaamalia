import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

//carga componentes

//estilos
import Clases from "../clases";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.3, 0.3, 0.3, 0),
        fontSize: 14,
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '12ch',
        [theme.breakpoints.up('xl')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const HistoricRessenyes = (props) => {

    const classes = Clases();
    const dispatch = useDispatch();
    const historicRessenyes = useSelector(store => store.variablesApp.historicRessenyes);
    const arrayComptes = useSelector(store => store.variablesApp.arrayComptes);

    //states  
    const [arrayRessenyesPerDia, setArrayRessenyesPerDia] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [arrayRessenyesPerDiaOriginal, setArrayRessenyesPerDiaOriginal] = useState([]);
    const [cercaActiva, setCercaActiva] = useState(false);
    const [senseResultats, setSenseResultats] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    //useEffect   

    useEffect(() => {
        if (historicRessenyes.length > 0) {
            let arrayPerDia = [];
            historicRessenyes.forEach((ressenya, index) => {
                const myDiaRessenyaSplitted = ressenya.dia.split(" ");
                const dia = myDiaRessenyaSplitted[0];
                if (arrayPerDia[arrayPerDia.length - 1]) {
                    if (arrayPerDia[arrayPerDia.length - 1][0] === dia) {
                        arrayPerDia[arrayPerDia.length - 1][1].push(ressenya);
                    } else {
                        arrayPerDia.push([dia, [ressenya]]);
                    };
                } else {
                    arrayPerDia.push([dia, [ressenya]]);
                };
            });
            setArrayRessenyesPerDia(arrayPerDia);
            setArrayRessenyesPerDiaOriginal(arrayPerDia);
        }
    }, [historicRessenyes]);

    useEffect(() => {
        if (searchTerm !== '') {
            const delayDebounceFn = setTimeout(() => {
                gestionaCerca();
            }, 500);
            return () => clearTimeout(delayDebounceFn)
        } else {
            setArrayRessenyesPerDia(arrayRessenyesPerDiaOriginal);
            setSenseResultats(false);
            setCercaActiva(false);
            setExpanded(false);
        };
    }, [searchTerm]);

    //funciones

    const handleChangeExpanded = (panel) => (event, isExpanded) => {
        setCercaActiva(false);
        setExpanded(isExpanded ? panel : false);
    };

    const gestionaCerca = () => {
        if (searchTerm) {
            setSenseResultats(false);
            let arrayPerDia = [];
            const cercaMin = searchTerm.toLowerCase();
            arrayRessenyesPerDiaOriginal.forEach((arrayRessenyes) => {
                arrayRessenyes[1].forEach((ressenya) => {
                    const dia = arrayRessenyes[0];
                    let textOriginalMin = ressenya.el_text.toLowerCase();
                    let laRessenya = {};
                    let textSubst = '';
                    let textAmbStyles = '';
                    if (textOriginalMin.indexOf(cercaMin) > -1) {
                        textAmbStyles = '<span style="background-color: #fff000">' + cercaMin + '</span>';
                        textSubst = textOriginalMin.replace(cercaMin, textAmbStyles);
                        laRessenya = { ...ressenya, el_text: textSubst };
                        if (arrayPerDia[arrayPerDia.length - 1]) {
                            if (arrayPerDia[arrayPerDia.length - 1][0] === dia) {
                                arrayPerDia[arrayPerDia.length - 1][1].push(laRessenya);
                            } else {
                                arrayPerDia.push([dia, [laRessenya]]);
                            };
                        } else {
                            arrayPerDia.push([dia, [laRessenya]]);
                        };
                    }
                });
            });
            if (arrayPerDia.length > 0) {
                setCercaActiva(true);
                setArrayRessenyesPerDia(arrayPerDia);
            } else {
                setSenseResultats(true);
                setArrayRessenyesPerDia([]);
            };
        };
    };

    const retornaAccordionRessenyesArray = (arrayRessenyes, index) => {
        return (
            <Accordion key={'panel' + index} expanded={cercaActiva ? true : expanded === 'panel' + index} onChange={handleChangeExpanded('panel' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id={'accordion' + index}
                >
                    <Typography variant="body2">{'Dia: ' + arrayRessenyes[0]}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ marginTop: -1 }}>
                    {arrayRessenyes[1].map((ressenya, indexR) => {
                        return (retornaAccordionRessenyes(ressenya, indexR))
                    })}
                </AccordionDetails>
            </Accordion>
        )
    };

    const retornaAccordionRessenyes = (ressenya, index) => {
        const compte = arrayComptes.filter(elCompte => elCompte['id'] === parseInt(ressenya.compte));
        return (
            <Box key={'item' + index} p={1} mb={1} sx={{ width: '100%' }}>
                <Chip
                    avatar={<Avatar alt={compte[0].nom} src={`comptes/` + compte[0].imatge} />}
                    label={compte[0].gmail}
                    variant="outlined"
                    sx={{ width: '100%', justifyContent: 'flex-start', marginBottom: 1.5 }}
                />
                <FormControl fullWidth >
                    <label className={classes.labelRessenyaHistoric}>Ressenya</label>
                    <Box className={classes.ressenyaHistoric}>
                        <div dangerouslySetInnerHTML={{ __html: ressenya.el_text }} />
                    </Box>
                </FormControl>
            </Box>
        )
    };

    return (
        <div>
            <Box
                mt={2}
                color="secondary.contrastText"
                bgcolor="secondary.main"
                className={classes.boxStl}
                sx={{ width: '100%' }}
            >
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Stack direction={'row'} spacing={1} >
                            <EventRepeatIcon sx={{ marginTop: -0.3 }} />
                            <Typography variant="body2">Històric ressenyes</Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon fontSize="small" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Cerca…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Search>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={2} pr={{ xs: 2, sm: 2, md: 2, lg: 2 }} className={classes.scrollable}
                sx={{
                    height: {
                        xs: 'auto',
                        sm: 'auto',
                        md: props.prHeigt - 130,
                        lg: props.prHeigt - 130,
                        xl: props.prHeigt - 130
                    }
                }}>
                <Grid
                    spacing={1}
                    container
                    direction="row"
                    justifycontent="flex-start"
                    alignItems="flex-start"
                >
                    <Box sx={{ padding: 2, width: '100%' }}>
                        {senseResultats ? (
                            <Alert severity="error" sx={{ marginBottom: 1 }}>No hi ha resultats</Alert>
                        ) : null}
                        {arrayRessenyesPerDia.length > 0 ? (
                            arrayRessenyesPerDia.map((arrayRessenyes, index) => {
                                return (retornaAccordionRessenyesArray(arrayRessenyes, index))
                            })
                        ) : null}
                    </Box>
                </Grid>
            </Box >
            {/* {console.log(arrayRessenyesPerDia)} */}
        </div >
    )
}

export default HistoricRessenyes