
/* ========================================
   KANTUBYTE 🌺
   JAVASCRIPT - MEMORIAS RAM
======================================== */

/**
 * @typedef {Object} ProductoCarrito
 * @property {string} nombre
 * @property {number} precio
 * @property {number} cantidad
 * @property {string} categoria
 */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS
    const buscador = document.getElementById("buscador");
    const filtroNivel = document.getElementById("filtro-nivel");
    const contador = document.getElementById("contador-productos");

    const productos = document.querySelectorAll(".producto");
    const botones = document.querySelectorAll(".agregar-carrito");

    // ========================================
    // BUSCADOR Y FILTRO
    // ========================================

    function filtrarProductos() {

        const texto = buscador.value.toLowerCase().trim();
        const nivelSeleccionado = filtroNivel.value;

        let visibles = 0;

        productos.forEach(producto => {

            const nombre = producto
                .querySelector("h3")
                .textContent
                .toLowerCase();

            const marca = producto
                .querySelector(".marca-producto")
                .textContent
                .toLowerCase();

            const nivel = producto
                .querySelector(".nivel")
                .dataset.nivel;

            const coincideTexto =
                nombre.includes(texto) ||
                marca.includes(texto);

            const coincideNivel =
                nivelSeleccionado === "todos" ||
                nivel === nivelSeleccionado;

            if (coincideTexto && coincideNivel) {

                producto.style.display = "flex";
                visibles++;

            } else {

                producto.style.display = "none";

            }

        });

        contador.textContent =
            `Mostrando ${visibles} de ${productos.length} productos`;

    }

    buscador.addEventListener("input", filtrarProductos);
    filtroNivel.addEventListener("change", filtrarProductos);


    // ========================================
    // CARRITO
    // ========================================

    /**
     * Obtiene el carrito guardado.
     * @returns {ProductoCarrito[]}
     */
    function obtenerCarrito() {

        try {

            const carritoGuardado =
                localStorage.getItem("kantubyteCarrito");

            return carritoGuardado
                ? JSON.parse(carritoGuardado)
                : [];

        } catch (error) {

            console.error("Error al leer el carrito:", error);
            return [];

        }

    }


    /**
     * Guarda el carrito.
     * @param {ProductoCarrito[]} carrito
     */
    function guardarCarrito(carrito) {

        localStorage.setItem(
            "kantubyteCarrito",
            JSON.stringify(carrito)
        );

    }


    // ========================================
    // AÑADIR PRODUCTOS
    // ========================================

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            const nombre = boton.dataset.nombre;
            const precio = Number(boton.dataset.precio);

            if (!nombre || !Number.isFinite(precio)) {
                console.error("Producto inválido:", nombre);
                return;
            }

            const carrito = obtenerCarrito();

            const productoExistente = carrito.find(
                producto =>
                    producto.nombre === nombre &&
                    producto.categoria === "Memorias RAM"
            );

            if (productoExistente) {

                productoExistente.cantidad++;

            } else {

                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1,
                    categoria: "Memorias RAM"
                });

            }

            guardarCarrito(carrito);

            // BOTÓN VERDE
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


    // ========================================
    // INICIO
    // ========================================

    filtrarProductos();

});
