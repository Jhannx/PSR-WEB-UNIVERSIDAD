# Estándares de Código

## Reglas de desarrollo

Para mantener el código ordenado y fácil de revisar, seguimos estas reglas:

### 1. Cero estilos o eventos en línea (Inline)
En los archivos .html **nunca** usamos:
* `style="..."` (todo el diseño se maneja con clases en archivos .css).
* `onclick="..."`, `onsubmit="..."` (los eventos se conectaran desde JavaScript con `addEventListener`).
* Etiquetas `<style>` o `<script>` sueltas dentro del HTML (se usa archivos .css y .js).

### 2. Separación de responsabilidades
* **HTML:** Solo estructura y contenido. No define diseño ni lógica.
* **CSS:** Solo diseño, colores, tipografía y adaptabilidad para móvil y escritorio.
* **JavaScript:** Solo interactividad (abrir menús, acordeones y envíos de formularios).

### 3. Uso y personalización de Bootstrap
* Si Bootstrap ya incluye el componente que necesitamos (como el acordeón de preguntas frecuentes o el menú responsive), usamos lo nativo en vez de escribir código repetido.
* Los colores de la academia y fuentes se personalizan sobreescribiendo las variables de Bootstrap en **css/base/variables.css**.
* Las clases creadas por nosotros usan el prefijo **psr-** (ejemplo: `.psr-btn-flame`, `.psr-card`, `.psr-section`), para distinguir a simple vista qué es interno y qué es de Bootstrap.

### 4. Nombres de archivos y elementos
* **Archivos:** Todo en minúsculas con guiones, por ejemplo: `rumba-aerobica.html`, `header-footer.css`.
* **Clases e IDs:** En minúsculas con guiones: `class="psr-card"`, `id="form-contacto"`.
* **Variables y funciones en JS:** En formato `camelCase`: `function enviarFormulario()`.

### 5. Accesibilidad y HTML semántico
* Usamos etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) en lugar de llenar todo con `<div>`.
* Todo campo de texto o formulario lleva su etiqueta `<label>` asociada.
* Los botones que solo tienen ícono llevan un atributo `aria-label` descriptivo.
