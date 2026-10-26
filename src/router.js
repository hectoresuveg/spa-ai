import { renderHome } from "./views/home.js";
import { renderMessages } from "./views/messages.js";
import { renderNotFound } from "./views/notFound.js";
import { renderNotifications } from "./views/notifications.js";

const routes = {
    "/": renderHome,
    "/chat": renderMessages,
    "/about": renderNotifications,
}



export function router(){
    const path = window.location.pathname;
    const render = routes[path] || renderNotFound;
    render();

    console.log(path);
} 
