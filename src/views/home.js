export function renderHome() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="home__container">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="home__background-icon">
                <path
                    d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"
                />
            </svg>
        </div>
    `;
}
