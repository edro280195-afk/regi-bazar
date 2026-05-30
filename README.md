# Regi Bazar Landing

Landing pública de Regi Bazar hecha con Vite, React, TypeScript, Tailwind CSS 4, Framer Motion, Lenis, React Three Fiber y canvas-confetti.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Dónde cambiar contenido

- Textos, links, categorías, zona de entrega y testimonios: `src/data/landingContent.ts`
- Fecha del próximo live: `src/data/landingContent.ts`, campo `nextLive.startsAt`
- Logo principal: `public/assets/regi-logo.jpg`
- Fotos reales de galería: reemplaza los archivos `public/assets/placeholder-*.svg` o cambia sus rutas en `galleryItems`
- Si el seguimiento vive en otro dominio, cambia `links.trackingBasePath` por la URL completa, por ejemplo `https://tu-app.com/pedido`

## Notas

- El contacto principal es Messenger. No se agregó WhatsApp.
- El rastreo redirige a `https://regibazar.com/pedido/{token}` aceptando link completo, ruta o código.
- Los testimonios quedaron marcados como pendientes para no inventar reseñas reales.
