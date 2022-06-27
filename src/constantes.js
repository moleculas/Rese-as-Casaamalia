let rutaApi, rutaServer
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    rutaApi = "http://localhost/api_ressenyes_casaamalia/";
    //rutaServer = window.location.protocol + "//" + window.location.host   
} else {
    rutaServer = window.location.protocol + "//" + window.location.host;
    rutaApi = rutaServer + "/api/";
}

const subdirectoriProduccio = '';
//afegir a package.json: "homepage": "https://domini/subdomini",

const randomMesos = [1, 3, 2, 4, 3, 2, 1, 4, 2, 3, 1, 4, 2, 3, 4, 1, 2, 3, 4, 1, 2, 4, 3, 2, 3, 4, 1, 3, 4, 1, 2];

const Constantes = {
    SUBDIRECTORI_PRODUCCIO: subdirectoriProduccio,
    RUTA_API: rutaApi,
    RANDOM_MESOS: randomMesos,   
};
export default Constantes