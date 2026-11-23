/**
 * KANTUBYTE 🌺
 * JavaScript de la sección de gabinetes
 */

/**
 * @typedef {Object} ProductoCarrito
 * @property {string} nombre
 * @property {number} precio
 * @property {number} cantidad
 * @property {string} categoria
 */

/**
 * Normaliza texto para facilitar las búsquedas.
 * @param {string} texto
 * @returns {string}
 */
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscador");
    const filtroNivel = document.getElementById("filtroNivel");
    const contador = document.getElementById("contador-productos");
    const productos = document.querySelectorAll(".producto");

    /**
     * Aplica el buscador y el filtro de calidad.
     */
    function filtrarProductos() {
        const busqueda = normalizar(buscador.value.trim());
        const nivelElegido = filtroNivel.value;
        let visibles = 0;

        productos.forEach(producto => {
            const contenido = normalizar(producto.textContent);
            const nivel = producto.querySelector(".nivel").textContent.trim();

            const coincideTexto = contenido.includes(busqueda);
            const coincideNivel =
                nivelElegido === "todos" || nivel === nivelElegido;

            if (coincideTexto && coincideNivel) {
                producto.style.display = "";
                visibles++;
            } else {
                producto.style.display = "none";
            }
        });

        contador.textContent = visibles + 
            (visibles === 1 ? " producto encontrado" : " productos encontrados");
    }

    buscador.addEventListener("input", filtrarProductos);
    filtroNivel.addEventListener("change", filtrarProductos);

    /**
     * Obtiene el carrito guardado.
     * @returns {ProductoCarrito[]}
     */
    function obtenerCarrito() {
        try {
            return JSON.parse(localStorage.getItem("kantubyteCarrito")) || [];
        } catch (error) {
            return [];
        }
    }

    /**
     * Guarda el carrito.
     * @param {ProductoCarrito[]} carrito
     */
    function guardarCarrito(carrito) {
        localStorage.setItem("kantubyteCarrito", JSON.stringify(carrito));
    }

    /**
     * Agrega un gabinete al carrito.
     */
    document.querySelectorAll(".agregar-carrito").forEach(boton => {
        boton.addEventListener("click", () => {
            const tarjeta = boton.closest(".producto");
            const nombre = tarjeta.querySelector("h3").textContent.trim();

            const precioTexto = tarjeta.querySelector(".precio")
                .textContent.replace(/[^\d]/g, "");

            const precio = Number(precioTexto);

            let carrito = obtenerCarrito();

            const existente = carrito.find(producto =>
                producto.nombre === nombre &&
                producto.categoria === "Gabinetes"
            );

            if (existente) {
                existente.cantidad++;
            } else {
                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1,
                    categoria: "Gabinetes"
                });
            }

            guardarCarrito(carrito);

            boton.textContent = "¡Agregado!";
            boton.style.background = "#477B55";

            setTimeout(() => {
                boton.textContent = "Agregar al carrito";
                boton.style.background = "";
            }, 1300);
        });
    });

    /**
     * Animación de entrada de las tarjetas.
     */
    productos.forEach((producto, indice) => {
        producto.style.opacity = "0";
        producto.style.transform = "translateY(15px)";

        setTimeout(() => {
            producto.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            producto.style.opacity = "1";
            producto.style.transform = "translateY(0)";
        }, indice * 70);
    });

    console.log("Kantubyte: sección de gabinetes iniciada 🌺");
});