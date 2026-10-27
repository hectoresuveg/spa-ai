export function renderAbout(){
    const app = document.getElementById("app");
    app.innerHTML =`
        <div class="about__container">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="about__background-icon">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" />
            </svg>
        </div>
    `;
}