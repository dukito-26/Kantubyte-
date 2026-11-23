
/* =====================================
   KANTUBYTE 🌺
   CARRITO Y PEDIDOS COMPLETO
===================================== */

const CLAVE_CARRITO = "kantubyteCarrito";
const WHATSAPP_TIENDA = "59175268691";

/* ELEMENTOS HTML */

const lista = document.getElementById("lista-carrito");
const vacio = document.getElementById("carrito-vacio");
const cantidadArticulos = document.getElementById("cantidad-articulos");

const subtotalHTML = document.getElementById("subtotal");
const totalHTML = document.getElementById("total");
const costoEntregaHTML = document.getElementById("costo-entrega");

const formulario = document.getElementById("form-pedido");
const datosDomicilio = document.getElementById("datos-domicilio");
const textoPago = document.getElementById("texto-pago");


/* =====================================
   LEER Y GUARDAR CARRITO
===================================== */

function obtenerCarrito() {
    try {
        const datos = localStorage.getItem(CLAVE_CARRITO);
        const carrito = JSON.parse(datos || "[]");

        return Array.isArray(carrito) ? carrito : [];
    } catch (error) {
        console.error("Error leyendo carrito:", error);
        return [];
    }
}

function guardarCarrito(carrito) {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch (error) {
        console.error("Error guardando carrito:", error);
        alert("No se pudo guardar el carrito.");
    }
}


/* =====================================
   MOSTRAR PRODUCTOS
===================================== */

function mostrarCarrito() {
    const carrito = obtenerCarrito();

    lista.innerHTML = "";

    const estaVacio = carrito.length === 0;

    vacio.style.display = estaVacio ? "block" : "none";
    lista.style.display = estaVacio ? "none" : "grid";

    let unidades = 0;

    carrito.forEach(function(producto, indice) {
        const precio = Number(producto.precio) || 0;
        const cantidad = Math.max(1, Number(producto.cantidad) || 1);
        const subtotal = precio * cantidad;

        unidades += cantidad;

        const tarjeta = document.createElement("article");
        tarjeta.className = "producto-carrito";

        tarjeta.innerHTML = `
            <img
                src=""
                alt="Imagen del producto"
                class="imagen-producto-carrito"
            >

            <div class="informacion-producto">
                <h3></h3>

                <p class="precio-unitario">
                    Precio: Bs. ${precio.toFixed(2)}
                </p>

                <div class="controles-cantidad">
                    <button type="button" class="cantidad-menos">−</button>
                    <span class="cantidad">${cantidad}</span>
                    <button type="button" class="cantidad-mas">+</button>
                </div>

                <p class="subtotal-producto">
                    Subtotal: Bs. ${subtotal.toFixed(2)}
                </p>

                <button type="button" class="eliminar-producto">
                    Eliminar
                </button>
            </div>
        `;

        tarjeta.querySelector("h3").textContent =
            producto.nombre || "Producto";

        const imagen = tarjeta.querySelector("img");

        if (producto.imagen) {
            imagen.src = producto.imagen;

            imagen.onerror = function() {
                imagen.style.display = "none";
            };
        } else {
            imagen.style.display = "none";
        }

        tarjeta.querySelector(".cantidad-mas")
            .addEventListener("click", function() {
                cambiarCantidad(indice, 1);
            });

        tarjeta.querySelector(".cantidad-menos")
            .addEventListener("click", function() {
                cambiarCantidad(indice, -1);
            });

        tarjeta.querySelector(".eliminar-producto")
            .addEventListener("click", function() {
                eliminarProducto(indice);
            });

        lista.appendChild(tarjeta);
    });

    cantidadArticulos.textContent =
        unidades + (unidades === 1 ? " artículo" : " artículos");

    actualizarTotal();
}


/* =====================================
   CAMBIAR CANTIDAD
===================================== */

function cambiarCantidad(indice, cambio) {
    const carrito = obtenerCarrito();

    if (!carrito[indice]) return;

    const cantidadActual = Number(carrito[indice].cantidad) || 1;

    carrito[indice].cantidad = cantidadActual + cambio;

    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    guardarCarrito(carrito);
    mostrarCarrito();
}


/* =====================================
   ELIMINAR PRODUCTO
===================================== */

function eliminarProducto(indice) {
    const carrito = obtenerCarrito();

    if (!carrito[indice]) return;

    carrito.splice(indice, 1);

    guardarCarrito(carrito);
    mostrarCarrito();
}


/* =====================================
   CALCULAR TOTALES
===================================== */

function calcularTotal() {
    const carrito = obtenerCarrito();

    return carrito.reduce(function(suma, producto) {
        const precio = Number(producto.precio) || 0;
        const cantidad = Math.max(1, Number(producto.cantidad) || 1);

        return suma + precio * cantidad;
    }, 0);
}

function actualizarTotal() {
    const subtotal = calcularTotal();

    // El costo de entrega queda en cero
    // hasta que la tienda establezca una tarifa.
    const costoEntrega = 0;

    const total = subtotal + costoEntrega;

    subtotalHTML.textContent = "Bs. " + subtotal.toFixed(2);
    totalHTML.textContent = "Bs. " + total.toFixed(2);

    if (costoEntregaHTML) {
        costoEntregaHTML.textContent =
            "Bs. " + costoEntrega.toFixed(2);
    }
}


/* =====================================
   ENTREGA
===================================== */

function actualizarEntrega() {
    const entrega = document.querySelector(
        'input[name="entrega"]:checked'
    );

    const esDomicilio = entrega?.value === "domicilio";

    datosDomicilio.classList.toggle("oculto", !esDomicilio);
}

document.querySelectorAll('input[name="entrega"]')
    .forEach(function(opcion) {
        opcion.addEventListener("change", actualizarEntrega);
    });


