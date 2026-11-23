
/**
 * KANTUBYTE 🌺
 * JavaScript de Refrigeración
 *
 * @typedef {Object} ProductoCarrito
 * @property {string} nombre
 * @property {number} precio
 * @property {number} cantidad
 * @property {string} categoria
 */

document.addEventListener("DOMContentLoaded", () => {

    const tarjetas = document.querySelectorAll(".producto");

    const buscador = document.getElementById("buscador");

    const filtroNivel = document.getElementById("filtro-nivel");

    const contador = document.getElementById("contador-productos");

    /**
     * Filtrar productos por nombre, marca y nivel.
     */
    function filtrarProductos() {

        const texto = buscador.value.toLowerCase().trim();

        const nivelSeleccionado = filtroNivel.value;

        let visibles = 0;

        tarjetas.forEach((tarjeta) => {

            const nombre = tarjeta.dataset.nombre.toLowerCase();

            const marca = tarjeta.dataset.marca.toLowerCase();

            const nivel = tarjeta.dataset.nivel;

            const coincideTexto =
                nombre.includes(texto) ||
                marca.includes(texto);

            const coincideNivel =
                nivelSeleccionado === "todos" ||
                nivel === nivelSeleccionado;

            const mostrar = coincideTexto && coincideNivel;

            tarjeta.classList.toggle("oculto", !mostrar);

            if (mostrar) {
                visibles++;
            }

        });

        contador.textContent = visibles;
    }

    buscador.addEventListener("input", filtrarProductos);

    filtroNivel.addEventListener("change", filtrarProductos);

    /**
     * Recuperar carrito guardado.
     *
     * @returns {ProductoCarrito[]}
     */
    function obtenerCarrito() {

        try {

            const guardado = localStorage.getItem("kantubyteCarrito");

            if (!guardado) {
                return [];
            }

            const carrito = JSON.parse(guardado);

            return Array.isArray(carrito) ? carrito : [];

        } catch (error) {

            console.error("Error al recuperar el carrito:", error);

            return [];
        }
    }

    /**
     * Guardar carrito en localStorage.
     *
     * @param {ProductoCarrito[]} carrito
     */
    function guardarCarrito(carrito) {

        localStorage.setItem(
            "kantubyteCarrito",
            JSON.stringify(carrito)
        );
    }

    /**
     * Añadir producto al carrito.
     *
     * @param {string} nombre
     * @param {number} precio
     */
    function agregarAlCarrito(nombre, precio) {

        const carrito = obtenerCarrito();

        const productoExistente = carrito.find(
            (producto) => producto.nombre === nombre
        );

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1,
                categoria: "Refrigeración"
            });

        }

        guardarCarrito(carrito);
    }

    /**
     * Botones de las tarjetas.
     */
    const botones = document.querySelectorAll(".agregar-carrito");

    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            const nombre = boton.dataset.nombre;

            const precio = Number(boton.dataset.precio);

            if (!nombre || !Number.isFinite(precio)) {
                console.error("Datos del producto incorrectos.");
                return;
            }

            agregarAlCarrito(nombre, precio);

            boton.textContent = "¡Añadido al carrito!";

            boton.classList.add("agregado");

            boton.disabled = true;

            setTimeout(() => {

                boton.textContent = "Añadir al carrito";

                boton.classList.remove("agregado");

                boton.disabled = false;

            }, 1500);

        });

    });

    filtrarProductos();

});
