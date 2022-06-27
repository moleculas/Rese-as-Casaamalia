import { makeStyles } from "@mui/styles";
import { amber, blueGrey, green, lime, indigo, red, grey, blue, yellow, teal } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

const Clases = makeStyles((theme) => ({
    //contenedor
    rootCont: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    //navbar   
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: `none !important`,
        },
    },
    simpleButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px) !important`,
            marginLeft: 240,
        },
    },
    logo: {
        width: 30
    },
    fonsLogo: {
        borderRadius: 60,
        backgroundColor: alpha(theme.palette.common.white, 0.55),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        marginRight: 15,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    //cajon
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: theme.mixins.toolbar,
    //loading
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    root11: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
    },
    root: {
        width: '100%',
    },
    //tabs
    root2: {
        flexGrow: 1
    },
    //form
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    form2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.2),
        },
    },
    formTipo: {
        display: 'flex',
        marginRight: -10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    formTipo2: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    formInput: {
        marginBottom: '10px',
    },
    //tabla   
    scrollable: {
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'thin',
        scrollbarColor: '#B7B7B7 transparent',
        '&::-webkit-scrollbar': {
            width: 6,
            height: 6,
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            marginTop: 27, //modificador
            marginBottom: 10, //modificador
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 6,
            backgroundColor: '#B7B7B7',
            minHeight: 24,
            minWidth: 24,
        },
        '&::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#adadad',
        },
        '&::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#adadad',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#adadad',
        },
        '&::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
        },
    },
    sinScroll: {
        overflowY: 'hidden !important',
    },
    conScroll: {
        overflowY: 'auto !important',
    },
    blanc: {
        color: 'white'
    },
    mb15: {
        marginBottom: 15,
    },
    mb10: {
        marginBottom: 10,
    },
    mb5: {
        marginBottom: 5,
    },
    mb25: {
        marginBottom: 25,
    },
    mb20: {
        marginBottom: 20,
    },
    mt15: {
        marginTop: 15,
    },
    mt10: {
        marginTop: 10,
    },
    mt20: {
        marginTop: 20,
    },
    mt5: {
        marginTop: 5,
    },
    mt_5: {
        marginTop: -5,
    },
    mt_25: {
        marginTop: -25,
    },
    mr15: {
        marginRight: 15,
    },
    mr10: {
        marginRight: 10,
    },
    displayNone: {
        display: 'none !important'
    },
    displayBlock: {
        display: 'block !important'
    },
    alignRight: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
    },
    centrado: {
        minHeight: "20vh",
        display: "flex",
        alignItems: "center",
    },
    fuentePequena: {
        fontSize: '0.7rem'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    inline: {
        display: 'inline'
    },
    cursorDefault: {
        cursor: 'default'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    colorText: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    floatRight: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    casillaCompte: {
        width: '100%',
        marginBottom: 8,
        marginRight: 10,
        paddingRight: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: `${yellow[50]} !important`,
        },
    },
    casillaCompteBox: {
        transition: 'transform ease 300ms',
        "&:hover": {
            transform: 'translate(0, -2px)'
        },
    },
    sombraBox: {
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    },
    boxStl: {
        minHeight: 43,
        height: 'auto',
        paddingTop: 9,
        paddingLeft: 10,
        paddingBottom: 9,
        paddingRight: 8,
    },
    boxStl2: {
        height: 'auto',
        paddingTop: 6,
        paddingLeft: 5,
        paddingRight: 8,
        backgroundColor: `${blueGrey[50]} !important`,
    },
    boxStl3: {
        height: 'auto',
        paddingTop: 6,
        paddingLeft: 5,
        paddingRight: 8,
        backgroundColor: `${green[50]} !important`,
    },
    ressenyaDia: {
        height: 'auto',
        width: '100%',
        padding: 10,
        marginBottom: 15,
        transition: 'transform ease 300ms',
        "&:hover": {
            transform: 'translate(0, -2px)'
        },
    },
    badgeVerd: {
        backgroundColor: `${green[400]} !important`,
        color: `${green[400]} !important`,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        right: '1%',
        top: 40,
        '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    badgeVermell: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.error.dark,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        right: '1%',
        top: 40,
        '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
    textVerd: {
        color: `${green[600]} !important`
    },
    ressenyaHistoric: {
        fontSize: 13,
        height: 'auto',
        color: 'rgba(0, 0, 0, 0.38)',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor:  'rgba(0, 0, 0, 0.28)',
        padding: 12,
        borderRadius: 4,      
    },
    labelRessenyaHistoric: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.38)',
        letterSpacing: 0,       
        marginBottom: -10,
        backgroundColor: '#ffffff',
        zIndex: 10,
        width: 65,
        marginLeft: 15,
        paddingLeft: 5
    }
}), { index: 1 });

export default Clases;