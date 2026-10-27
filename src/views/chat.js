
export function renderChat() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="chat__container">

            <section class="chat__messages" aria-label="Conversación">
                <!-- Aquí se insertarán los mensajes -->

<div class="chat-message">
    ¡Hola! ¿Cómo estás?
</div>

<div class="user-message">
    Bien, ¿y tú?
</div>

<div class="chat-message">
    Estoy bien, gracias.
</div>

<div class="chat-message">
    ¿Qué has hecho hoy?
</div>

<div class="user-message">
    He estado trabajando en una aplicación.
</div>

<div class="chat-message">
    ¡Qué interesante! ¿De qué trata?
</div>

<div class="user-message">
    Es una aplicación de chat.
</div>

<div class="chat-message">
    ¿La estás haciendo desde cero?
</div>

<div class="user-message">
    Sí, usando HTML, CSS y JavaScript.
</div>

<div class="chat-message">
    ¡Genial! ¿Ya tienes la interfaz?
</div>

<div class="user-message">
    Sí, estoy trabajando en la vista de conversación.
</div>

<div class="chat-message">
    ¿Y cómo vas con el diseño?
</div>

<div class="user-message">
    Bastante bien, ya tengo la navegación.
</div>

<div class="chat-message">
    ¿Vas a añadir mensajes dinámicos?
</div>

<div class="user-message">
    Sí, ese será el siguiente paso.
</div>

<div class="chat-message">
    Te recomiendo que separes la lógica en funciones.
</div>

<div class="user-message">
    Justamente estoy intentando mantener el código organizado.
</div>

<div class="chat-message">
    ¡Vas por buen camino!
</div>

<div class="user-message">
    Gracias, todavía me queda bastante por aprender.
</div>

<div class="chat-message">
    Paso a paso. ¡Seguro que lo terminas!
</div>

<!-- Los mensajes anteriores son une ejemplo -->




            </section>

            <section class="chat__controls">
                <form class="chat__form">
                    <input
                        class="chat__input"
                        type="text"
                        placeholder="Escribe un mensaje..."
                        aria-label="Escribe un mensaje"
                        autocomplete="off"
                    />

                    <button
                        class="chat__send"
                        type="submit"
                        aria-label="Enviar mensaje"
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
}
