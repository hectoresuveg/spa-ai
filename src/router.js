/*Importa cada funcion desde su archivo corresponpdiente, cada una de ellas renderiza una vista dentro de app */
import { renderAbout } from "./views/about.js";
import { renderHome } from "./views/home.js";
import { renderChat } from "./views/chat.js"
import { renderNotFound } from "./views/notFound.js";

/*Crea un objeto con las rutas donde cada clave almacena una funcion en su valor */
const routes = {
    "/": renderHome,
    "/chat": renderChat,
    "/about": renderAbout,
}

export function router(){
    const path = window.location.pathname;  /*la funcion router() primero consigue el path que se encuentra en la url del navegador ¡ */
    const render = routes[path] || renderNotFound; //Busca la funcion asociada a path, si no existe, asigna renderNotFound a render
    render(); /*Se llama con un () porque el valor que alamcena es una funcion, de esta manera al llamarlo se ejecuta */

    console.log(path);
} 

/*
router() se ejecuta una vez al iniciar la apliacion desde main.js y vuelve a ejecutarse cada vez que navigateTo() 
lo llama despues de una navegacio interna
*/
