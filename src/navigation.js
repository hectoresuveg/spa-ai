/*Importa el router puesto que debe ser capas de llamarlo desde los event listener reigstrados */

import { router } from "./router.js";

/*La funcino navigateTo no se ejecuta automaticamente al cargar la pagina */
export function navigateTo(path){
    history.pushState(null, "", path); //actualiza la url del navegador y añade una entrada al historial sin recargar la pagina

    router(); //llama a router para que evalue el neuvo path en el url y renderice la vista
}

/*declara y exporta la funcino para que main.s puede importarla y ejecutarla al cargar la pagina por primera vez*/
export function setupLinkInterception() {
  /*Registra un listener que escucha los clicks que se propagan por el documento*/
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a"); //Event.target identifica el elemento concreto que origino el click, 
              if (!link) return;            //closest("a"): busca ese elemento o uno de sus ancestros que sea un enlace <a>

    const href = link.getAttribute("href"); //comprueba que exista un href.
    if (!href) return; //si no existe o su valor esta vacion el callback termina.

    /*Comprobaciones */
    if (event.defaultPrevented || event.button !== 0) return; //comprobar el tipo de clic
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; 
    if (link.target === "_blank" || link.hasAttribute("download")) return; //Exlcurio enlaces especiales
    if (link.origin !== window.location.origin) return;
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    //Si el clic supera todas las comprobaciones llega a estas dos lineas 
    event.preventDefault(); //cancela la navegacion tradicional del navegador
    navigateTo(link.pathname + link.search + link.hash); //llama a navigateTo() y le pasa la ruta y los parametros de busqueda
  });
}



/*navegacion con los botones y backk / forward  */

window.addEventListener("popstate",()=>{
  router();
})
