/* interactividad.js - calculadora de rumba (change), filtro de vestuarios (click) y API de festivos */

/* 1. Evento change en rumba-aerobica.html: calcula 4000 * dias (diario, semanal o mensual) */
function iniciarCalculadoraRumba() {
  const selector = document.getElementById("selector-tarifa-rumba");
  const tituloPrecio = document.getElementById("tarifa-titulo");

  if (!selector || !tituloPrecio) {
    return;
  }

  const diasPorModalidad = {
    diario: 1,
    semanal: 4,
    mensual: 16
  };

  selector.addEventListener("change", function () {
    const dias = diasPorModalidad[selector.value] || 1;
    const total = 4000 * dias;
    tituloPrecio.textContent = "$" + total.toLocaleString("es-CO") + " COP";
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
  const contenedor = document.getElementById("contenedor-festivos-colombia");
  if (!contenedor) {
    return;
  }

  try {
    const festivos = await peticionHttp(
      "https://date.nager.at/api/v3/PublicHolidays/2026/CO",
      { method: "GET" },
      contenedor
    );

    const hoy = new Date().toISOString().slice(0, 10);
    const proximos = festivos.filter(function (f) {
      return f.date >= hoy;
    }).slice(0, 3);

    const lista = document.createElement("ul");
    lista.className = "list-unstyled mb-0 small";

    proximos.forEach(function (festivo) {
      const item = document.createElement("li");
      item.textContent = "• " + festivo.date + ": " + festivo.localName + " (Sin clase)";
      lista.appendChild(item);
    });

    contenedor.appendChild(lista);
  } catch (error) {
    console.warn("No se pudieron cargar los festivos:", error);
  }
}
