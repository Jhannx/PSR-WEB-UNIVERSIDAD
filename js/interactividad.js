/* interactividad.js - calculadora de rumba (change), filtro de vestuarios (click) y API de festivos */

/* 1. Evento change en rumba-aerobica.html: calcula 4000 * dias (diario, semanal o mensual) */
function iniciarCalculadoraRumba() {
  const selector = document.getElementById("selector-tarifa-rumba");
  const tituloPrecio = document.getElementById("tarifa-titulo");
  const descripcionPrecio = document.getElementById("tarifa-descripcion");

  if (!selector || !tituloPrecio) {
    return;
  }

  const diasPorModalidad = {
    diario: 1,
    semanal: 4,
    mensual: 16
  };

  const textosPorModalidad = {
    diario: "Por clase asistida (1 día) · Sin contratos, sin membresías ni mensualidades obligatorias.",
    semanal: "Por 4 clases asistidas (1 semana) · Sin contratos, sin membresías ni mensualidades obligatorias.",
    mensual: "Por 16 clases asistidas (1 mes) · Sin contratos, sin membresías ni mensualidades obligatorias."
  };

  selector.addEventListener("change", function () {
    const dias = diasPorModalidad[selector.value] || 1;
    const total = 4000 * dias;
    tituloPrecio.textContent = "$" + total.toLocaleString("es-CO") + " COP";

    if (descripcionPrecio && textosPorModalidad[selector.value]) {
      descripcionPrecio.textContent = textosPorModalidad[selector.value];
    }
  });
}

/* 2. Evento click en vestuarios.html: muestra u oculta tarjetas segun el genero de baile */
function iniciarFiltroVestuarios() {
  const botones = document.querySelectorAll("[data-filtro-vestuario]");
  const tarjetas = document.querySelectorAll("[data-genero-vestuario]");

  if (!botones.length) {
    return;
  }

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const filtro = boton.getAttribute("data-filtro-vestuario");

      botones.forEach(function (btn) {
        btn.classList.replace("psr-btn-flame", "psr-btn-soft");
      });
      boton.classList.replace("psr-btn-soft", "psr-btn-flame");

      tarjetas.forEach(function (tarjeta) {
        const genero = tarjeta.getAttribute("data-genero-vestuario");
        if (filtro === "todos" || genero === filtro) {
          tarjeta.classList.remove("d-none");
        } else {
          tarjeta.classList.add("d-none");
        }
      });
    });
  });
}

/* 3. Consumo de API publica de festivos de Colombia usando peticionHttp */
async function iniciarFestivosColombia() {
  const contenedores = document.querySelectorAll("[data-festivos-colombia]");
  if (!contenedores.length) {
    return;
  }

  try {
    const anio = new Date().getFullYear();
    const festivos = await peticionHttp(
      "https://date.nager.at/api/v3/PublicHolidays/" + anio + "/CO",
      { method: "GET" }
    );

    const partesHoy = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());
    const hoy = partesHoy.find(parte => parte.type === "year").value + "-" +
      partesHoy.find(parte => parte.type === "month").value + "-" +
      partesHoy.find(parte => parte.type === "day").value;
    const proximos = festivos.filter(function (festivo) {
      return festivo.date >= hoy;
    }).slice(0, 3);

    contenedores.forEach(function (contenedor) {
      contenedor.replaceChildren();
      if (!proximos.length) {
        contenedor.textContent = "No hay más festivos este año.";
        return;
      }

      const lista = document.createElement("ul");
      lista.className = "list-unstyled mb-0 small";
      proximos.forEach(function (festivo) {
        const fecha = new Date(festivo.date + "T12:00:00");
        const fechaLegible = new Intl.DateTimeFormat("es-CO", {
          day: "numeric",
          month: "long"
        }).format(fecha);
        const item = document.createElement("li");
        item.className = "mb-1";
        item.textContent = fechaLegible + " · " + festivo.localName + " — Día sin clase";
        lista.appendChild(item);
      });
      contenedor.appendChild(lista);
    });
  } catch (error) {
    console.warn("No se pudieron cargar los festivos:", error);
    contenedores.forEach(function (contenedor) {
      contenedor.textContent = "No se pudo consultar el calendario de festivos.";
    });
  }
}
