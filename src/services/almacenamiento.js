/* almacenamiento.js - manejo de localStorage en formato JSON */

const CLAVE_BORRADORES = "psr_borradores";
const CLAVE_SOLICITUDES = "psr_solicitudes";

export function leerTodosLosBorradores() {
  const textoActual = localStorage.getItem(CLAVE_BORRADORES);
  if (!textoActual) {
    return {};
  }
  try {
    return JSON.parse(textoActual);
  } catch (e) {
    return {};
  }
}

export function guardarBorrador(idFormulario, datos) {
  const borradores = leerTodosLosBorradores();
  borradores[idFormulario] = { ...datos };
  localStorage.setItem(CLAVE_BORRADORES, JSON.stringify(borradores));
}

export function leerBorrador(idFormulario) {
  const borradores = leerTodosLosBorradores();
  return borradores[idFormulario] || null;
}

export function limpiarBorrador(idFormulario) {
  const borradores = leerTodosLosBorradores();
  if (borradores[idFormulario]) {
    delete borradores[idFormulario];
    localStorage.setItem(CLAVE_BORRADORES, JSON.stringify(borradores));
  }
}

export function leerSolicitudesEnviadas() {
  const textoColeccion = localStorage.getItem(CLAVE_SOLICITUDES);
  if (!textoColeccion) {
    return [];
  }
  try {
    return JSON.parse(textoColeccion);
  } catch (e) {
    return [];
  }
}

export function guardarSolicitudEnviada(idFormulario, nombreFormulario, datos) {
  const coleccion = leerSolicitudesEnviadas();

  const nuevaSolicitud = {
    id: Date.now(),
    formulario: idFormulario,
    tituloFormulario: nombreFormulario,
    fecha: new Date().toLocaleDateString("es-CO"),
    datos: { ...datos }
  };

  coleccion.unshift(nuevaSolicitud);
  localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(coleccion));
  limpiarBorrador(idFormulario);

  return coleccion;
}

export function eliminarSolicitudGuardada(id) {
  const coleccion = leerSolicitudesEnviadas().filter(function (item) {
    return item.id !== id;
  });
  localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(coleccion));
  return coleccion;
}
