# Combustibles SA de CV - ERP MVP

Sistema ERP web para gestión de empresa de combustibles.

## Características

- 🔐 **Login Premium**: Autenticación con diseño industrial
- 🏠 **Dashboard**: Gestión de tareas y asistencia
- 🗺️ **Monitoreo**: Mapa interactivo y seguimiento de unidades
- 🚛 **Operaciones**: Asignación de cargas, análisis de fletes y costos
- 💰 **Facturación**: Cuentas por cobrar y gestión de facturas
- 🤖 **Asistente IA**: Simulación de WhatsApp con respuestas inteligentes

## Tecnologías

- Next.js 16
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Recharts
- React Leaflet

## Instalación

```bash
cd frontend
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Deployment

Recomendado: Vercel (integración automática con Next.js)

1. Conecta este repositorio a Vercel
2. Configura tu dominio `palau.at` en la configuración de Vercel
3. Deploy automático en cada push

## Estructura

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/login/     # Página de login
│   │   ├── (dashboard)/       # Páginas del dashboard
│   │   │   ├── dashboard/     # Home
│   │   │   ├── monitoring/    # Monitoreo
│   │   │   ├── operations/    # Operaciones
│   │   │   ├── billing/       # Facturación
│   │   │   └── ai-agent/      # Asistente IA
│   ├── components/            # Componentes compartidos
│   └── lib/                   # Utilidades y datos mock
```

## Licencia

© 2026 Combustibles SA de CV
