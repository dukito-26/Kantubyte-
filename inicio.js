const nombre = localStorage.getItem("kantubyteUsuario");

document.getElementById("saludoUsuario").textContent =
    nombre ? `¡Bienvenid@, ${nombre}!` : "¡Bienvenid@ a Kantubyte!";