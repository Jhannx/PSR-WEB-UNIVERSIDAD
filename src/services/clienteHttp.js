/* clienteHttp.js - peticiones asincronas con fetch, async/await y manejo de codigos HTTP */

export async function peticionHttp(url, opciones) {
  const respuesta = await fetch(url, opciones);
  const codigo = respuesta.status;

  let cuerpoServidor = null;
  try {
    cuerpoServidor = await respuesta.json();
  } catch (e) {
    cuerpoServidor = null;
  }

  const detalleServidor =
    cuerpoServidor && cuerpoServidor.message ? " (" + cuerpoServidor.message + ")" : "";

  /* Manejo de codigos de estado HTTP segun lo que responda el servidor */
  if (codigo === 401 || codigo === 403) {
    throw new Error(
      "No se pudo enviar — Error HTTP " +
        codigo +
        ": Credencial o permiso rechazado por el servidor" +
        detalleServidor +
        "."
    );
  }
  if (codigo === 404) {
    throw new Error(
      "Error HTTP 404: No se encontró el recurso o ruta en el servidor" + detalleServidor + "."
    );
  }
  if (codigo >= 500) {
    throw new Error(
      "Error HTTP " + codigo + ": Fallo interno en el servidor externo" + detalleServidor + "."
    );
  }
  if (codigo !== 200 && codigo !== 201) {
    throw new Error("Respuesta del servidor — Código HTTP " + codigo + detalleServidor + ".");
  }

  return cuerpoServidor;
}

/* Envia el formulario al endpoint de Cloudflare Pages (/api/send-email) o a JSONPlaceholder en entorno local */
export async function enviarCorreoFormulario(idFormulario, datos) {
  const esEntornoLocal =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  if (!esEntornoLocal) {
    return await peticionHttp("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId: idFormulario, data: datos })
    });
  }

  /* En desarrollo local con Vite (npm run dev), usa JSONPlaceholder (HTTP 201) */
  return await peticionHttp("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
}

export async function consultarFestivosColombia() {
  const anio = new Date().getFullYear();
  const festivos = await peticionHttp(
    "https://date.nager.at/api/v3/PublicHolidays/" + anio + "/CO",
    { method: "GET" }
  );

  const hoy = new Date().toISOString().slice(0, 10);
  return festivos
    .filter(function (f) {
      return f.date >= hoy;
    })
    .slice(0, 3);
}
