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