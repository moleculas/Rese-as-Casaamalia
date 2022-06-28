import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;

const dataInicial = {
    loadingApp: false,
    arrayComptes: [],
    errorDeCargaComptes: false,
    exitoActualizacionCompte: false,
    arrayRessenyes: [],
    errorDeCargaRessenyes: false,
    exitoActualizacionRessenya: false,
    ressenyesAGestionar: [],
    historicRessenyes: [],
    onEstem: null,
    alerta: {
        abierto: false,
        mensaje: '',
        tipo: ''
    },
}

//types
const LOADING_APP = 'LOADING_APP';
const OBTENER_COMPTES_EXITO = 'OBTENER_COMPTES_EXITO';
const ERROR_DE_CARGA_COMPTES = 'ERROR_DE_CARGA_COMPTES';
const ACTUALIZAR_COMPTE_EXITO = 'ACTUALIZAR_COMPTE_EXITO';
const RESETEA_EXITO = 'RESETEA_EXITO';
const OBTENER_RESSENYES_EXITO = 'OBTENER_RESSENYES_EXITO';
const ERROR_DE_CARGA_RESSENYES = 'ERROR_DE_CARGA_RESSENYES';
const ACTUALIZAR_RESSENYA_EXITO = 'ACTUALIZAR_RESSENYA_EXITO';
const SET_RESSENYESAGESTIONAR = 'SET_RESSENYESAGESTIONAR';
const SET_ONESTEM = 'SET_ONESTEM';
const SET_HISTORICRESSENYES = 'SET_HISTORICRESSENYES ';
const SET_ALERTA = 'SET_ALERTA';

//reducer
export default function appReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_APP:
            return { ...state, loadingApp: true }
        case OBTENER_COMPTES_EXITO:
            return { ...state, arrayComptes: action.payload.array, errorDeCargaComptes: action.payload.errorDeCargaComptes, loadingApp: false }
        case ERROR_DE_CARGA_COMPTES:
            return { ...state, errorDeCargaComptes: true, loadingApp: false }
        case ACTUALIZAR_COMPTE_EXITO:
            return { ...state, errorDeCargaComptes: false, exitoActualizacionCompte: true }
        case RESETEA_EXITO:
            return { ...state, exitoActualizacionCompte: false, exitoActualizacionRessenya: false }
        case OBTENER_RESSENYES_EXITO:
            return { ...state, arrayRessenyes: action.payload.array, errorDeCargaRessenyes: action.payload.errorDeCargaRessenyes, loadingApp: false }
        case ERROR_DE_CARGA_RESSENYES:
            return { ...state, errorDeCargaRessenyes: true, loadingApp: false }
        case ACTUALIZAR_RESSENYA_EXITO:
            return { ...state, errorDeCargaRessenyes: false, exitoActualizacionRessenya: true }
        case SET_RESSENYESAGESTIONAR:
            return { ...state, ressenyesAGestionar: action.payload.array }
        case SET_ONESTEM:
            return { ...state, onEstem: action.payload.valor }
        case SET_HISTORICRESSENYES:
            return { ...state, historicRessenyes: action.payload.array }
        case SET_ALERTA:
            return { ...state, alerta: action.payload.objeto }
        default:
            return { ...state }
    }
}

//acciones

export const setAlertaAccion = (objeto) => (dispatch, getState) => {
    dispatch({
        type: SET_ALERTA,
        payload: {
            objeto: objeto
        }
    });
};

export const setHistoricRessenyesAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_HISTORICRESSENYES,
        payload: {
            array: array
        }
    });
};

export const setOnEstemAccion = (valor) => (dispatch, getState) => {
    dispatch({
        type: SET_ONESTEM,
        payload: {
            valor: valor
        }
    });
};

export const setRessenyesAGestionarAccion = (array) => (dispatch, getState) => {
    dispatch({
        type: SET_RESSENYESAGESTIONAR,
        payload: {
            array: array
        }
    });
};

export const obtenerComptesAccion = (objeto) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        let apiUrl = rutaApi + "listar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        respuesta.sort((a, b) => a.nom.localeCompare(b.nom));
        dispatch({
            type: OBTENER_COMPTES_EXITO,
            payload: {
                array: respuesta,
                errorDeCargaComptes: false
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_COMPTES
        })
    }
};

export const actualizarCompteAccion = (objeto, id, estado) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    let elEstado;
    if (estado) {
        elEstado = 'si';
    } else {
        elEstado = 'no';
    };
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("estado", elEstado);
        let apiUrl = rutaApi + "actualizar.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: ACTUALIZAR_COMPTE_EXITO
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_COMPTES
        })
    }
};

export const reseteaExitoAccion = () => (dispatch, getState) => {
    dispatch({
        type: RESETEA_EXITO
    });
};

export const obtenerRessenyesAccion = (objeto) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        let apiUrl = rutaApi + "listar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        dispatch({
            type: OBTENER_RESSENYES_EXITO,
            payload: {
                array: respuesta,
                errorDeCargaRessenyes: false
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_RESSENYES
        })
    }
};

export const actualizarRessenyaAccion = (objeto, id, datos) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const losDatos = JSON.stringify(datos);
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("datos", losDatos);
        let apiUrl = rutaApi + "actualizar.php";
        await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({
            type: ACTUALIZAR_RESSENYA_EXITO
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_RESSENYES
        })
    }
};