# SPA con Inteligencia Artificial · Chat con Vegeta

Proyecto integrador del módulo 3. Aplicación web de una sola página (SPA), desarrollada de forma nativa con JavaScript, HTML y CSS, que genera contenido dinámico mediante la integración de la API de Gemini a través de una función serverless desplegada en Vercel.

---

## Link a la aplicación desplegada

https://spa-ai-pi.vercel.app/

---

## Descripción del personaje elegido

**Vegeta**, el príncipe de los saiyajin del universo de Dragon Ball.

- **Personalidad:** orgulloso, arrogante, competitivo, disciplinado y temperamental. Detesta que lo subestimen y le cuesta admitir que alguien es superior a él. Es inteligente, estratégico, directo, sarcástico e impaciente.
- **Relación con el usuario:** lo trata con superioridad y exigencia, aunque con el tiempo puede desarrollar respeto y confianza. Le cuesta expresar afecto, pero puede mostrar un lado protector y leal.
- **Rivalidad:** su rivalidad con Kakarotto (Goku) es constante.
- **Expresiones características:** "¡Soy el príncipe de los saiyajin!", "¡Maldito Kakarotto!", "Tch...", "Hmph", "¡Insecto!", usadas solo cuando encajan de forma natural.
- **Formato de respuesta:** máximo 3 líneas, tono firme, seguro y conciso.
- **Límites:** en temas médicos, legales o financieros serios sale temporalmente del personaje y aclara que es un chatbot de ficción. Si no sabe algo de la realidad actual, lo admite, y no afirma tener experiencias, poderes o recuerdos reales.

El comportamiento completo del personaje está definido en el *system prompt* de [`src/services/prompts.js`](src/services/prompts.js).

---

## Requisitos y pasos para ejecutar local

### Requisitos

- [Node.js](https://nodejs.org/) (versión LTS reciente) y npm
- Cuenta en [Vercel](https://vercel.com/) y Vercel CLI (`npm install -g vercel`)
- Una API key de Gemini, que se obtiene en [Google AI Studio](https://aistudio.google.com/apikey)

### Pasos

1. **Clonar el repositorio y entrar a la carpeta del proyecto**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd spa-ai
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar el archivo `.env`**

   Copia el archivo de ejemplo y coloca tu API key:

   ```bash
   cp .env.example .env
   ```

   ```env
   GEMINI_API_KEY=tu_api_key_de_gemini
   ```

   > El archivo `.env` está incluido en `.gitignore`. No lo subas al repositorio ni compartas tu clave.

4. **Iniciar sesión y vincular el proyecto con Vercel** (solo la primera vez)

   ```bash
   vercel login
   vercel link
   ```

5. **Ejecutar con `vercel dev`**

   ```bash
   vercel dev
   ```

   Se usa `vercel dev` en lugar de un servidor estático porque la carpeta `api/` contiene la función serverless (`/api/chat`) que se comunica con Gemini. Una vez iniciado, abre la URL que muestra la terminal (normalmente `http://localhost:3000`).

### Rutas de la aplicación

| Ruta     | Vista                                                   |
| -------- | ------------------------------------------------------- |
| `/`      | Home: tarjeta de presentación de Vegeta                 |
| `/chat`  | Chat con Vegeta                                         |
| `/about` | Tarjeta informativa del proyecto                        |
| otras    | Vista de página no encontrada                           |

El archivo `vercel.json` redirige todas las rutas a `index.html` para que el router del lado del cliente funcione al recargar la página.

---

## Cómo ejecutar tests

Las pruebas usan [Vitest](https://vitest.dev/) y se encuentran en la carpeta `tests/`. Cubren las funciones de transformación del chat: `buildPayload`, `normalizeAIResponse` y `getTrimmedHistory`. Para no consumir tokens de la API real, usan el mock de `src/services/mockGeminiApi.js`.

```bash
# Modo watch (el que ejecuta el script del proyecto)
npm test

# Ejecución única, sin quedarse en modo watch
npx vitest run
```

---

## Cómo desplegar a Vercel

### Opción A: con la CLI

1. Instala la CLI e inicia sesión:

   ```bash
   npm install -g vercel
   vercel login
   ```

2. Desde la raíz del proyecto, crea el despliegue de prueba (la primera vez te pedirá vincular el proyecto):

   ```bash
   vercel
   ```

3. Agrega la variable de entorno `GEMINI_API_KEY` en el proyecto:

   ```bash
   vercel env add GEMINI_API_KEY
   ```

   Selecciona los entornos en los que debe estar disponible (Production, Preview y Development).

4. Despliega a producción:

   ```bash
   vercel --prod
   ```

### Opción B: desde el panel de Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En Vercel, ve a **Add New → Project** e importa el repositorio.
3. En **Environment Variables**, agrega `GEMINI_API_KEY` con tu clave.
4. Pulsa **Deploy**. Cada `push` posterior a la rama principal generará un nuevo despliegue.

> Si agregas o cambias variables de entorno después de un despliegue, vuelve a desplegar para que se apliquen.

---

## Capturas de pantalla de la aplicación funcionando

![Desktop](/docs/captura1.png)

![mobile view](/docs/captura2.png)

![mobile view](/docs/captura3.png)

![mobile view](/docs/captura4.png)

---

## Link a la aplicación desplegada

https://spa-ai-pi.vercel.app/

---

## Registro del uso de AI en el proyecto

El detalle completo se encuentra en [`docs/reporteAI.md`](docs/reporteAI.md). Resumen:

### 1. Tarjeta de presentación de Vegeta

- **Objetivo:** apoyarse en una herramienta de IA para crear una tarjeta de presentación del personaje en HTML y CSS, con enfoque *mobile-first* y metodología BEM.
- **Solicitud:** *"crea una tarjeta de presentacion de vegeta en html simple mobile first y devuelveme el css con metodologia bem"*.
- **Resultado:** propuesta con nombre y título del personaje, descripción de su personalidad, raza y planeta de origen, un enlace de acción para conversar con él, clases CSS organizadas con BEM, estilos de color, tipografía, espaciado, bordes, sombras y botones, *media queries* para pantallas grandes y consideraciones de accesibilidad (indicador de foco y reducción de animaciones).
- **Ajustes propios:** se adaptó la paleta a colores más claros y se integró la tarjeta en la función que renderiza la vista de inicio (`.home__container`), ya que el contenido se genera con JavaScript.

### 2. Tarjeta informativa del proyecto integrador

- **Objetivo:** crear una tarjeta que describa el proyecto de forma profesional, manteniendo la identidad visual de la tarjeta de Vegeta.
- **Solicitud :** *"ahora genera una tarjeta de informacion sobre el proyecto, se trata del proyecto integrador del modulo 3, una spa que genera contenido dinamico integrando la api de gemini desarrollada de forma nativa, utiliza una forma de redaccion profesional y utiliza los mismos estilos que con la tarjeta de vegueta"*.
- **Resultado:** encabezado del proyecto, título "SPA con Inteligencia Artificial", descripción profesional, sección de datos clave (arquitectura, integración y enfoque), HTML y CSS con BEM, estilos coherentes con la tarjeta anterior y soporte para movimiento reducido.
- **Aplicación:** se integró en la vista `about` con el prefijo `project-card` para mantener separados sus estilos de los de la tarjeta de Vegeta.

### Conclusión

La IA se utilizó como apoyo para generar propuestas iniciales de código, organizar estilos CSS, redactar contenido de presentación y orientar la integración de componentes. Todas las propuestas fueron revisadas, adaptadas e integradas manualmente en la arquitectura existente del proyecto.
