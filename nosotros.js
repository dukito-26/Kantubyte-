
/* KANTUBYTE - SOBRE NOSOTROS */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const anio = document.getElementById("anio");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }

    const botonHistoria = document.querySelector(".boton-historia");

    if (botonHistoria) {

        botonHistoria.addEventListener("click", function (evento) {

            const destino = document.getElementById("historia");

            if (destino) {
                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    }

});
