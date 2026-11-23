
document.addEventListener("DOMContentLoaded", () => {

    // TARJETAS DE CATEGORÍAS
    const categorias = document.querySelectorAll(".categoria");

    // Animación de entrada
    categorias.forEach((categoria, indice) => {

        categoria.style.opacity = "0";
        categoria.style.transform = "translateY(25px)";

        setTimeout(() => {
            categoria.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

            categoria.style.opacity = "1";
            categoria.style.transform = "translateY(0)";

        }, 150 * indice);

    });

    // NAVEGACIÓN DE CATEGORÍAS
    categorias.forEach(categoria => {

        const enlace = categoria.querySelector("a");

        if (enlace) {
            enlace.addEventListener("click", () => {

                const nombre =
                    categoria.querySelector("h3").textContent;

                console.log("Kantubyte | Categoría seleccionada:", nombre);

            });
        }

    });

    // MENSAJE DE INICIO
    console.log(
        "🌺 KANTUBYTE | Sección Exteriores iniciada correctamente."
    );

});
