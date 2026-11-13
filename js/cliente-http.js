/* cliente-http.js - peticiones asincronas con fetch, async/await, loader y mensajes segun el servidor */

/* Funcion general para hacer peticiones HTTP en toda la web */
async function peticionHttp(url, opciones, contenedor) {
  let loader = null;

  /* 1. Limpiar alertas previas y mostrar loader visual en el DOM */
  if (contenedor) {
    const alertaPrevia = contenedor.querySelector(".psr-http-error");
    if (alertaPrevia) {
      alertaPrevia.remove();
    }

    loader = document.createElement("div");
    loader.className = "psr-loader p-2 my-2 bg-light border rounded text-muted small";
    loader.textContent = "Conectando con el servidor...";
    contenedor.appendChild(loader);
  }

  try {
    const respuesta = await fetch(url, opciones);
    const codigo = respuesta.status;

    /* Intentar leer el cuerpo JSON que responde el servidor (tanto en exito como en error) */
    let cuerpoServidor = null;
    try {
      cuerpoServidor = await respuesta.json();
    } catch (e) {
      cuerpoServidor = null;
    }

    const detalleServidor = cuerpoServidor && cuerpoServidor.message ? " (" + cuerpoServidor.message + ")" : "";

    /* 2. Manejo de codigos de estado HTTP segun lo que responda el servidor */
    if (codigo === 401 || codigo === 403) {
      throw new Error("No se pudo enviar — Error HTTP " + codigo + ": Credencial o permiso rechazado por el servidor" + detalleServidor + ".");
    }
    if (codigo === 404) {
      throw new Error("Error HTTP 404: No se encontró el recurso o ruta en el servidor" + detalleServidor + ".");
    }
    if (codigo >= 500) {
      throw new Error("Error HTTP " + codigo + ": Fallo interno en el servidor externo" + detalleServidor + ".");
    }
    if (codigo !== 200 && codigo !== 201) {
      throw new Error("Respuesta del servidor — Código HTTP " + codigo + detalleServidor + ".");
    }

    /* 3. Si es 200 o 201 (Exito), quitamos el loader y devolvemos los datos */
    if (loader) {
      loader.remove();
    }
    return cuerpoServidor;
  } catch (error) {
    if (loader) {
      loader.remove();
    }

    /* 4. Mostrar visualmente en pantalla el mensaje exacto del error */
    if (contenedor) {
      const cajaError = document.createElement("div");
      cajaError.className = "psr-http-error alert alert-danger small my-3";
      cajaError.textContent = error.message || "Error de red: No se pudo conectar con el servidor.";
      contenedor.appendChild(cajaError);
    }
    throw error;
  }
}

/* Envia los datos del formulario al servidor de correo configurado */
async function enviarCorreoFormulario(idFormulario, datos, contenedor) {
  const env = window.PSR_ENV || {};

  if (env.BREVO_API_KEY) {
    const correoAcademia = env.EMAIL_FROM_ADDRESS || "escuelapsr@gmail.com";
    const cuerpoBrevo = {
      sender: { name: "Web PSR", email: correoAcademia },
      to: [{ email: correoAcademia, name: "Escuela PSR" }],
      subject: "Nueva solicitud web: " + idFormulario,
      htmlContent: "<p>Datos enviados desde <strong>" + idFormulario + "</strong>:</p><pre>" + JSON.stringify(datos, null, 2) + "</pre>"
    };

    return await peticionHttp(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": env.BREVO_API_KEY,
          "content-type": "application/json"
        },
        body: JSON.stringify(cuerpoBrevo)
      },
      contenedor
    );
  }

  /* Solo si no existe env.js (ej. en otro computador), usa JSONPlaceholder */
  return await peticionHttp(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    },
    contenedor
  );
}
