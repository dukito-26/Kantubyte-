
/* ========================================
   KANTUBYTE - OTROS PERIFÉRICOS
   Buscador, filtros y carrito
======================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const buscador = document.getElementById("buscador");
    const filtroNivel = document.getElementById("filtroNivel");
    const contador = document.getElementById("contador-productos");

    const productos = document.querySelectorAll(".producto");
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");

    const CLAVE_CARRITO = "kantubyteCarrito";

    /* ========================================
       NORMALIZAR TEXTO
       Permite buscar sin importar tildes
    ======================================== */

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

    /* ========================================
       BUSCADOR Y FILTRO
    ======================================== */

    function filtrarProductos() {

        const textoBusqueda = normalizar(
            buscador.value.trim()
        );

        const nivelSeleccionado = filtroNivel.value;

        let productosVisibles = 0;

        productos.forEach(function (producto) {

            const textoProducto = normalizar(
                producto.textContent || ""
            );

            const nivelProducto = normalizar(
                producto.dataset.nivel || ""
            );

            const coincideTexto =
                textoProducto.includes(textoBusqueda);

            const coincideNivel =
                nivelSeleccionado === "todos" ||
                nivelProducto === normalizar(nivelSeleccionado);

            if (coincideTexto && coincideNivel) {

                producto.style.display = "";

                productosVisibles++;

            } else {

                producto.style.display = "none";

            }

        });

        /* Actualizar contador */

        if (contador) {

            contador.textContent =
                productosVisibles +
                (
                    productosVisibles === 1
                        ? " accesorio encontrado"
                        : " accesorios encontrados"
                );

        }

    }

    buscador.addEventListener(
        "input",
        filtrarProductos
    );

    filtroNivel.addEventListener(
        "change",
        filtrarProductos
    );

    /* ========================================
       OBTENER CARRITO
    ======================================== */

    /**
     * @returns {Array<{
     * nombre: string,
     * precio: number,
     * cantidad: number,
     * categoria: string
     * }>}
     */
    function obtenerCarrito() {

        try {

            const carritoGuardado =
                localStorage.getItem(CLAVE_CARRITO);

            if (carritoGuardado) {

                const carrito = JSON.parse(carritoGuardado);

                if (Array.isArray(carrito)) {
                    return carrito;
                }

            }

            return [];

        } catch (error) {

            console.error(
                "No se pudo leer el carrito:",
                error
            );

            return [];

        }

    }

    /* ========================================
       GUARDAR CARRITO
    ======================================== */

    /**
     * @param {Array<{
     * nombre: string,
     * precio: number,
     * cantidad: number,
     * categoria: string
     * }>} carrito
     */
    function guardarCarrito(carrito) {

        try {

            localStorage.setItem(
                CLAVE_CARRITO,
                JSON.stringify(carrito)
            );

        } catch (error) {

            console.error(
                "No se pudo guardar el carrito:",
                error
            );

            alert(
                "No se pudo guardar el carrito. " +
                "Revisa el almacenamiento de tu navegador."
            );

        }

    }

    /* ========================================
       AGREGAR PRODUCTO AL CARRITO
    ======================================== */

    botonesAgregar.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const tarjeta = boton.closest(".producto");

            if (!tarjeta) {
                return;
            }

            const titulo = tarjeta.querySelector("h3");

            const nombre =
                boton.dataset.nombre ||
                (titulo ? titulo.textContent.trim() : "");

            const precioTexto =
                boton.dataset.precio ||
                tarjeta.querySelector(".precio")?.textContent ||
                "0";

            const precio = Number(
                precioTexto.replace(/[^\d.]/g, "")
            );

            const categoria = "Otros periféricos";

            /* Validar producto */

            if (
                !nombre ||
                !Number.isFinite(precio) ||
                precio <= 0
            ) {

                alert(
                    "No se pudo agregar este producto. " +
                    "Revisa su nombre y precio."
                );

                return;

            }

            /**
             * @type {Array<{
             * nombre: string,
             * precio: number,
             * cantidad: number,
             * categoria: string
             * }>}
             */
            let carrito = obtenerCarrito();

            /* Buscar producto existente */

            const productoExistente = carrito.find(
                function (item) {

                    return item.nombre === nombre;

                }
            );

            if (productoExistente) {

                productoExistente.cantidad++;

            } else {

                carrito.push({

                    nombre: nombre,
                    precio: precio,
                    cantidad: 1,
                    categoria: categoria

                });

            }

            /* Guardar carrito */

            guardarCarrito(carrito);

            /* Aviso en el botón */

            const textoOriginal = boton.textContent;

            boton.textContent = "¡Agregado al carrito!";

            boton.disabled = true;

            setTimeout(function () {

                boton.textContent = textoOriginal;

                boton.disabled = false;

            }, 1200);

            alert(
                nombre +
                " se agregó al carrito correctamente."
            );

        });

    });

    /* ========================================
       INICIAR PÁGINA
    ======================================== */

    filtrarProductos();

});
