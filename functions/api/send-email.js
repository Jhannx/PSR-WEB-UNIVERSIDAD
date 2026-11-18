const FORMULARIOS_PERMITIDOS = new Set([
  "form-inscripcion",
  "form-contacto",
  "form-contratar",
  "form-personalizadas",
  "form-rumba",
  "form-vestuarios",
  "form-talleres"
]);

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function responder(datos, estado) {
  return new Response(JSON.stringify(datos), {
    status: estado,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g, function (caracter) {
    const entidades = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entidades[caracter];
  });
}

export async function onRequestPost({ request, env }) {
  const origen = request.headers.get("Origin");
  const url = new URL(request.url);

  if (origen && origen !== url.origin) {
    return responder({ message: "Origen de solicitud no permitido." }, 403);
  }

  if (!request.headers.get("Content-Type")?.toLowerCase().includes("application/json")) {
    return responder({ message: "El formato de la solicitud no es válido." }, 415);
  }

  const longitud = Number(request.headers.get("Content-Length") || 0);
  if (longitud > 20000) {
    return responder({ message: "La solicitud supera el tamaño permitido." }, 413);
  }

  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch (error) {
    return responder({ message: "No se pudo leer la solicitud." }, 400);
  }

  const formId = cuerpo && cuerpo.formId;
  const datos = cuerpo && cuerpo.data;

  if (!FORMULARIOS_PERMITIDOS.has(formId) || !datos || typeof datos !== "object" || Array.isArray(datos)) {
    return responder({ message: "Los datos del formulario no son válidos." }, 400);
  }

  if (Object.keys(datos).length > 40) {
    return responder({ message: "El formulario contiene demasiados campos." }, 400);
  }

  const campos = {};
  for (const [nombre, valor] of Object.entries(datos)) {
    if (typeof valor !== "string" || valor.length > 3000) {
      return responder({ message: "Uno de los campos del formulario no es válido." }, 400);
    }
    campos[nombre] = valor.trim();
  }

  // Responde como recibido a bots que completan el campo invisible, sin enviar correo.
  if (campos.website) {
    return responder({ messageId: "filtered" }, 201);
  }
  delete campos.website;

  if (String(env.EMAIL_PROVIDER || "").toLowerCase() !== "brevo" || !env.BREVO_API_KEY) {
    return responder({ message: "El servicio de correo no está configurado en el servidor." }, 503);
  }

  const remitente = env.EMAIL_FROM_ADDRESS || "";
  const destinatario = env.EMAIL_TO_ADDRESS || "";
  if (!CORREO_VALIDO.test(remitente) || !CORREO_VALIDO.test(destinatario)) {
    return responder({ message: "Falta configurar el remitente o el correo de destino." }, 503);
  }

  const nombreFormulario = formId.replace(/^form-/, "").replace(/-/g, " ");
  const filasHTML = Object.entries(campos).map(function ([nombre, valor]) {
    return "<tr><th style=\"padding:8px;text-align:left;border-bottom:1px solid #ddd\">" +
      escaparHTML(nombre) + "</th><td style=\"padding:8px;border-bottom:1px solid #ddd\">" +
      escaparHTML(valor) + "</td></tr>";
  }).join("");
  const texto = Object.entries(campos).map(function ([nombre, valor]) {
    return nombre + ": " + valor;
  }).join("\n");

  const mensaje = {
    sender: {
      name: env.EMAIL_FROM_NAME || "Web PSR",
      email: remitente
    },
    to: [{ email: destinatario }],
    subject: "Nueva solicitud web: " + nombreFormulario,
    textContent: "Nueva solicitud recibida desde el formulario de " + nombreFormulario + ".\n\n" + texto,
    htmlContent: "<h2>Nueva solicitud desde PSR</h2><p>Formulario: <strong>" +
      escaparHTML(nombreFormulario) + "</strong></p><table style=\"border-collapse:collapse;width:100%\">" +
      filasHTML + "</table>"
  };

  const correoContacto = campos.correo || campos.email;
  if (correoContacto && CORREO_VALIDO.test(correoContacto)) {
    mensaje.replyTo = {
      email: correoContacto,
      name: campos.nombre || campos.contacto || "Contacto del formulario"
    };
  }

  try {
    const respuestaBrevo = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify(mensaje)
    });

    const resultado = await respuestaBrevo.json().catch(function () { return {}; });
    if (!respuestaBrevo.ok) {
      console.error("Brevo rechazó el envío. HTTP", respuestaBrevo.status);
      const detalle = respuestaBrevo.status === 401 || respuestaBrevo.status === 403
        ? "Brevo rechazó la clave o sus permisos."
        : "Brevo rechazó el mensaje o el remitente. Verifica que el remitente esté autorizado en Brevo.";
      return responder({ message: detalle }, 502);
    }

    return responder({ messageId: resultado.messageId || "accepted" }, 201);
  } catch (error) {
    console.error("No se pudo conectar con Brevo.");
    return responder({ message: "No se pudo conectar con el servicio de correo." }, 502);
  }
}
