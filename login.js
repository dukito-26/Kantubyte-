
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Mostrar u ocultar contraseña
togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Ocultar";
    } else {
        password.type = "password";
        togglePassword.textContent = "Mostrar";
    }
});

// Validar formulario
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = username.value.trim();
    const correo = email.value.trim();
    const clave = password.value;

    // Comprobar campos
    if (!nombre || !correo || !clave) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validar correo
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        alert("Introduce un correo electrónico válido.");
        return;
    }

    const cantidadNumeros = (clave.match(/\d/g) || []).length;

if (clave.length < 6 || cantidadNumeros < 2) {
    alert("La contraseña debe tener al menos 6 caracteres y 2 números.");
    return;
}

    // Guardar datos básicos de demostración
    localStorage.setItem("kantubyteUsuario", nombre);
    localStorage.setItem("kantubyteCorreo", correo);

    alert("¡Bienvenido a Kantubyte, " + nombre + "!");

    // Ir a la página principal
    window.location.href = "inicio.html";
});
