# Corrección de coherencia de galerías del portafolio

**Fecha:** 2026-07-16  
**Estado:** Diseño aprobado por el usuario; pendiente de revisión escrita  
**Alcance:** Galerías y textos de los cuatro casos de estudio del portafolio.

## Objetivo

Hacer que cada captura y cada descripción del portafolio representen una capacidad visible y verificable del producto real. Se prioriza evidencia híbrida: capturas de software reales, estados demo reproducibles y diagramas técnicos únicamente para la capa física o conceptual.

## Principios de fidelidad

1. Una captura de interfaz debe salir del código real del producto, usando datos locales o demo.
2. Un título y una descripción deben corresponder exactamente al módulo y estado que se ve en la imagen.
3. No se inventan métricas, usuarios, resultados, instituciones ni pantallas que el producto no tenga.
4. Los diagramas no representan una pantalla de producto. Se etiquetan como esquemas técnicos y se basan en componentes reales del repositorio.
5. Los cambios en repositorios externos se hacen en copias de trabajo o ramas temporales, sin tocar `main`, datos reales ni publicar esos cambios.

## Matriz de evidencia

Cada proyecto conserva tres espacios de galería:

| Proyecto | Captura 1 | Captura 2 | Captura 3 |
| --- | --- | --- | --- |
| FACSA | Portal público actual | Dashboard administrativo autenticado | Página real de Admisiones |
| Presión | Dashboard de lecturas | Historial con filtros y registros | Reporte PDF |
| Estacionamiento | Flujo público de consulta/pago | Dashboard operativo con ocupación y métricas | Diagrama real del circuito de entrada/salida |
| Turnos | Generación de ticket | Monitor de cola con datos demo | Panel de ventanilla autenticado y configurado |

La captura actual de FACSA que muestra login no se presentará como panel. La captura de Admisiones no se llamará Transparencia. Las dos imágenes duplicadas de Estacionamiento se reemplazarán por vistas distintas. La pantalla de configuración inicial de Turnos se retirará de la galería.

## Correcciones de contenido

- Mantener `es` y `en` sincronizados en títulos, descripciones, rutas e imágenes.
- FACSA usará “Admisiones” para la página real de admisiones y reservará “dashboard administrativo” para una vista con módulos o métricas visibles.
- Estacionamiento distinguirá flujo de pago, dashboard operativo y circuito de entrada/salida; no se describirá una pantalla de pago como monitor de sensores.
- Turnos distinguirá generación de ticket, monitor de cola y panel de ventanilla; no se presentará la configuración inicial como operación.
- Presión conservará los nombres actuales porque corresponden a sus vistas, con ajustes sólo cuando el texto prometa elementos que no se ven.

## Flujo de captura

1. Crear copias de trabajo o ramas temporales para FACSA, Presión, Estacionamiento-Arduino y Proyecto-Integracion.
2. Preparar estados demo reproducibles sin publicar cambios ni alterar `main`.
3. Capturar FACSA desde el portal y el panel autenticado; usar la página real de Admisiones.
4. Capturar Presión desde el dashboard, historial y exportación PDF, retirando overlays de desarrollo del encuadre.
5. Capturar Estacionamiento desde el modo local/fixtures del dashboard y su flujo público; tomar el diagrama desde `docs/diagramas/` del repositorio.
6. Inicializar Turnos localmente, generar tickets demo y capturar `/`, `/pantalla` y `/ventanilla` en estados operativos.
7. Guardar los PNG bajo `public/projects/` y actualizar ambos diccionarios en `src/content/site-content.ts`.

Los dashboards y portales usarán un viewport de escritorio. Ticket, pago o formulario usarán un viewport estrecho únicamente cuando esa composición sea parte real del producto. No se generarán mockups de interfaz con IA.

## Uso de imágenes generadas

Se usarán primero los diagramas existentes del repositorio. Si su legibilidad es insuficiente, podrá generarse un esquema técnico complementario con IA a partir de los componentes reales (Arduino, sensores, backend y flujo de entrada/salida). Ese recurso se marcará como diagrama, no como screenshot, y no sustituirá la evidencia del software.

## Validación

- Las 12 entradas de galería tendrán rutas existentes y únicas, salvo reutilización documentada.
- Ninguna imagen mostrará una redirección a login, un estado de configuración, un overlay de desarrollo o un error visible.
- Se revisarán las cuatro rutas en español e inglés y se comprobará que cada caption describa su imagen.
- Se ejecutarán `npm run lint`, `npm test` y `npm run build`.
- Se comprobarán consola, referencias de imágenes y navegación directa a cada caso de estudio.
- Se documentarán las ramas temporales y se restaurará el estado original de cada repositorio externo.

## Fuera de alcance

- Rediseñar la UI de los productos fuente.
- Inventar métricas de impacto o usuarios.
- Modificar despliegues, datos reales o ramas principales de repositorios externos.
- Reescribir la arquitectura del portafolio más allá de la matriz de galería, textos y rutas de activos.
