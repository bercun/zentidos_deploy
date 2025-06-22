console.log('Script loaded');


menu_switch = document.querySelector('#menu_h');
navbar = document.querySelector('#navbar');

menu_switch.addEventListener('click', function() {
    console.log('Menu switch clicked');
    if (navbar.classList.contains('hidden')) {
        navbar.classList.remove('hidden');
        } else {
        navbar.classList.add('hidden');
        menu_switch.classList.remove('active');
        console.log('Menu closed');
    }
});
// Close the menu when clicking outside of it   
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