
/**
 * KANTUBYTE 🌺
 * JavaScript de almacenamiento
 *
 * Buscador, filtro y carrito.
 */

/**
 * @typedef {Object} ProductoCarrito
 * @property {string} nombre
 * @property {number} precio
 * @property {number} cantidad
 * @property {string} categoria
 */

/**
 * @typedef {Object} TarjetaProducto
 * @property {HTMLElement} elemento
 * @property {string} nombre
 * @property {string} marca
 * @property {string} nivel
 */

// ===============================
// ELEMENTOS HTML
// ===============================

const contenedor = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");
const filtroNivel = document.getElementById("filtro-nivel");
const contador = document.getElementById("contador-productos");

// ===============================
// TARJETAS DEL HTML
// ===============================

/** @type {TarjetaProducto[]} */
const tarjetas = [];

if (contenedor) {

    contenedor.querySelectorAll(".producto").forEach(
        function (elemento) {

            /** @type {HTMLElement} */
            const tarjeta = elemento;

            tarjetas.push({
                elemento: tarjeta,
                nombre: tarjeta.dataset.nombre || "",
                marca: tarjeta.dataset.marca || "",
                nivel: tarjeta.dataset.nivel || ""
            });

        }
    );

}

// ===============================
// BUSCADOR Y FILTRO
// ===============================

/**
 * Filtra las tarjetas que ya existen en el HTML.
 */
function filtrarProductos() {

    const texto = buscador
        ? buscador.value.toLowerCase().trim()
        : "";

    const nivelSeleccionado = filtroNivel
        ? filtroNivel.value
        : "todos";

    let cantidadVisible = 0;

    tarjetas.forEach(function (tarjeta) {

        const coincideTexto =
            tarjeta.nombre.toLowerCase().includes(texto) ||
            tarjeta.marca.toLowerCase().includes(texto);

        const coincideNivel =
            nivelSeleccionado === "todos" ||
            tarjeta.nivel === nivelSeleccionado;

        const mostrar = coincideTexto && coincideNivel;

        tarjeta.elemento.style.display = mostrar
            ? ""
            : "none";

        if (mostrar) {
            cantidadVisible++;
        }

    });

    if (contador) {
        contador.textContent = String(cantidadVisible);
    }

}

if (buscador) {
    buscador.addEventListener("input", filtrarProductos);
}

if (filtroNivel) {
    filtroNivel.addEventListener("change", filtrarProductos);
}

// ===============================
// CARRITO
// ===============================

/** @type {ProductoCarrito[]} */
let carrito = [];

const carritoGuardado = localStorage.getItem("kantubyteCarrito");

if (carritoGuardado) {

    try {

        const datosGuardados = JSON.parse(carritoGuardado);

        if (Array.isArray(datosGuardados)) {
            carrito = datosGuardados;
        }

    } catch (error) {

        carrito = [];

    }

}

// ===============================
// AÑADIR AL CARRITO
// ===============================

if (contenedor) {

    contenedor.addEventListener("click", function (evento) {

        const objetivo = evento.target;

        if (!(objetivo instanceof Element)) {
            return;
        }

        const boton = objetivo.closest(".agregar-carrito");

        if (!(boton instanceof HTMLButtonElement)) {
            return;
        }

        const nombre = boton.dataset.nombre || "";
        const precio = Number(boton.dataset.precio);

        if (!nombre || !Number.isFinite(precio)) {
            return;
        }

        const productoExistente = carrito.find(
            function (producto) {
                return producto.nombre === nombre;
            }
        );

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            /** @type {ProductoCarrito} */
            const nuevoProducto = {
                nombre: nombre,
                precio: precio,
                cantidad: 1,
                categoria: "Almacenamiento"
            };

            carrito.push(nuevoProducto);

        }

        localStorage.setItem(
            "kantubyteCarrito",
            JSON.stringify(carrito)
        );

        // CONFIRMACIÓN VERDE

        boton.textContent = "¡Añadido al carrito!";
        boton.classList.add("agregado");

        setTimeout(function () {

            boton.textContent = "Añadir al carrito";
            boton.classList.remove("agregado");

        }, 1800);

    });

}

// ===============================
// INICIO
// ===============================

filtrarProductos();
