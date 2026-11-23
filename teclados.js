
/* =========================================
   KANTUBYTE 🌺
   JAVASCRIPT COMPLETO DE TECLADOS
========================================= */


/* =========================================
   CONFIGURACIÓN
========================================= */

const CLAVE_CARRITO = "kantubyteCarrito";


/* =========================================
   ELEMENTOS HTML
========================================= */

const botonesAgregar = document.querySelectorAll(
    ".agregar-carrito"
);

const buscador = document.getElementById(
    "buscador"
);

const filtroNivel = document.getElementById(
    "filtroNivel"
);

const listaProductos = document.getElementById(
    "listaProductos"
);


/* =========================================
   OBTENER CARRITO
========================================= */

function obtenerCarrito() {

    try {

        const datos = localStorage.getItem(
            CLAVE_CARRITO
        );

        if (!datos) {
            return [];
        }

        const carrito = JSON.parse(datos);

        return Array.isArray(carrito)
            ? carrito
            : [];

    } catch (error) {

        console.error(
            "Error al leer el carrito:",
            error
        );

        return [];

    }

}


/* =========================================
   GUARDAR CARRITO
========================================= */

function guardarCarrito(carrito) {

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );

}


/* =========================================
   AGREGAR PRODUCTO
========================================= */

botonesAgregar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const tarjeta = boton.closest(
            ".producto"
        );

        if (!tarjeta) {

            alert(
                "No se encontró la tarjeta del producto."
            );

            return;

        }


        /* NOMBRE DEL PRODUCTO */

        const elementoNombre =
            tarjeta.querySelector("h3");

        const nombre = elementoNombre
            ? elementoNombre.textContent.trim()
            : "";


        /* PRECIO DEL PRODUCTO */

        const precio = Number(
            boton.getAttribute("data-precio")
        );


        /* IMAGEN DEL PRODUCTO */

        const elementoImagen =
            tarjeta.querySelector("img");

        const imagen = elementoImagen
            ? elementoImagen.getAttribute("src")
            : "";


        /* CATEGORÍA */

        const categoria = "Teclados";


        /* VALIDAR */

        if (!nombre) {

            alert(
                "No se pudo reconocer el nombre del producto."
            );

            return;

        }

        if (
            !Number.isFinite(precio) ||
            precio <= 0
        ) {

            alert(
                "El producto no tiene un precio válido."
            );

            return;

        }


        /* OBTENER CARRITO */

        const carrito = obtenerCarrito();


        /* BUSCAR PRODUCTO EXISTENTE */

        const productoExistente =
            carrito.find(function(producto) {

                return String(
                    producto.nombre || ""
                ).toLowerCase() ===
                nombre.toLowerCase();

            });


        /* SI YA EXISTE */

        if (productoExistente) {

            productoExistente.cantidad =
                Number(
                    productoExistente.cantidad || 1
                ) + 1;

            productoExistente.precio = precio;

            productoExistente.imagen = imagen;

            productoExistente.categoria =
                categoria;

        } else {

            /* PRODUCTO NUEVO */

            carrito.push({

                nombre: nombre,

                precio: precio,

                cantidad: 1,

                categoria: categoria,

                imagen: imagen

            });

        }


        /* GUARDAR CARRITO */

        guardarCarrito(carrito);


        /* CAMBIAR BOTÓN */

        boton.textContent = "Añadido ✓";

        boton.style.backgroundColor = "#20b15a";

        boton.style.color = "#ffffff";


        console.log(
            "Kantubyte: producto agregado",
            {
                nombre: nombre,
                precio: precio,
                cantidad: 1,
                categoria: categoria
            }
        );

    });

});


/* =========================================
   BUSCADOR DE TECLADOS
========================================= */

function buscarTeclados() {

    if (!buscador || !listaProductos) {
        return;
    }

    const textoBuscado =
        buscador.value.toLowerCase().trim();

    const productos =
        listaProductos.querySelectorAll(
            ".producto"
        );

    productos.forEach(function(producto) {

        const textoProducto =
            producto.textContent.toLowerCase();

        const coincide =
            textoProducto.includes(
                textoBuscado
            );

        producto.style.display =
            coincide ? "" : "none";

    });

}


/* =========================================
   FILTRO POR NIVEL
========================================= */

function filtrarNivel() {

    if (!filtroNivel || !listaProductos) {
        return;
    }

    const nivelSeleccionado =
        filtroNivel.value;

    const productos =
        listaProductos.querySelectorAll(
            ".producto"
        );

    productos.forEach(function(producto) {

        const nivel =
            producto.dataset.nivel;

        const coincide =
            nivelSeleccionado === "todos" ||
            nivel === nivelSeleccionado;

        producto.style.display =
            coincide ? "" : "none";

    });

}


/* =========================================
   COMBINAR BUSCADOR Y FILTRO
========================================= */

function aplicarFiltros() {

    if (!listaProductos) {
        return;
    }

    const textoBuscado =
        buscador
        ? buscador.value.toLowerCase().trim()
        : "";

    const nivelSeleccionado =
        filtroNivel
        ? filtroNivel.value
        : "todos";

    const productos =
        listaProductos.querySelectorAll(
            ".producto"
        );

    productos.forEach(function(producto) {

        const textoProducto =
            producto.textContent.toLowerCase();

        const nivel =
            producto.dataset.nivel;

        const coincideTexto =
            textoProducto.includes(
                textoBuscado
            );

        const coincideNivel =
            nivelSeleccionado === "todos" ||
            nivel === nivelSeleccionado;

        producto.style.display =
            coincideTexto && coincideNivel
            ? ""
            : "none";

    });

}


/* =========================================
   EVENTOS DEL BUSCADOR
========================================= */

if (buscador) {

    buscador.addEventListener(
        "input",
        aplicarFiltros
    );

}


/* =========================================
   EVENTOS DEL FILTRO
========================================= */

if (filtroNivel) {

    filtroNivel.addEventListener(
        "change",
        aplicarFiltros
    );

}


/* =========================================
   INICIO
========================================= */

console.log(
    "Kantubyte: teclados.js cargado correctamente."
);
