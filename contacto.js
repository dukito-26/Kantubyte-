
/* ========================================
   KANTUBYTE - CONTACTO
======================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("form-contacto");
    const mensajeExito = document.getElementById("mensaje-exito");
    const botonNuevo = document.getElementById("nuevo-comentario");
    const anio = document.getElementById("anio");


    /* AÑO AUTOMÁTICO */

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }


    /* ESTADO INICIAL */

    if (formulario && mensajeExito) {
        formulario.classList.remove("oculto");
        mensajeExito.classList.add("oculto");
    }


    /* ENVIAR COMENTARIO */

    if (formulario && mensajeExito) {

        formulario.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const tipo = document.getElementById("tipo").value;
            const mensaje = document.getElementById("mensaje").value.trim();


            if (nombre === "" || tipo === "" || mensaje === "") {
                alert("Completa todos los campos antes de enviar.");
                return;
            }


            /* OCULTAR FORMULARIO */

            formulario.classList.add("oculto");


            /* MOSTRAR CONFIRMACIÓN */

            mensajeExito.classList.remove("oculto");


            /* DESPLAZAR A LA CONFIRMACIÓN */

            mensajeExito.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    /* ENVIAR OTRO COMENTARIO */

    if (botonNuevo && formulario && mensajeExito) {

        botonNuevo.addEventListener("click", function () {

            /* LIMPIAR CAMPOS */

            formulario.reset();


            /* OCULTAR ÉXITO */

            mensajeExito.classList.add("oculto");


            /* MOSTRAR FORMULARIO */

            formulario.classList.remove("oculto");


            /* VOLVER AL FORMULARIO */

            formulario.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }

});
