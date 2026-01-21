# Definición de Requerimientos: Proyecto GameShop E-commerce MVP

**Versión:** 1.0
**Fecha:** 2026-01-20
**Estado:** Aprobado para Diseño y Desarrollo

---

## 1. Contexto del Negocio y Objetivos
*   **Objetivo Principal:** Crear un MVP (Producto Mínimo Viable) para probar el mercado con una nueva tienda online 100% digital "GameShop".
*   **Modelo de Negocio:** Venta híbrida de **Videojuegos Físicos** y **Códigos Digitales (Keys)**.
*   **Estrategia Tecnológica:** Desarrollo Custom (React + TypeScript) para evitar limitaciones de SaaS.
*   **Deadline:** 4 días (Alcance crítico ajustado a este tiempo).
*   **Cobertura:** Operación Local inicialmente.

## 2. Público Objetivo y Propuesta de Valor
*   **Early Adopters:**
    *   Gamers coleccionistas (buscan ediciones físicas).
    *   Cazadores de ofertas (buscan keys digitales baratas).
*   **Propuesta de Valor Única (UVP):** Precios bajos y entrega física local extremadamente rápida.
*   **Dolores a Resolver:** Acceso rápido a códigos digitales y mercado de reventa/colección físico.
*   **Comportamiento de Compra:** Reflexiva (buscan precio y confianza).

## 3. Catálogo de Productos
*   **Volumen Inicial:** ~50 productos (SKUs).
*   **Tipología:**
    *   **Físico:** Requiere gestión de envío/retiro.
    *   **Digital:** Entrega automática de código.
*   **Estructura de Producto:** Un mismo juego puede tener variantes Física y Digital.
*   **Gestión de Stock:**
    *   Visible en frontend.
    *   Estado "Agotado" bloquea la compra (sin Backorders).
*   **Categorización:** Plana (Ej: PS5, Xbox, Nintendo, PC).
*   **Ficha de Producto:** Precio, Plataforma, Formato (Físico/Digital), Etiqueta "Oferta", Carátula.

## 4. Modelo de Venta
*   **Tipo:** B2C (Business to Consumer).
*   **Registro:** **Obligatorio** (No Guest Checkout).
*   **Tipos de Venta:**
    *   Venta directa (Stock actual).
    *   Pre-ventas (Lanzamientos futuros).
*   **Restricciones:** Límite de cantidad por usuario para ediciones de colección (máx 1).
*   **Cupones:** No incluidos en MVP.

## 5. Experiencia de Usuario (UX/UI)
*   **Estética:** **Gamer Hardcore / Cyberpunk** (Oscuro, Neón, llamativo).
*   **Dispositivo:** Desktop First (Prioridad PC), pero Responsive para móvil.
*   **Home Page:** Visualmente impactante con carrusel (Hero) de destacados.
*   **Búsqueda:** Buscador con **Autocompletado** para agilidad.
*   **Modo:** Oscuro por defecto.

## 6. Proceso de Compra (Checkout y Pagos)
*   **Pasarelas de Pago:**
    *   **Transferencia Bancaria Directa:** Requiere validación manual en admin.
    *   **PayPal:** Automático.
*   **Impuestos:** Precios base sin IVA, cálculo de impuestos se muestra en el Checkout final.
*   **Envíos Físicos:**
    *   Opción A: Despacho a domicilio (Tarifa Plana Local).
    *   Opción B: Retiro en Tienda / Punto de entrega.
*   **Fulfillment Mixto:** Si el carrito tiene productos físicos y digitales, se procesan por separado (Digital por mail/pantalla, Físico por logística).
*   **Facturación:** Solo correo de confirmación de pedido (No facturación fiscal automática).

## 7. Gestión de Usuarios
*   **Tecnología:** **Firebase Auth**.
*   **Datos de Registro:** Email, Password, Nombre, Teléfono.
*   **Perfil de Usuario:**
    *   Historial de pedidos.
    *   **"Mis Keys":** Sección para ver códigos comprados recuperables.
    *   Dirección de envío principal única.
    *   **Wishlist (Lista de Deseos):** Funcionalidad básica (Guardar favoritos).

## 8. Promociones y Precios
*   **Moneda:** Pesos Chilenos (CLP) como principal. Referencia en USD para PayPal.
*   **Gestión de Ofertas:** Campo "Precio Oferta" en admin -> Frontend calcula y muestra descuento (tacha precio normal).
*   **Etiquetas:**
    *   "NUEVO": Automático por fecha de creación.
    *   "-XX%": Automático si existe precio de oferta.

## 9. Logística y Fulfilment
*   **Carga de Keys Digitales:**
    *   Importación masiva simple (Copy-Paste de lista de códigos en campo de texto admin).
    *   Asignación "FIFO" (First In, First Out) al vender.
    *   Si stock = 0, producto pasa a "Agotado".
*   **Estados de Pedido:**
    *   `Pendiente de Pago` -> `Pagado` -> `Enviado/Completado` -> `Entregado`.
*   **Alertas:** Notificación de stock bajo en Admin.

## 10. Integraciones Externas
*   **Email Transaccional:** **EmailJS** (Confirmación de compra y envío de keys).
*   **Redes Sociales:** Botones en footer (WhatsApp, Facebook, Instagram).
*   **Analítica:** No incluida en MVP.
*   **Marketing:** No included (Newsletter).

## 11. Requerimientos Legales
*   **Textos:** Términos y Condiciones "Genéricos".
*   **Política de Reembolso:** **Estricta**. Si el producto es Digital y la key fue revelada/enviada, **NO hay devolución**.

## 12. Backoffice (Admin)
*   **Acceso:** Single SuperAdmin.
*   **Funcionalidad Crítica:**
    *   Gestión de Productos (CRUD).
    *   Carga de Stock (Físico y Digital).
    *   Gestión de Órdenes: Capacidad de cambiar estado manualmente (Indispensable para aprobar Transferencias).
    *   Dashboard Home: Resumen de ventas.

## 13. Métricas y Reporting
*   **Reportes:** Desglose de ventas por Día / Mes.
*   **Ranking:** Listado de "Juegos más vendidos".

## 14. Performance y Seguridad
*   **Seguridad:** Reglas de Firebase (Solo Admin ve toda la DB, usuarios solo ven lo suyo).
*   **Performance:** Lazy Loading de imágenes aceptado.

## 15. Alcance Negativo (What's OUT) - Fase 2
*   ❌ Sistema automático de devoluciones.
*   ❌ Sitio Multi-idioma.
*   ❌ Cobro Multi-moneda nativo (conversión real en pasarela).
*   ❌ App Móvil Nativa (iOS/Android).
*   ❌ Integración API Courier (Chilexpress/Starken).

---
**Siguientes Pasos Recomenados:**
1.  **Kick-off Técnico:** Setup de entorno React + Vite + TypeScript.
2.  **Configuración:** Setup de Firebase (Auth + Firestore).
3.  **UI Kit:** Definición de colores Neon/Dark y componentes base.
