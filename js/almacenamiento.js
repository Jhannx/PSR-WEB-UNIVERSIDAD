/* almacenamiento.js - manejo de localStorage en formato JSON */

const CLAVE_BORRADORES = "psr_borradores";
const CLAVE_SOLICITUDES = "psr_solicitudes";

/* Guarda en localStorage lo que el usuario va escribiendo en un formulario */
function guardarBorrador(idFormulario, datos) {
  const textoActual = localStorage.getItem(CLAVE_BORRADORES);
  const borradores = textoActual ? JSON.parse(textoActual) : {};

  borradores[idFormulario] = datos;
  localStorage.setItem(CLAVE_BORRADORES, JSON.stringify(borradores));
}

/* Recupera los datos del formulario si el usuario recarga la pagina */
function leerBorrador(idFormulario) {
  const textoActual = localStorage.getItem(CLAVE_BORRADORES);
  if (!textoActual) {
    return null;
  }

  const borradores = JSON.parse(textoActual);
  return borradores[idFormulario] || null;
}

/* Guarda el formulario enviado en la coleccion JSON y limpia su borrador */
function guardarSolicitudEnviada(idFormulario, datos) {
  const textoColeccion = localStorage.getItem(CLAVE_SOLICITUDES);
  const coleccion = textoColeccion ? JSON.parse(textoColeccion) : [];

  coleccion.push({
    id: Date.now(),
    formulario: idFormulario,
    fecha: new Date().toLocaleDateString("es-CO"),
    datos: datos
  });

  localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(coleccion));

  /* Borrar el borrador porque ya se envio */
  const textoBorradores = localStorage.getItem(CLAVE_BORRADORES);
  if (textoBorradores) {
    const borradores = JSON.parse(textoBorradores);
    delete borradores[idFormulario];
    localStorage.setItem(CLAVE_BORRADORES, JSON.stringify(borradores));
  }
}