/* =====================================
   MÉTODO DE PAGO
===================================== */

function actualizarPago() {
    const pago = document.querySelector(
        'input[name="pago"]:checked'
    );

    if (pago?.value === "tarjeta") {
        textoPago.textContent =
            "Opción demostrativa. No ingreses datos reales de tarjeta.";
    } else {
        textoPago.textContent =
            "El pago por Yape se coordinará por WhatsApp.";
    }
}

document.querySelectorAll('input[name="pago"]')
    .forEach(function(opcion) {
        opcion.addEventListener("change", actualizarPago);
    });


/* =====================================
   COPIAR PEDIDO
===================================== */

async function copiarPedido(mensaje) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(mensaje);
        } else {
            const temporal = document.createElement("textarea");

            temporal.value = mensaje;
            temporal.style.position = "fixed";
            temporal.style.opacity = "0";

            document.body.appendChild(temporal);

            temporal.select();

            const copiado = document.execCommand("copy");

            temporal.remove();

            if (!copiado) {
                throw new Error("No se pudo copiar el pedido.");
            }
        }

        alert("¡Pedido copiado! Ahora puedes pegarlo en WhatsApp.");
    } catch (error) {
        console.error("Error al copiar:", error);
        alert("No se pudo copiar automáticamente. Intenta seleccionar y copiar el mensaje.");
    }
}


/* =====================================
   CONFIRMAR PEDIDO
===================================== */

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();

    const entrega = document.querySelector(
        'input[name="entrega"]:checked'
    )?.value || "recepcion";

    const pago = document.querySelector(
        'input[name="pago"]:checked'
    )?.value || "yape";

    if (!nombre || !correo) {
        alert("Completa tu nombre y correo.");
        return;
    }

    if (entrega === "domicilio") {
        const direccion = document.getElementById("direccion").value.trim();

        if (!direccion) {
            alert("Escribe tu dirección de entrega.");
            return;
        }
    }

    if (!WHATSAPP_TIENDA) {
        alert("Revisa el número de WhatsApp de Kantubyte.");
        return;
    }

    /* CREAR MENSAJE */

    let mensaje = "🌺 KANTUBYTE - PEDIDO 🌺\n\n";

    mensaje += "Cliente: " + nombre + "\n";
    mensaje += "Correo: " + correo + "\n\n";

    mensaje += "PRODUCTOS:\n\n";

    carrito.forEach(function(producto) {
        const precio = Number(producto.precio) || 0;
        const cantidad = Math.max(1, Number(producto.cantidad) || 1);
        const subtotal = precio * cantidad;

        mensaje += "- " + (producto.nombre || "Producto") + "\n";
        mensaje += "  Cantidad: " + cantidad + "\n";
        mensaje += "  Precio unitario: Bs. " + precio.toFixed(2) + "\n";
        mensaje += "  Subtotal: Bs. " + subtotal.toFixed(2) + "\n\n";
    });

    const subtotalGeneral = calcularTotal();
    const costoEntrega = 0;
    const total = subtotalGeneral + costoEntrega;

    mensaje += "Subtotal: Bs. " + subtotalGeneral.toFixed(2) + "\n";
    mensaje += "Entrega: Bs. " + costoEntrega.toFixed(2) + "\n";
    mensaje += "TOTAL: Bs. " + total.toFixed(2) + "\n\n";

    /* DATOS DE ENTREGA */

    if (entrega === "domicilio") {
        mensaje += "ENTREGA A DOMICILIO\n";

        mensaje += "Dirección: " +
            document.getElementById("direccion").value.trim() + "\n";

        mensaje += "Referencia: " +
            document.getElementById("referencia").value.trim() + "\n";

        mensaje += "Google Maps: " +
            document.getElementById("maps").value.trim() + "\n\n";
    } else {
        mensaje += "Entrega: Recepción en Kantubyte\n\n";
    }

    /* MÉTODO DE PAGO */

    mensaje += "Método de pago: " +
        (pago === "yape" ? "Yape" : "Tarjeta (demostración)") + "\n\n";

    mensaje += "Pedido para coordinar la reservación.";

    /* CREAR ENLACE */

    const enlace = "https://wa.me/" +
        WHATSAPP_TIENDA +
        "?text=" +
        encodeURIComponent(mensaje);

    /* MOSTRAR OPCIONES */

    let contenedor = document.getElementById("enlace-whatsapp-pedido");

    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "enlace-whatsapp-pedido";
        formulario.appendChild(contenedor);
    }

    contenedor.innerHTML = "";

    const titulo = document.createElement("p");
    titulo.textContent = "¡Tu pedido está preparado!";
    contenedor.appendChild(titulo);

    const botonCopiar = document.createElement("button");
    botonCopiar.type = "button";
    botonCopiar.textContent = "COPIAR PEDIDO";

    botonCopiar.addEventListener("click", function() {
        copiarPedido(mensaje);
    });

    contenedor.appendChild(botonCopiar);

    const enlaceWhatsApp = document.createElement("a");

    enlaceWhatsApp.href = enlace;
    enlaceWhatsApp.target = "_blank";
    enlaceWhatsApp.rel = "noopener noreferrer";
    enlaceWhatsApp.textContent = "CONTINUAR CON MI PEDIDO EN WHATSAPP";

    contenedor.appendChild(enlaceWhatsApp);

    const indicacion = document.createElement("p");

    indicacion.textContent =
        "Si WhatsApp no se abre, copia tu pedido y abre este enlace desde Chrome.";

    contenedor.appendChild(indicacion);
});


/* =====================================
   INICIAR CARRITO
===================================== */

mostrarCarrito();
actualizarEntrega();
actualizarPago();
