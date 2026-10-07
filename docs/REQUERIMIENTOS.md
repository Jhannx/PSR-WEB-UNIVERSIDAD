# Requerimientos y Funcionalidades de la Web

## ¿Qué es PSR Web y qué hace?

Es el sitio web institucional para la academia de baile **PSR (Pioneros de la Salsa y Ritmos)** en Sincelejo. Sirve para mostrar los programas de formación, horarios de clases y permitir que las personas coticen presentaciones o soliciten información.

## Reglas de negocio importantes

1. **Sin número de teléfono visible ni WhatsApp:**
   La academia prefiere centralizar la atención por correo o mediante los formularios de la web. Por eso no se expone el número directamente al público.
2. **Formularios simulados (sin base de datos):**
   Al ser un proyecto enfocado en maquetación frontend, los formularios no guardan datos en un servidor real. Al enviar un formulario, la página oculta los campos y muestra un mensaje de confirmación ("¡Solicitud enviada! Nos pondremos en contacto pronto").
3. **Botón flotante permanente:**
   En todas las páginas hay un botón flotante con acceso directo al formulario de contacto.

## Resumen de páginas

* **Inicio (index.html):** Portada principal. Bienvenida, datos de la academia y accesos directos a los programas principales.
* **Academia (pages/academia.html):** Niveles de formación de baile por categorías de edad (infantil, juvenil y adultos), horarios en acordeón y formulario de inscripción.
* **Rumba Aeróbica (pages/rumba-aerobica.html):** Clases de acondicionamiento físico con baile, horarios fijos y formulario de registro.
* **Personalizadas (pages/personalizadas.html):** Información sobre clases privadas individuales o en pareja, ritmos de muestra y solicitud de clase.
* **Contratar Shows (pages/contratar.html):** Cotización de espectáculos de baile para eventos (bodas, quinceañeros, festivales o empresas).
* **Talleres para Instituciones (pages/talleres.html):** Talleres de danza para colegios, universidades y organizaciones.
* **Vestuarios (pages/vestuarios.html):** Muestra de trajes de baile disponibles para alquiler, con filtro por género de baile y solicitud de disponibilidad.
* **Nosotros (pages/nosotros.html):** Historia de la academia, profesores y misión en Sincelejo.
* **Contacto (pages/contacto.html):** Horarios, ubicación física y formulario general de preguntas.
* **Blog (pages/blog.html):** Noticias, novedades de clases, comunidad y registro de presentaciones.
