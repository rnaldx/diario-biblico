# Diario Bíblico PWA (Starter FIX)

Stack: **React + Vite + Tailwind + Dexie (IndexedDB) + Vite-PWA**

## Cómo ejecutar
1. Instala dependencias: `npm install`
2. Desarrollo: `npm run dev`
3. Producción/preview: `npm run build && npm run preview`

## Qué incluye
- Calendario mensual con conteo de notas por día (reactivo con Dexie `liveQuery`)
- Vista del día con lista de notas por hora
- Editor de notas (título, contenido, referencias, etiquetas, fecha/hora)
- Búsqueda (texto, refs y etiquetas) **ordenada por recientes**
- PWA lista: registro con `virtual:pwa-register`
- Íconos válidos (PNG/SVG/ICO)
- UI móvil-primero (Tailwind)

## Notas
- Las funciones PWA (service worker, offline, instalar) se prueban tras `npm run build && npm run preview`.
