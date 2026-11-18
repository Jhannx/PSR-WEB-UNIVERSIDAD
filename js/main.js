/* main.js - inicializa las funciones principales al cargar la pagina */

document.addEventListener("DOMContentLoaded", function () {
  iniciarFormularios();
  iniciarCalculadoraRumba();
  iniciarFiltroVestuarios();
  iniciarFestivosColombia();
  iniciarReproductoresMultimedia();
});

function iniciarReproductoresMultimedia() {
  const marcos = document.querySelectorAll("[data-psr-video]");

  if (!marcos.length) {
    return;
  }

  function prepararMiniatura(marco) {
    const video = marco.querySelector("video");

    if (!video || video.dataset.miniaturaIniciada === "true") {
      return;
    }

    video.dataset.miniaturaIniciada = "true";
    let miniaturaCreada = false;

    function crearMiniatura() {
      if (miniaturaCreada || video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
        return;
      }

      try {
        const anchoMaximo = 960;
        const escala = Math.min(1, anchoMaximo / video.videoWidth);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(video.videoWidth * escala);
        canvas.height = Math.round(video.videoHeight * escala);

        const contexto = canvas.getContext("2d");
        if (!contexto) {
          return;
        }

        contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
        video.poster = canvas.toDataURL("image/jpeg", 0.82);
        marco.classList.add("has-video-poster");
        miniaturaCreada = true;
        if (video.paused && video.currentTime > 0) {
          video.currentTime = 0;
        }
      } catch (error) {
        // El video sigue siendo reproducible aunque el navegador no permita capturar su cuadro.
      }
    }

    video.addEventListener("loadeddata", crearMiniatura);
    video.addEventListener("seeked", crearMiniatura);
    video.addEventListener("loadedmetadata", function () {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = Math.min(1, video.duration * 0.12);
      }
    }, { once: true });

    video.preload = "metadata";
    video.load();
  }

  marcos.forEach(function (marco) {
    const video = marco.querySelector("video");
    const boton = marco.querySelector("[data-psr-video-play]");

    if (video && boton) {
      boton.addEventListener("click", function () {
        const reproduccion = video.play();
        if (reproduccion && typeof reproduccion.catch === "function") {
          reproduccion.catch(function () {
            video.controls = true;
          });
        }
      });

      video.addEventListener("play", function () {
        marco.classList.add("is-playing");
      });

      video.addEventListener("pause", function () {
        marco.classList.remove("is-playing");
      });

      video.addEventListener("ended", function () {
        marco.classList.remove("is-playing");
      });
    }

    if ("IntersectionObserver" in window) {
      const observador = new IntersectionObserver(function (entradas) {
        if (entradas.some(function (entrada) { return entrada.isIntersecting; })) {
          prepararMiniatura(marco);
          observador.disconnect();
        }
      }, { rootMargin: "240px 0px" });

      observador.observe(marco);
    } else {
      prepararMiniatura(marco);
    }
  });
}
