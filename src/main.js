
/*Punto de entrada a la logica del programa 
este modulo se carga cuando se termina de renderizar index.hml*/

/*Realiza las importaciones de las funciones de los modulos router  y navigation */

import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";

/*Ejecuta setupLinkInterception una sola vez para registrar el event listener */
setupLinkInterception(); /*Se ejecuta una sola vez al recargar el sitio */

/*Ejecuta router para saber que vista renderizar  */
router();

/* */