# ¡Feliz Cumpleaños, Udis! 🎵

Regalo digital de cumpleaños para **Udis** (Uriel): una experiencia web moderna,
emotiva y musical, hecha con **Vue 3 + Vite**.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación

```bash
npm install
```

## Ejecutar en modo desarrollo

```bash
npm run dev
```

Abre en el navegador: `http://localhost:5173`

## Compilar para producción

```bash
npm run build
npm run preview
```

## Estructura

```
index.html
vite.config.js
package.json
src/
  main.js
  App.vue
  style.css
  celebration.js
  components/
    BackgroundScene.vue
    FloatingNotes.vue
    ConfettiLayer.vue
    HeroSection.vue
    MusicSection.vue
    BirthdayCake.vue
    WishCapsule.vue
    FinalDedication.vue
```

## Personalización

- **Colores:** variables en `src/style.css` (`:root`).
- **Textos:** directamente en cada componente de `src/components/`.
- **Firma final:** `src/components/FinalDedication.vue` →
  “Con cariño para ti de Ari”.
- **Animaciones:** respetan `prefers-reduced-motion`.
