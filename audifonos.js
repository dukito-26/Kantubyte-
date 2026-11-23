
/**
 * KANTUBYTE 🌺
 * JavaScript de la sección de audífonos
 *
 * @typedef {Object} ProductoCarrito
 * @property {string} nombre
 * @property {number} precio
 * @property {number} cantidad
 * @property {string} categoria
 */

document.addEventListener("DOMContentLoaded", () => {

    const buscador = document.getElementById("buscador");
    const filtroNivel = document.getElementById("filtroNivel");
    const contador = document.getElementById("contador-productos");

    const productos = document.querySelectorAll(".producto");
    const botones = document.querySelectorAll(".agregar-carrito");

    /**
     * @param {string} texto
     * @returns {string}
     */
    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // BUSCADOR Y FILTRO
    function filtrarProductos() {

        const texto = normalizar(buscador.value.trim());
        const nivelSeleccionado = filtroNivel.value;

        let visibles = 0;

        productos.forEach(producto => {

            const contenido = normalizar(producto.textContent);

            const elementoNivel = producto.querySelector(".nivel");

            const nivel = elementoNivel
                ? elementoNivel.textContent.trim()
                : "";

            const coincideTexto = contenido.includes(texto);

            const coincideNivel =
                nivelSeleccionado === "todos" ||
                nivel === nivelSeleccionado;

            if (coincideTexto && coincideNivel) {
                producto.style.display = "";
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

    // OBTENER CARRITO
    /**
     * @returns {ProductoCarrito[]}
     */
    function obtenerCarrito() {
        try {
            const carrito = JSON.parse(
                localStorage.getItem("kantubyteCarrito") || "[]"
            );

            return Array.isArray(carrito) ? carrito : [];

        } catch (error) {
            return [];
        }
    }

    // GUARDAR CARRITO
    /**
     * @param {ProductoCarrito[]} carrito
     */
    function guardarCarrito(carrito) {
        localStorage.setItem(
            "kantubyteCarrito",
            JSON.stringify(carrito)
        );
    }

    // AÑADIR AL CARRITO
    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            const producto = boton.closest(".producto");

            if (!producto) return;

            const nombre = producto.querySelector("h3")
                .textContent.trim();

            const precioTexto = producto.querySelector(".precio")
                .textContent;

            const precio = Number(
                precioTexto.replace(/[^\d]/g, "")
            );

            const carrito = obtenerCarrito();

            const existente = carrito.find(item =>
                item.nombre === nombre
            );

            if (existente) {
                existente.cantidad++;
            } else {
                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1,
                    categoria: "Audífonos"
                });
            }

            guardarCarrito(carrito);

            boton.textContent = "¡Añadido al carrito!";
            boton.disabled = true;

            setTimeout(() => {
                boton.textContent = "Añadir al carrito";
                boton.disabled = false;
            }, 1200);

        });

    });

    // ANIMACIÓN
    productos.forEach((producto, indice) => {

        producto.style.opacity = "0";
        producto.style.transform = "translateY(20px)";

        setTimeout(() => {

            producto.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            producto.style.opacity = "1";
            producto.style.transform = "translateY(0)";

        }, 80 * indice);

    });

    filtrarProductos();

    console.log(
        "Kantubyte: sección de audífonos iniciada correctamente 🌺"
    );

});
