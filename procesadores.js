
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const productos = document.querySelectorAll(".producto");
    const buscadorSuperior = document.getElementById("buscador");
    const buscadorControl = document.getElementById("buscador-control");
    const filtroNivel = document.getElementById("filtroNivel");
    const contador = document.getElementById("contador-productos");
    const sinResultados = document.getElementById("sinResultados");

    /**
     * Filtra las tarjetas por nombre y nivel.
     */
    function filtrarProductos() {

        const textoSuperior = buscadorSuperior
            ? buscadorSuperior.value.toLowerCase().trim()
            : "";

        const textoControl = buscadorControl
            ? buscadorControl.value.toLowerCase().trim()
            : "";

        const texto = textoControl || textoSuperior;

        const nivelSeleccionado = filtroNivel
            ? filtroNivel.value
            : "todos";

        let visibles = 0;

        productos.forEach(function (producto) {

            const nombre = (
                producto.dataset.nombre ||
                producto.textContent ||
                ""
            ).toLowerCase();

            const nivel = producto.dataset.nivel || "";

            const coincideTexto = nombre.includes(texto);
            const coincideNivel =
                nivelSeleccionado === "todos" ||
                nivel === nivelSeleccionado;

            const mostrar = coincideTexto && coincideNivel;

            producto.hidden = !mostrar;

            if (mostrar) {
                visibles++;
            }
        });

        if (contador) {
            contador.textContent =
                visibles + (visibles === 1
                    ? " procesador encontrado"
                    : " procesadores encontrados");
        }

        if (sinResultados) {
            sinResultados.hidden = visibles !== 0;
        }
    }

    if (buscadorSuperior) {
        buscadorSuperior.addEventListener("input", function () {
            if (buscadorControl) {
                buscadorControl.value = buscadorSuperior.value;
            }
            filtrarProductos();
        });
    }

    if (buscadorControl) {
        buscadorControl.addEventListener("input", function () {
            if (buscadorSuperior) {
                buscadorSuperior.value = buscadorControl.value;
            }
            filtrarProductos();
        });
    }

    if (filtroNivel) {
        filtroNivel.addEventListener("change", filtrarProductos);
    }

    /**
     * Añade productos al carrito compartido de Kantubyte.
     * Formato: {nombre, precio, cantidad, categoria}
     */
    document.querySelectorAll(".agregar-carrito").forEach(function (boton) {

        boton.addEventListener("click", function () {

            const nombre = boton.dataset.nombre || "";
            const precio = Number(boton.dataset.precio || 0);

            if (!nombre || precio <= 0) {
                alert("No se pudo añadir este producto.");
                return;
            }

            let carrito = [];

            try {
                carrito = JSON.parse(
                    localStorage.getItem("kantubyteCarrito") || "[]"
                );

                if (!Array.isArray(carrito)) {
                    carrito = [];
                }
            } catch (error) {
                carrito = [];
            }

            const productoExistente = carrito.find(function (item) {
                return item.nombre === nombre;
            });

            if (productoExistente) {
                productoExistente.cantidad =
                    Number(productoExistente.cantidad || 1) + 1;
            } else {
                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1,
                    categoria: "Procesadores"
                });
            }

            localStorage.setItem(
                "kantubyteCarrito",
                JSON.stringify(carrito)
            );

            alert(nombre + " se añadió al carrito.");
        });

    });

    filtrarProductos();

});
