
/**
 * KANTUBYTE 🌺
 * JavaScript de la sección de mouses
 *
 * @typedef {Object} CarritoItem
 * @property {string} nombre
 * @property {number} precio
 * @property {number} cantidad
 * @property {string} categoria
 */

document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.querySelector(".contenedor-productos");
    const buscador = document.querySelector("#buscador");
    const filtro = document.querySelector("#filtroNivel");
    const contador = document.querySelector("#contador-productos");

    if (!contenedor) return;

    const productos = Array.from(
        contenedor.querySelectorAll(".producto")
    );

    // =================================
    // NORMALIZAR TEXTO
    // =================================

    /**
     * @param {string} texto
     * @returns {string}
     */
    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // =================================
    // CONTADOR
    // =================================

    /**
     * @param {number} cantidad
     */
    function actualizarContador(cantidad) {
        if (contador) {
            contador.textContent =
                `${cantidad} productos encontrados`;
        }
    }

    // =================================
    // BUSCADOR Y FILTROS
    // =================================

    function filtrarProductos() {

        const texto = buscador
            ? normalizar(buscador.value)
            : "";

        const calidad = filtro
            ? normalizar(filtro.value)
            : "todos";

        let encontrados = 0;

        productos.forEach(producto => {

            const nombre = normalizar(producto.textContent);

            const nivel = producto.querySelector(".nivel");

            const calidadProducto = nivel
                ? normalizar(nivel.textContent)
                : "";

            const coincideNombre = nombre.includes(texto);

            const coincideCalidad =
                calidad === "todos" ||
                calidadProducto.includes(calidad);

            const mostrar = coincideNombre && coincideCalidad;

            producto.style.display = mostrar ? "" : "none";

            if (mostrar) {
                encontrados++;
            }

        });

        actualizarContador(encontrados);
    }

    if (buscador) {
        buscador.addEventListener("input", filtrarProductos);
    }

    if (filtro) {
        filtro.addEventListener("change", filtrarProductos);
    }

    // =================================
    // SISTEMA DEL CARRITO
    // =================================

    /**
     * @returns {CarritoItem[]}
     */
    function obtenerCarrito() {

        try {

            /** @type {CarritoItem[]} */
            const carrito = JSON.parse(
                localStorage.getItem("kantubyteCarrito") || "[]"
            );

            return Array.isArray(carrito) ? carrito : [];

        } catch (error) {

            console.error("Error al leer el carrito:", error);

            return [];
        }
    }

    /**
     * @param {CarritoItem[]} carrito
     */
    function guardarCarrito(carrito) {

        localStorage.setItem(
            "kantubyteCarrito",
            JSON.stringify(carrito)
        );
    }

    // =================================
    // AGREGAR AL CARRITO
    // =================================

    document.querySelectorAll(".agregar-carrito").forEach(boton => {

        boton.addEventListener("click", () => {

            const tarjeta = boton.closest(".producto");

            if (!tarjeta) return;

            const nombre = tarjeta.querySelector("h3")
                ?.textContent.trim();

            const precioTexto =
                tarjeta.querySelector(".precio")?.textContent || "";

            const precio = Number(
                precioTexto
                    .replace(/[^\d.,]/g, "")
                    .replace(",", ".")
            );

            if (!nombre || !Number.isFinite(precio)) {

                alert("No se pudo obtener la información del producto.");

                return;
            }

            const carrito = obtenerCarrito();

            const existente = carrito.find(
                item =>
                    item.nombre === nombre &&
                    item.categoria === "Mouses"
            );

            if (existente) {

                existente.cantidad++;

            } else {

                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1,
                    categoria: "Mouses"
                });

            }

            guardarCarrito(carrito);

            alert(`🌺 ${nombre} se agregó al carrito.`);

            console.log("Carrito actualizado:", carrito);

        });

    });

    // =================================
    // ANIMACIÓN DE ENTRADA
    // =================================

    productos.forEach((producto, indice) => {

        producto.style.opacity = "0";
        producto.style.transform = "translateY(15px)";

        setTimeout(() => {

            producto.style.transition =
                "opacity .4s ease, transform .4s ease";

            producto.style.opacity = "1";
            producto.style.transform = "translateY(0)";

        }, indice * 50);

    });

    // =================================
    // INICIALIZACIÓN
    // =================================

    actualizarContador(productos.length);

    console.log(
        "Kantubyte: sección de mouses iniciada correctamente 🌺"
    );

});
