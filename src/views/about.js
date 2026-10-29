export function renderAbout(){
    const app = document.getElementById("app");
    app.innerHTML =`
        <div class="about__container">
            <section class="project-card">
  <div class="project-card__content">
    <span class="project-card__label">
      PROYECTO INTEGRADOR · MÓDULO 3
    </span>

    <h2 class="project-card__name">
      SPA con Inteligencia Artificial
    </h2>

    <p class="project-card__description">
      Aplicación web de una sola página que genera contenido dinámico
      mediante la integración de la API de Gemini, desarrollada de
      forma nativa con tecnologías web.
    </p>

    <div class="project-card__stats">
      <div class="project-card__stat">
        <span class="project-card__stat-label">Arquitectura</span>
        <span class="project-card__stat-value">SPA</span>
      </div>

      <div class="project-card__stat">
        <span class="project-card__stat-label">Integración</span>
        <span class="project-card__stat-value">API de Gemini</span>
      </div>

      <div class="project-card__stat">
        <span class="project-card__stat-label">Enfoque</span>
        <span class="project-card__stat-value">Consumo y renderizado de contenido de API</span>
      </div>
    </div>
  </div>
</section>
        </div>
    `;
}