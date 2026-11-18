# Requerimientos y Funcionalidades de la Web

## ¿Qué es PSR Web y qué hace?

Es el sitio web institucional para la academia de baile **PSR (Pioneros de la Salsa y Ritmos)** en Sincelejo. Sirve para mostrar los programas de formación, horarios de clases y permitir que las personas coticen presentaciones o soliciten información.

## Reglas de negocio importantes

1. **Sin número de teléfono visible ni WhatsApp:**
   La academia prefiere centralizar la atención por correo o mediante los formularios de la web. Por eso no se expone el número directamente al público.
2. **Formularios con persistencia local y envío asíncrono:**
   Mientras el usuario escribe en cualquier formulario, los datos se guardan automáticamente como borrador en `localStorage` (formato JSON) para que no se pierdan si se recarga la página. Al enviar el formulario (`submit` con `preventDefault`), se realiza una petición HTTP `POST` asíncrona (`fetch` con `async / await`), mostrando un indicador de carga, validando el código de estado del servidor (`200/201`, `404`, `500`) y almacenando la solicitud enviada en `localStorage`.
3. **Botón flotante permanente:**
   En todas las páginas hay un botón flotante con acceso directo al formulario de contacto.

## Resumen de páginas

* **Inicio (index.html):** Portada principal. Bienvenida, datos de la academia y accesos directos a los programas principales.
* **Academia (pages/academia.html):** Niveles de formación de baile por categorías de edad (preinfantil, infantil, juvenil y adultos), horarios en acordeón, próximos días festivos de Colombia consultados desde una API pública y formulario de inscripción.
* **Rumba Aeróbica (pages/rumba-aerobica.html):** Clases de acondicionamiento físico con baile, calculadora interactiva de tarifas según asistencia (diaria, semanal o mensual), horarios fijos, próximos festivos de Colombia y formulario de registro.
* **Personalizadas (pages/personalizadas.html):** Información sobre clases privadas individuales o en pareja, ritmos de muestra, próximos festivos de Colombia y solicitud de clase.
* **Contratar Shows (pages/contratar.html):** Cotización de espectáculos de baile para eventos (bodas, quinceañeros, festivales o empresas).
* **Talleres para Instituciones (pages/talleres.html):** Talleres de danza para colegios, universidades y organizaciones.
* **Vestuarios (pages/vestuarios.html):** Muestra de trajes de baile disponibles para alquiler, con filtro interactivo por género de baile y solicitud de disponibilidad.
* **Nosotros (pages/nosotros.html):** Historia de la academia, profesores y misión en Sincelejo.
* **Contacto (pages/contacto.html):** Horarios, próximos días festivos en Colombia, ubicación física y formulario general de preguntas.
* **Blog (pages/blog.html):** Noticias, novedades de clases, comunidad y registro de presentaciones.
