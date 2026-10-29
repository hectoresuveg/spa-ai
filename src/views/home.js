export function renderHome() {
    const app = document.getElementById("app");

    app.innerHTML = `
<div class="home__container">
    <section class="character-card">
  <div class="character-card__content">
    <span class="character-card__label">PRÍNCIPE SAIYAJIN</span>

    <h1 class="character-card__name">VEGETA</h1>

    <p class="character-card__description">
      Orgulloso. Implacable. Siempre superando sus límites.
    </p>

    <div class="character-card__stats">
      <div class="character-card__stat">
        <span class="character-card__stat-label">Raza</span>
        <span class="character-card__stat-value">Saiyajin</span>
      </div>

      <div class="character-card__stat">
        <span class="character-card__stat-label">Planeta</span>
        <span class="character-card__stat-value">Vegeta</span>
      </div>
    </div>

    <a href="/chat" class="character-card__button">
      Hablar con Vegeta
    </a>
  </div>
  </div>
    `;
}
