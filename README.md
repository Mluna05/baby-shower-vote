# 🎀 Baby Shower - Revelación de Sexo

Aplicación web interactiva para votación y revelación de sexo en baby showers, diseñada específicamente para el evento "Baby Aldana".

![Baby Shower App](https://img.shields.io/badge/React-19.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Vite](https://img.shields.io/badge/Vite-8.0-purple)

## ✨ Características

### 🗳️ Votación Interactiva
- Los invitados pueden votar por su predicción (niña o niño)
- Registro de nombre y apellido
- Mensajes personalizados de felicitación
- Confirmación visual del voto

### 📊 Resultados en Vivo
- Visualización en tiempo real de los votos
- Gráfico de barras animado mostrando Team Niña vs Team Niño
- Actualización automática del conteo

### 🎉 Revelación Dramática
- Animación de confeti
- Revelación del ganador con efectos visuales
- Lista de ganadores (quienes adivinaron correctamente)

### 💬 Muro de Mensajes
- Visualización de mensajes de felicitación
- Carrusel interactivo
- Categorización por equipo (niña/niño)
- Pantalla grande para proyección en eventos

### 👨‍💼 Panel de Administrador
- Control total de la votación
- Revelar el resultado (niño o niña)
- Cerrar/Reabrir votación
- Reiniciar votación completa
- Exportar votos a CSV
- Exportar lista de ganadores
- Editar y eliminar votos individuales
- Tabla completa con todos los participantes

### 📱 Compartir
- Código QR generado automáticamente
- Botón de compartir nativo del navegador
- URL fácil de compartir

## 🎨 Diseño

### Paleta de Colores
- **Niña**: Terracotta Old Rose (#E8A598)
- **Niño**: Slate Blue (#8FA3B5)
- **Oro**: #C9A961
- **Fondo**: Cream (#F5F1ED)

### Tipografía
- **Títulos**: Playfair Display (serif elegante)
- **Texto**: Inter (sans-serif moderna)

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16+ y npm

### Instalación

```bash
# Navegar al directorio
cd baby-shower-vote

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor se iniciará en `http://localhost:5173/`

### Compilar para Producción

```bash
npm run build
npm run preview
```

## 📍 Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio / Landing |
| `/votar` | Formulario de votación |
| `/mensaje` | Agregar mensaje de felicitación |
| `/gracias` | Confirmación del voto |
| `/resultados` | Resultados en vivo (pantalla grande) |
| `/revelacion` | Pantalla de revelación del ganador |
| `/admin` | Panel de administrador |
| `/compartir` | Código QR y opciones para compartir |
| `/mensajes` | Muro de mensajes (pantalla grande) |

## 🎯 Flujo de Usuario

### Invitado
1. **Landing** (`/`) → Clic en "EMPEZAR A VOTAR"
2. **Votación** (`/votar`) → Ingresar nombre y seleccionar predicción
3. **Mensaje** (`/mensaje`) → Escribir mensaje de felicitación
4. **Gracias** (`/gracias`) → Confirmación y redirección automática

### Administrador
1. Acceder a `/admin`
2. Monitorear votos en tiempo real
3. Controlar el estado de la votación
4. Revelar el resultado cuando esté listo
5. Exportar datos

### Pantallas de Proyección (para el evento)
- `/resultados` - Mostrar conteo en vivo durante la votación
- `/revelacion` - Mostrar al revelar el sexo del bebé
- `/mensajes` - Mostrar mensajes de los invitados

## 💾 Almacenamiento de Datos

Los datos se almacenan localmente en `localStorage` del navegador:
- ✅ Votos y predicciones
- ✅ Mensajes de felicitación
- ✅ Estado de la votación
- ✅ Resultado revelado

**Nota**: Los datos persisten entre sesiones pero son locales al navegador/dispositivo.

## 🛠️ Tecnologías Utilizadas

- **React 19.2** - Framework UI
- **TypeScript** - Tipado estático
- **Vite 8.0** - Build tool
- **React Router 7** - Navegación
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos
- **qrcode.react** - Generación de códigos QR

## 📦 Estructura del Proyecto

```
baby-shower-vote/
├── src/
│   ├── context/
│   │   └── BabyShowerContext.tsx    # Estado global de la app
│   ├── pages/
│   │   ├── LandingPage.tsx          # Página de inicio
│   │   ├── VotingPage.tsx           # Formulario de votación
│   │   ├── MessagePage.tsx          # Agregar mensaje
│   │   ├── ThankYouPage.tsx         # Confirmación
│   │   ├── LiveResultsPage.tsx      # Resultados en vivo
│   │   ├── RevealPage.tsx           # Revelación
│   │   ├── AdminPage.tsx            # Panel admin
│   │   ├── SharePage.tsx            # Compartir QR
│   │   └── MessagesDisplayPage.tsx  # Muro de mensajes
│   ├── types.ts                     # Definiciones TypeScript
│   ├── App.tsx                      # Componente principal
│   ├── main.tsx                     # Punto de entrada
│   └── index.css                    # Estilos globales
├── public/                          # Archivos estáticos
├── index.html                       # HTML principal
├── tailwind.config.js              # Configuración Tailwind
├── vite.config.ts                  # Configuración Vite
└── package.json                    # Dependencias
```

## 🎮 Funcionalidades del Administrador

### Controles Principales
- **Revelar Niño/Niña**: Muestra el resultado final
- **Cerrar/Reabrir Votación**: Control del estado de votación
- **Reiniciar Votación**: Elimina todos los datos (con confirmación)
- **Exportar Votos**: Descarga CSV con todos los votos
- **Exportar Ganadores**: Descarga CSV solo con quienes adivinaron

### Tabla de Votos
- Ver todos los votos en tiempo real
- Editar mensajes individuales
- Eliminar votos específicos
- Información completa: nombre, apellido, predicción, mensaje, fecha/hora

## 🚀 Despliegue

### Opciones Recomendadas
- **Vercel**: `vercel deploy`
- **Netlify**: Arrastrar carpeta `dist/`
- **GitHub Pages**: Configurar en repositorio

---

**¡Que disfruten la revelación!** 🎉👶
