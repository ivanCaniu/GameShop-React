# Documentación Técnica del Frontend - GameShop

## 1. Visión General
La aplicación cliente de GameShop es una **Single Page Application (SPA)** construida con **React 18** y **TypeScript**, utilizando **Vite** como empaquetador para un desarrollo ultra-rápido. El diseño es completamente responsivo y moderno, gracias a **Tailwind CSS**.

---

## 2. Tecnologías y Librerías
*   **Core**: React 18, TypeScript.
*   **Build Tool**: Vite.
*   **Estilos**: Tailwind CSS (Utility-first), con variables CSS personalizadas para el sistema de colores.
*   **Enrutamiento**: React Router DOM v6.
*   **Iconos**: `lucide-react`.
*   **Notificaciones**: `react-hot-toast`.
*   **HTTP**: Fetch API nativa (encapsulada en un servicio `api.ts`).

---

## 3. Arquitectura del Proyecto (`/src`)

El código sigue una estructura modular y escalable:

### 📂 `/context` (Gestión de Estado)
Usamos **Context API** para manejar el estado global sin librerías externas pesadas (como Redux).
1.  **`AuthContext`**: Maneja la sesión del usuario (`currentUser`), login/registro, y persistencia con `localStorage`. Incluye lógica de seguridad (auto-logout).
2.  **`CartContext`**: Maneja el carrito de compras, cálculo de totales y sincronización con `localStorage`.
3.  **`ProductContext`**: Obtiene los productos desde el Backend y maneja estados de carga (`loading`) y errores.

### 📂 `/components` UI Kit y Componentes
*   **`/ui`**: Componentes base reutilizables y sin lógica de negocio (Atomos).
    *   `Button`, `Card`, `Input`, `Skeleton`, `ToastProvider`.
*   **`/shared`**: Componentes más complejos que usan lógica de negocio.
    *   `ProductCard` (Muestra producto + botón comprar + lógica de skeleton).
    *   `Navbar`, `Footer` (Layout principal).
    *   `ProtectedRoute` (Guardia de seguridad para rutas).

### 📂 `/pages` (Vistas)
*   **`HomePage`**: Landing page con grid de lanzamientos y hero section.
*   **`CatalogPage`**: Catálogo completo con filtros por plataforma y tipo.
*   **`ProductDetailsPage`**: Vista detallada de un producto.
*   **`Auth`**: `LoginPage`, `RegisterPage`.
*   **`ProfilePage`**: Panel del usuario (historial de pedidos, whitelist).
*   **`CheckoutPage`**: Simulación de proceso de compra.

---

## 4. Características Destacadas

### ✨ Sistema de Componentes (Atomic Design)
Los componentes UI están desacoplados. Por ejemplo, el botón (`Button.tsx`) maneja sus propias variantes (`primary`, `secondary`, `outline`) y tamaños, lo que permite cambiar el estilo de toda la app tocando un solo archivo.

### 🚀 Optimización de Carga (Skeletons)
Para mejorar la UX, no mostramos un spinner genérico. Implementamos **Skeletons** (`Skeleton.tsx`) que imitan la forma de las tarjetas de producto (`ProductCard`), creando una percepción de velocidad mayor mientras se obtienen los datos del backend.

### 🔒 Seguridad en Cliente
*   **Interceptores**: El servicio `api.ts` intercepta errores 401 (token expirado) y forza un logout para proteger la sesión.
*   **Rutas Protegidas**: El componente `ProtectedRoute` verifica si el usuario tiene el rol necesario (ej: `admin`) antes de renderizar la vista.

---

## 5. Diseño y Estética
*   **Paleta de Colores**: Definida en `index.css` y `tailwind.config.js`. Usamos un tema oscuro "Gamer Premium" con acentos neón (`--color-accent`, `--color-neon-blue`).
*   **Responsividad**: Grid system de Tailwind (`grid-cols-1 md:grid-cols-4`) asegura que la tienda se vea perfecta en Móvil y Desktop.

---

## 6. Comandos Disponibles
*   `npm run dev`: Inicia servidor de desarrollo.
*   `npm run build`: Compila la app para producción (`/dist`).
*   `npm run preview`: Previsualiza la build de producción localmente.
