// 1. Lógica del Loader (con desvanecimiento suave)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0'; // Hace que se desvanezca
        setTimeout(() => {
            loader.style.display = 'none'; // Lo quita del mapa
        }, 500);
    }, 1000); 
});

// 2. Contador de Oferta (3 días desde que el usuario entra)
const countdownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculamos tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Verificamos que los elementos existan en el HTML antes de escribir
    if(document.getElementById("days")) {
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<h3>¡OFERTA EXPIRADA!</h3>";
    }
}, 1000);

// 3. Manejo del Formulario (Formspree)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que la página se recargue
        const data = new FormData(event.target);
        
        // Enviamos los datos a Formspree
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado correctamente.";
            status.className = "success"; // Aplica color verde del CSS
            form.reset(); // Limpia el formulario
        } else {
            status.innerHTML = "Ups! Hubo un problema al enviar tu mensaje.";
            status.className = "error"; // Aplica color rojo del CSS
        }
        
        status.style.display = "block";
    });
}