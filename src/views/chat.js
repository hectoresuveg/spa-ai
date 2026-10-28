
/*
---Codigo del ejemplo de henry

*/

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

    userMessage();

}
