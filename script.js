// 1. Lógica del Loader - CORREGIDA
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0'; 
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000); 
    }
});

// 2. Contador de Oferta - Con seguridad de IDs
const countdownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Elementos del DOM
    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    // Solo ejecutamos si los elementos existen
    if (d && h && m && s) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        d.innerText = days.toString().padStart(2, '0');
        h.innerText = hours.toString().padStart(2, '0');
        m.innerText = minutes.toString().padStart(2, '0');
        s.innerText = seconds.toString().padStart(2, '0');
    }

    if (distance < 0) {
        clearInterval(timer);
        const container = document.getElementById("countdown");
        if (container) container.innerHTML = "<h3>¡OFERTA EXPIRADA!</h3>";
    }
}, 1000);

// 3. Manejo del Formulario
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form && status) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado.";
                status.className = "success";
                status.style.display = "block";
                form.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            status.innerHTML = "Hubo un error al enviar.";
            status.className = "error";
            status.style.display = "block";
        }
    });
}