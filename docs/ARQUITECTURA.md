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

  docs/

  .gitignore
  README.md


## Decisiones de la estructura

### index.html en la raíz y subpáginas en pages/
* **index.html** es el inicio de la pagina web.

* Todas las demás páginas van dentro de **pages/** para mantener la raíz ordenada y limpia.

### Recursos locales en css/libs/ (Soporte sin internet)
* Tanto las fuentes tipográficas (Inter y Manrope en formato .woff2) como los íconos (Phosphor Icons) están guardados localmente dentro de `css/libs/`.
* Esto permite que el proyecto funcione en cualquier computador sin depender de conexión a internet.

### Archivo CSS principal (styles.css)
En lugar de enlazar muchos archivos CSS en cada HTML, cada página solo enlaza a **css/styles.css**.  
Dentro de styles.css se importan los archivos en orden:
* Librerías externas (`libs/`).
* Variables y estilos base (`base/`).
* Estructura general de página (`layout/`).
* Componentes visuales (`components/`).
