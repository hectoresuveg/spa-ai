import { getCharacterReply } from "../services/aiClient.js";
import { debounce, wait } from "../services/debounce.js";
import { getUserMessage } from "../ui/messages.js";

const state = {
    status: "idle", // 'idle' || 'loading' || 'success' || 'error',
    messages: [{role: "character", text:"Habla, ¿qué necesitas?"}],
    error: null,
    lastUsermessage: null,
    retryCountdown: null,
};

function setState(updates){
    Object.assign(state, updates);
    renderChat();
}

export function renderChat() {
    
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="chat__container">

            <section class="chat__messages" id="chat__messages" aria-live="polite">
                <!-- Aquí se insertarán los mensajes -->
                
                ${renderMessages()}
                ${renderStatus()}
                <!-- Los mensajes anteriores son une ejemplo -->

            </section>

            <section class="chat__controls">
            <!-- chatComposer y chatComposer-->
                <form class="chat__form" id="chat__form">  
                <!-- chatComposer__input-->
                 <!-- chatInput -->
                    <input
                        class="chat__input"  
                        id="chat__input"  
                        type="text"
                        placeholder="Escribe un mensaje..."
                        aria-label="Escribe un mensaje"
                        ${state.status === "loading" ? "disabled" : ""}
                        autocomplete="off"
                    />
                    <!-- chatComposer__send -->
                    <button
                        class="chat__send"  
                        type="submit"
                        aria-label="Enviar mensaje"
                        ${state.status === "loading" ? "disabled" : ""}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22 2 15 22l-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                        </svg>
                    </button>
                </form>
            </section>
        </div>
    `;
    setupChat();
    scrollToBottom();
}

function renderMessages(){
    return state.messages.map((msg)=> `
    <div class="message message--${msg.role}">
    ${escapeHTML(msg.text)}
    </div>
    `).join("")
}

function renderStatus(){
    if (state.status === "loading" && state.retryCountdown !== null) {
    return `
        <div class="message message--character message--typing">
            Esperando para reintentar (${state.retryCountdown} segundos)...
        </div>
    `;
}

    if (state.status === "loading"){
        return `<div class="message message--character message--typing"> escribiendo... </div>`
    }
    if(state.status==="error"){
        return `
        <div class="message message--error"> ${state.error} </div>
        <button class="message--retry" id="retryBtn" type="button"> Reintentar </button>
        `
    }
    return "";
}

function escapeHTML(str){
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML; 
}

function setupChat(){
    const $form = document.querySelector('#chat__form');
    const $input = document.querySelector('#chat__input');
    const $retry = document.querySelector('#retryBtn');

    const debouncedSend = debounce(async()=>{
        if(state.status === "loading") return;

        const text = $input.value.trim();
        if(!text) return;

       await sendMessage(text);
       $input.value=""

        document.querySelector("#chat__input")?.focus();
    }, 200)

    $form.addEventListener("submit", async (event) =>{
        event.preventDefault();
        debouncedSend();
    })

    $retry?.addEventListener("click",()=>{
        if(state.status === "loading") return;
        if(state.lastUsermessage){
            sendMessage(state.lastUsermessage, true)
        }
    })

    //Foco automatico al entrar a la vista 
    $input.focus();
    }

    async function sendMessage(text, isRetry = false) {
        const nextMessages = isRetry ? state.messages : [... state.messages, {role: "user", text}];

        setState({
                messages:nextMessages,
                status:"loading",
                error: null,
                lastUsermessage: isRetry ? state.lastUsermessage : text,
            });
        /*
        if(!isRetry){
            setState({
                messages:[...state.messages, {role:"user", text}],
                status:"loading",
                error: null,
                lastUsermessage: text,
            });
        } else {
            setState({status:"loading", error: null});
        }
            */
        try {
            const reply = await getCharacterReply(nextMessages);
            setState({
                messages: [... nextMessages, {role: "character", text: reply}],
                status: "idle", 
                error: null,
                lastUsermessage: null,
            })
        } catch (err) {

            if (err.status === 429) {
            const seconds = err.retryAfterSeconds ?? 5;

            for (let s = seconds; s > 0; s--) {
            setState({ status: "loading", retryCountdown: s });
            await wait(1000);
                }

                try {
            setState({ status: "loading", retryCountdown: null });

            const reply = await getCharacterReply(nextMessages);

            setState({
                messages: [...nextMessages, { role: "character", text: reply }],
                status: "idle",
                error: null,
                lastUsermessage: null,
            });

            return;
            } catch (errRetry) {
             // Reintento falló, mostrar error final.
            setState({
                status: "error",
                error: getUserMessage(err),
            });

            return;
            }
            }

            
            setState({
                status: "error",
                error: getUserMessage(err),
            });
        }   
    }

    function scrollToBottom(){
        const $messages = document.querySelector("#chat__messages");

        if($messages){
            $messages.scrollTop = $messages.scrollHeight;
        }
    }
/*
function getCharacterRepply(userText){
    return new Promise((resolve, reject)=> {
        const delay = 800 + Math.random() * 1200;

        setTimeout(()=> {
//Este bloque de codigo simula el error
            if(Math.random() < 0.5){
                reject(new Error("network error simulado"));
                return;
            }



            resolve(`Recibido: "${userText}". (Esta respuesta hoy esta simulaada)`)
        }, delay);
    });
}
 */

