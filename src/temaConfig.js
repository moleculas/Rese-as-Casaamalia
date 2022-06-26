import { createTheme } from "@mui/material";
//import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, red, green } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f1c761',
            light: '#f6dc9d',
            dark: '#e0b652'
        },
        secondary: blueGrey,
        error: red,
        background: {
            default: "#fafafa !important"
        }
    },
    typography: {
        h1: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h2: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h3: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h4: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h5: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        h6: {
            fontFamily: [
                'Montserrat',
            ].join(','),
        },
        //defecto
        body1: {
            fontFamily: [
                'Roboto',
            ].join(','),
            fontSize: '0.9rem',
            '@media (min-width:600px)': {
                fontSize: '1rem',
            }
        },
        body2: {
            fontFamily: [
                'Roboto',
            ].join(','),
            fontSize: '0.8rem',
            '@media (min-width:600px)': {
                fontSize: '0.9rem',
            }
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {

            },
        },
    },
})

export default theme;