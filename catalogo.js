
document.addEventListener("DOMContentLoaded", () => {

    const categorias = document.querySelectorAll(".categoria");

    // Animación de entrada de las categorías
    categorias.forEach((categoria, indice) => {
        categoria.style.opacity = "0";
        categoria.style.transform = "translateY(20px)";

        setTimeout(() => {
            categoria.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            categoria.style.opacity = "1";
            categoria.style.transform = "translateY(0)";
        }, 150 * indice);
    });

    // Comprobar los enlaces de las categorías
    categorias.forEach(categoria => {
        const enlace = categoria.querySelector("a");

        if (enlace) {
            enlace.addEventListener("click", () => {
                console.log("Entrando a:", enlace.textContent.trim());
            });
        }
    });

    console.log("Kantubyte: catálogo iniciado correctamente 🌺");

});
