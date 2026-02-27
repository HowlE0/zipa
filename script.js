// 1. Quitar el loader cuando la página cargue
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
});

// 2. Contador de Oferta (Seteado para 3 días desde hoy)
const countdownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "¡OFERTA EXPIRADA!";
    }
}, 1000);