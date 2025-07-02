console.log('Script loaded');


menu_switch = document.querySelector('#menu_h');
navbar = document.querySelector('#navbar');

// Inicializar navbar como oculta en móvil
if (window.innerWidth <= 768) {
    navbar.classList.add('hidden');
}

menu_switch.addEventListener('click', function() {
    console.log('Menu switch clicked');
    navbar.classList.toggle('hidden');
    menu_switch.classList.toggle('active');
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', function(event) {
    if (!navbar.contains(event.target) && !menu_switch.contains(event.target)) {
        if (window.innerWidth <= 768) {
            navbar.classList.add('hidden');
            menu_switch.classList.remove('active');
        }
    }
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navbar.classList.remove('hidden');
        menu_switch.classList.remove('active');
    } else {
        navbar.classList.add('hidden');
    }
});

// carrusel
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carrusel_conteiner');
    const images = document.querySelectorAll('.carrusel .img');
    let currentIndex = 0;

    function moveSlide() {
        container.style.transform = `translateX(-${currentIndex * 25}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        moveSlide();
    }

    // Cambiar slide cada 3 segundos
    setInterval(nextSlide, 3000);
});