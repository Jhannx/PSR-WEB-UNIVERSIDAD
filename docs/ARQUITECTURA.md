# Arquitectura y Estructura de Carpetas

## ¿Cómo está organizado el proyecto?

El proyecto es un sitio web estático multi-página. Para mantener el código limpio, organizado y no repetir estilos en cada archivo, se organiza el CSS y el JS por conceptos en lugar de hacerlo por página:


PSR-WEB-UNIVERSIDAD/
  index.html
  pages/
   academia.html
   rumba-aerobica.html
   personalizadas.html
   contratar.html
   talleres.html
   vestuarios.html
   nosotros.html
   contacto.html
   blog.html
   blog-anuncios.html
   blog-clases.html
   blog-comunidad.html
   blog-presentaciones.html

  css/
   base/
   layout/
   components/
   libs/
      fonts/
      phosphor-icons/
   styles.css

  img/
   icons/
   logo-psr-pestaña.png

  js/
   libs/
   almacenamiento.js
   cliente-http.js
   formularios.js
   interactividad.js
   main.js

  docs/

  .gitignore
  README.md


## Decisiones de la estructura

### index.html en la raíz y subpáginas en pages/
* **index.html** es el inicio de la pagina web.

* Todas las demás páginas van dentro de **pages/** para mantener la raíz ordenada y limpia.

### Recursos externos y librerías (CDN y `libs/`)
* Las tipografías (**Inter** y **Manrope**) y los íconos (**Phosphor Icons**) se enlazan mediante CDN en el `<head>` de cada página, conservando copias de respaldo en `css/libs/`.
* **Bootstrap 5** (`bootstrap.min.css` y `bootstrap.bundle.min.js`) se carga desde las carpetas locales `css/libs/` y `js/libs/`.

### Archivo CSS principal (styles.css)
En lugar de enlazar muchos archivos CSS en cada HTML, cada página solo enlaza a **css/styles.css**.  
Dentro de styles.css se importan los archivos en orden:
* Librerías externas (`libs/`).
* Variables y estilos base (`base/`).
* Estructura general de página (`layout/`).
* Componentes visuales (`components/`).

### Módulos de JavaScript (`js/`)
El código JavaScript se divide por responsabilidades en 5 archivos:
* **almacenamiento.js:** Guarda y recupera en `localStorage` (formato JSON) los borradores de formularios y las solicitudes enviadas.
* **cliente-http.js:** Gestiona las peticiones HTTP asíncronas con `fetch` y `async / await`, mostrando el indicador de carga y manejando los estados `200/201`, `404` y `500` con bloques `try / catch`.
* **formularios.js:** Conecta los eventos `input`, `change` y `submit` (`preventDefault`) en los 7 formularios del sitio y muestra la confirmación en el DOM.
* **interactividad.js:** Contiene la calculadora de tarifas de Rumba Aeróbica (`change`), el filtro de vestuarios (`click`) y el consumo de la API pública de días festivos de Colombia (`GET`).
* **main.js:** Punto de entrada que inicializa todas las funciones al dispararse el evento `DOMContentLoaded`.
