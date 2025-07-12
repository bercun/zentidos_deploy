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




// cards testimonios

// Testimonios de ejemplo
    const data = [
      {
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Maria Menounos",
        role: "clienta",
        text: "Fui a Zentidos con una experiencia de BigBox y estuvo estupendo todo, las manos y el trato de Ruth fueron espectaculares, ya volveré"
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        name: "Serena Williams",
        role: "Clienta",
        text: "Una experiencia totalmente excepcional. Nati una genia absoluta y super atenta a responder cada duda, salí completamente relajada y feliz con su atención al detalle"
      },
      {
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
        name: "Marc Benioff",
        role: "Cliente",
        text: "Excelente experiencia. Perfilado de cejas y masaje impecables. Lugar muy tranquilo, personal profesional y amable. Salí completamente relajada. Sin duda volveré. Muy recomendado."
      }
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    const indicatorsContainer = document.querySelector('.indicators');
    let current = 0;
    let running = false;

    // Crear indicadores dinámicamente
    function renderIndicators() {
      indicatorsContainer.innerHTML = '';
      data.forEach((_, i) => {
        const el = document.createElement('span');
        el.className = 'indicator' + (i === current ? ' active' : '');
        el.addEventListener('click', () => {
          if (i === current || running) return;
          animateTransition(i, i > current || (i === 0 && current === data.length-1) ? 1 : -1);
        });
        indicatorsContainer.appendChild(el);
      });
    }

    // Obtener índices de tarjetas izquierda, centro y derecha
    function getIndices(center, total) {
      const left = (center - 1 + total) % total;
      const right = (center + 1) % total;
      return {left, center, right};
    }

    // Renderizar las tarjetas
    function renderCards(centerIdx) {
      carouselTrack.innerHTML = '';
      const {left, center, right} = getIndices(centerIdx, data.length);
      const positions = ['left', 'center', 'right'];
      [left, center, right].forEach((idx, pos) => {
        const t = document.createElement('div');
        t.classList.add('testimonial');
        t.classList.add(positions[pos]);
        t.innerHTML = `
          <img class="avatar" src="${data[idx].avatar}" alt="${data[idx].name}">
          <div class="name">${data[idx].name}</div>
          <div class="role">${data[idx].role}</div>
          <div class="text">${data[idx].text}</div>
        `;
        carouselTrack.appendChild(t);
      });
    }

    // Animar la transición horizontal
    function animateTransition(nextIdx, direction = 1) {
      if (running) return;
      running = true;
      const testimonials = document.querySelectorAll('.testimonial');
      const oldCenter = testimonials[1];

      // Animar el centro hacia la izquierda/derecha y desvanecerlo
      gsap.to(oldCenter, {
        x: direction > 0 ? -230 : 230,
        scale: 0.88,
        opacity: 0.8,
        filter: "blur(2px) grayscale(0.3)",
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => {
          renderCards(nextIdx);
          const newTestimonials = document.querySelectorAll('.testimonial');
          const newCenter = newTestimonials[1];
          gsap.fromTo(newCenter,
            {x: direction > 0 ? 230 : -230, scale: 0.88, opacity: 0.8, filter: "blur(2px) grayscale(0.3)"},
            {x: 0, scale: 1, opacity: 1, filter: "none", duration: 0.5, ease: "power2.out", onComplete: () => {
              running = false;
            }}
          );
        }
      });
      // Actualizar indicadores
      current = nextIdx;
      renderIndicators();
    }

    // Inicializar
    renderCards(current);
    renderIndicators();

    // Auto-play opcional
    setInterval(() => {
      if (running) return;
      const next = (current + 1) % data.length;
      animateTransition(next, 1);
    }, 6000);