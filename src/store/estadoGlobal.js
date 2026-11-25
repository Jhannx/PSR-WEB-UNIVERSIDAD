/* estadoGlobal.js - estado centralizado y compartido entre todas las vistas de la SPA */

import { reactive } from "vue";
import {
  leerTodosLosBorradores,
  guardarBorrador,
  leerSolicitudesEnviadas,
  guardarSolicitudEnviada,
  eliminarSolicitudGuardada
} from "../services/almacenamiento.js";
import { consultarFestivosColombia } from "../services/clienteHttp.js";

export const estadoGlobal = reactive({
  /* Coleccion reactiva de solicitudes guardadas en localStorage */
  solicitudes: leerSolicitudesEnviadas(),

  /* Borradores reactivos de todos los formularios */
  borradores: leerTodosLosBorradores(),

  /* Estado compartido de la API publica de dias festivos de Colombia */
  festivos: {
    lista: [],
    cargando: false,
    cargado: false,
    error: ""
  },

  /* Inicializa o recupera el borrador de un formulario para usar con v-model */
  obtenerBorrador(idFormulario, camposIniciales) {
    if (!this.borradores[idFormulario]) {
      this.borradores[idFormulario] = { ...camposIniciales };
    } else {
      this.borradores[idFormulario] = {
        ...camposIniciales,
        ...this.borradores[idFormulario]
      };
    }
    return this.borradores[idFormulario];
  },

  /* Guarda en localStorage a medida que el usuario edita campos con v-model */
  sincronizarBorrador(idFormulario) {
    if (this.borradores[idFormulario]) {
      guardarBorrador(idFormulario, this.borradores[idFormulario]);
    }
  },

  /* Registra un formulario enviado exitosamente y limpia su borrador */
  registrarSolicitud(idFormulario, nombreFormulario, camposIniciales) {
    const datosEnviados = { ...this.borradores[idFormulario] };
    this.solicitudes = guardarSolicitudEnviada(idFormulario, nombreFormulario, datosEnviados);
    this.borradores[idFormulario] = { ...camposIniciales };
  },

  /* Elimina una solicitud del historial y actualiza localStorage */
  eliminarSolicitud(id) {
    this.solicitudes = eliminarSolicitudGuardada(id);
  },

  /* Carga los festivos de Colombia desde la API publica una sola vez para todas las vistas */
  async cargarFestivos() {
    if (this.festivos.cargado || this.festivos.cargando) {
      return;
    }

    this.festivos.cargando = true;
    this.festivos.error = "";

    try {
      this.festivos.lista = await consultarFestivosColombia();
      this.festivos.cargado = true;
    } catch (error) {
      this.festivos.error =
        error.message || "Error de red: No se pudieron cargar los días festivos.";
    } finally {
      this.festivos.cargando = false;
    }
  }
});
