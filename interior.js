
"use strict";

/* =========================================
   KANTUBYTE - CATEGORÍAS DE INTERIORES
   ========================================= */

const categoriasInterior = [
    {
        nombre: "Procesadores",
        descripcion: "CPU Intel y AMD para diferentes niveles de rendimiento.",
        enlace: "procesadores.html",
        imagen: "imagenes/procesador.jpg",
        alt: "Procesador de computadora"
    },
    {
        nombre: "Placas madre",
        descripcion: "Motherboards para conectar y organizar los componentes.",
        enlace: "placas.html",
        imagen: "imagenes/placa-madre.jpg",
        alt: "Placa madre de computadora"
    },
    {
        nombre: "Memorias RAM",
        descripcion: "Memorias DDR para mejorar la fluidez de tu computadora.",
        enlace: "ram.html",
        imagen: "imagenes/memoria-ram.jpg",
        alt: "Módulos de memoria RAM"
    },
    {
        nombre: "Tarjetas gráficas",
        descripcion: "GPU para videojuegos, diseño y edición digital.",
        enlace: "graficas.html",
        imagen: "imagenes/tarjeta-grafica.jpg",
        alt: "Tarjeta gráfica de computadora"
    },
    {
        nombre: "Almacenamiento",
        descripcion: "SSD, HDD y unidades NVMe para guardar tus archivos.",
        enlace: "almacenamiento.html",
        imagen: "imagenes/ssd.jpg",
        alt: "Unidad de almacenamiento SSD"
    },
    {
        nombre: "Fuentes de poder",
        descripcion: "Fuentes de alimentación para energía estable.",
        enlace: "fuentes.html",
        imagen: "imagenes/fuente-poder.jpg",
        alt: "Fuente de poder para computadora"
    },
    {
        nombre: "Refrigeración",
        descripcion: "Ventiladores, disipadores y refrigeración líquida.",
        enlace: "refrigeracion.html",
        imagen: "imagenes/refrigeracion.jpg",
        alt: "Sistema de refrigeración para PC"
    }
];

/* =========================================
   MOSTRAR TARJETAS
   ========================================= */

function mostrarCategoriasInterior() {
    const contenedor = document.querySelector(".contenedor-categorias");

    if (!contenedor) {
        console.warn("No se encontró el contenedor de categorías.");
        return;
    }

    contenedor.innerHTML = "";

    categoriasInterior.forEach((categoria) => {
        const tarjeta = document.createElement("article");

        tarjeta.className = "categoria";

        tarjeta.innerHTML = `
            <img
                src="${categoria.imagen}"
                alt="${categoria.alt}"
                loading="lazy"
            >

            <div class="contenido">
                <h3>${categoria.nombre}</h3>

                <p>${categoria.descripcion}</p>

                <a href="${categoria.enlace}">
                    Ver productos →
                </a>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}

/* =========================================
   INICIAR
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    mostrarCategoriasInterior
);
