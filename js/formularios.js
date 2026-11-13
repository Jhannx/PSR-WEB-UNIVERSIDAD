/* formularios.js - eventos input, change y submit para todos los formularios */

/* Lee todos los campos de un formulario y devuelve un objeto sencillo */
function obtenerValoresFormulario(formulario) {
  const datos = {};
  const campos = formulario.querySelectorAll("input, select, textarea");

  campos.forEach(function (campo) {
    const nombre = campo.name || campo.id;
    if (nombre) {
      datos[nombre] = campo.value;
    }
  });
  return datos;
}

/* Crea en el DOM el mensaje de confirmacion cuando el servidor responde 200/201 */
function mostrarConfirmacion(formulario, respuestaServidor) {
  const idMensaje = respuestaServidor && (respuestaServidor.messageId || respuestaServidor.id)
    ? " · ID de envío: " + (respuestaServidor.messageId || respuestaServidor.id)
    : "";

  const caja = document.createElement("div");
  caja.className = "psr-confirm-box flex-column align-items-start mt-3";
  caja.innerHTML =
    '<div class="d-flex align-items-center gap-3">' +
    '<i class="ph-fill ph-check-circle" aria-hidden="true"></i>' +
    '<div><p class="psr-confirm-title">¡Solicitud enviada con éxito! (HTTP 200/201)</p>' +
    '<p class="small text-muted">El servidor recibió tu solicitud correctamente' + idMensaje + '.</p></div>' +
    "</div>" +
    '<button type="button" class="btn psr-btn-soft btn-sm mt-3">Enviar otra solicitud</button>';

  /* Evento click para eliminar la confirmacion del DOM y mostrar de nuevo el formulario */
  const botonVolver = caja.querySelector("button");
  botonVolver.addEventListener("click", function () {
    caja.remove();
    formulario.reset();
    formulario.classList.remove("d-none");
  });

  formulario.parentElement.appendChild(caja);
}

/* Conecta la persistencia y el envio en los 7 formularios del sitio */
function iniciarFormularios() {
  const formularios = document.querySelectorAll("form");

  formularios.forEach(function (formulario) {
    const id = formulario.id;

    /* 1. Si hay datos guardados en localStorage, los rellenamos al cargar la pagina */
    const borrador = leerBorrador(id);
    if (borrador) {
      const campos = formulario.querySelectorAll("input, select, textarea");
      campos.forEach(function (campo) {
        const nombre = campo.name || campo.id;
        if (borrador[nombre]) {
          campo.value = borrador[nombre];
        }
      });
    }

    /* 2. Eventos input y change: guardar en localStorage mientras el usuario escribe */
    const guardarCambios = function () {
      guardarBorrador(id, obtenerValoresFormulario(formulario));
    };
    formulario.addEventListener("input", guardarCambios);
    formulario.addEventListener("change", guardarCambios);

    /* 3. Evento submit con preventDefault: enviar por API y mostrar resultado segun el servidor */
    formulario.addEventListener("submit", async function (evento) {
      evento.preventDefault();

      const datos = obtenerValoresFormulario(formulario);

      try {
        const respuestaServidor = await enviarCorreoFormulario(id, datos, formulario.parentElement);
        guardarSolicitudEnviada(id, datos);
        formulario.classList.add("d-none");
        mostrarConfirmacion(formulario, respuestaServidor);
      } catch (error) {
        console.error("El servidor rechazó el envío:", error.message);
      }
    });
  });
}
