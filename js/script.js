console.log('Script loaded');

// --- LÓGICA DEL MENÚ DE NAVEGACIÓN ---
const menu_switch = document.querySelector('#menu_h');
const navbar = document.querySelector('#navbar');

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

// --- ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE CARGADO ---
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL CARRUSEL SUPERIOR ---
    const carruselContainer = document.querySelector('.carrusel_conteiner');
    if (carruselContainer) {
        const images = document.querySelectorAll('.carrusel .img');
        let currentIndex = 0;

        function moveSlide() {
            carruselContainer.style.transform = `translateX(-${currentIndex * 25}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            moveSlide();
        }
        setInterval(nextSlide, 3000);
    }

    // --- LÓGICA DEL CARRUSEL DE TESTIMONIOS ---
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const data = [
          { avatar: "https://randomuser.me/api/portraits/women/44.jpg", name: "Maria Menounos", role: "clienta", text: "Fui a Zentidos con una experiencia de BigBox y estuvo estupendo todo, las manos y el trato de Ruth fueron espectaculares, ya volveré" },
          { avatar: "https://randomuser.me/api/portraits/women/45.jpg", name: "Serena Williams", role: "Clienta", text: "Una experiencia totalmente excepcional. Nati una genia absoluta y super atenta a responder cada duda, salí completamente relajada y feliz con su atención al detalle" },
          { avatar: "https://randomuser.me/api/portraits/men/46.jpg", name: "Marc Benioff", role: "Cliente", text: "Excelente experiencia. Perfilado de cejas y masaje impecables. Lugar muy tranquilo, personal profesional y amable. Salí completamente relajada. Sin duda volveré. Muy recomendado." }
        ];

        const indicatorsContainer = document.querySelector('.indicators');
        let current = 0;
        let running = false;

        function renderIndicators() {
          indicatorsContainer.innerHTML = '';
          data.forEach((_, i) => {
            const el = document.createElement('span');
            el.className = 'indicator' + (i === current ? ' active' : '');
            el.addEventListener('click', () => {
              if (i === current || running) return;
              animateTransition(i, i > current || (i === 0 && current === data.length - 1) ? 1 : -1);
            });
            indicatorsContainer.appendChild(el);
          });
        }

        function getIndices(center, total) {
          const left = (center - 1 + total) % total;
          const right = (center + 1) % total;
          return { left, center, right };
        }

        function renderCards(centerIdx) {
          carouselTrack.innerHTML = '';
          const { left, center, right } = getIndices(centerIdx, data.length);
          const positions = ['left', 'center', 'right'];
          [left, center, right].forEach((idx, pos) => {
            const t = document.createElement('div');
            t.classList.add('testimonial');
            t.classList.add(positions[pos]);
            t.innerHTML = `<img class="avatar" src="${data[idx].avatar}" alt="${data[idx].name}"><div class="name">${data[idx].name}</div><div class="role">${data[idx].role}</div><div class="text">${data[idx].text}</div>`;
            carouselTrack.appendChild(t);
          });
        }

        function animateTransition(nextIdx, direction = 1) {
          if (running) return;
          running = true;
          const testimonials = document.querySelectorAll('.testimonial');
          const oldCenter = testimonials[1];

          gsap.to(oldCenter, {
            x: direction > 0 ? -230 : 230, scale: 0.88, opacity: 0.8, filter: "blur(2px) grayscale(0.3)", duration: 0.45, ease: "power2.in",
            onComplete: () => {
              renderCards(nextIdx);
              const newTestimonials = document.querySelectorAll('.testimonial');
              const newCenter = newTestimonials[1];
              gsap.fromTo(newCenter,
                { x: direction > 0 ? 230 : -230, scale: 0.88, opacity: 0.8, filter: "blur(2px) grayscale(0.3)" },
                { x: 0, scale: 1, opacity: 1, filter: "none", duration: 0.5, ease: "power2.out", onComplete: () => { running = false; } }
              );
            }
          });
          current = nextIdx;
          renderIndicators();
        }

        renderCards(current);
        renderIndicators();
        setInterval(() => {
          if (running) return;
          const next = (current + 1) % data.length;
          animateTransition(next, 1);
        }, 6000);
    }

    // --- LÓGICA DEL POPOVER DE SERVICIOS (MODAL) ---
    const modal = document.getElementById('modal_window');
    if (modal) {
        const overlay = document.getElementById('overlay');
        const modalTitle = document.getElementById('modal_title');
        const modalDescription = document.getElementById('modal_description');
        const modalImgTop = document.getElementById('modal_image_top');
        const modalImgBottom = document.getElementById('modal_image_bottom');
        const closeBtn = document.querySelector('.close_btn');
        const menuItems = document.querySelectorAll('.menu_item');

        const modalData = {
            indiba_facial: { 
              title: "Indiba Facial", 
              description: `INDIBA es una avanzada tecnología de radiofrecuencia que mejora la firmeza y apariencia de la piel, estimulando la circulación y la producción de colágeno y elastina. Este tratamiento no invasivo es ideal para combatir la flacidez, la celulitis y la grasa localizada, logrando un contorno corporal más definido y un cuerpo más tonificado. Los resultados son visibles desde las primeras sesiones, sin necesidad de tiempo de recuperación.
              Entre sus beneficios destacan la mejora de la elasticidad de la piel, la reducción de la celulitis, y la estimulación del drenaje linfático, contribuyendo a una piel más suave y saludable. Además, INDIBA favorece la circulación sanguínea, mejorando la oxigenación de los tejidos, y acelera la recuperación muscular, lo que lo convierte en un tratamiento ideal para deportistas.
              El Pack Body Sculpture de INDIBA ofrece electrodos especializados que tratan zonas específicas del cuerpo con máxima eficacia, asegurando resultados precisos y duraderos. Con su tecnología, puedes reducir la celulitis, eliminar la grasa localizada y remodelar el cuerpo de manera eficaz, adaptándose a las necesidades individuales de cada persona.`, 
              imageTopUrl: "./img/servicios/popover/Indiba corporal.webp", 
              imageBottomUrl: "https://placehold.co/250x120/007bff/white?text=Gráfico+Indiba+Facial" },
            indiba_corporal: { title: "Indiba Corporal", description: "Tratamiento corporal con tecnología Indiba para mejorar la circulación y reducir la celulitis.", imageTopUrl: "https://placehold.co/100x100/28a745/white?text=Icono+Indiba+Corporal", imageBottomUrl: "https://placehold.co/250x120/28a745/white?text=Gráfico+Indiba+Corporal" },
            indiba_capilar: { title: "Indiba Capilar", description: "Tratamiento capilar con tecnología Indiba para fortalecer el cabello y mejorar su salud.", imageTopUrl: "https://placehold.co/100x100/dc3545/white?text=Icono+Indiba+Capilar", imageBottomUrl: "https://placehold.co/250x120/dc3545/white?text=Gráfico+Indiba+Capilar" }
        };

        let isModalOpen = false;

        const openModal = (targetElement) => {
            const modalId = targetElement.getAttribute('data_modal_id');
            const data = modalData[modalId];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalImgTop.src = data.imageTopUrl;
            modalImgBottom.src = data.imageBottomUrl;

            const tl = gsap.timeline();
            tl.set([modal, overlay], { visibility: 'visible' })
              .to(overlay, { opacity: 1, duration: 0.3 })
              .to(modal, { opacity: 1, transform: 'translate(-50%, -50%) scale(1)', duration: 0.4, ease: 'back.out(1.7)' }, "-=0.2");
            isModalOpen = true;
        };

        const closeModal = () => {
            if (!isModalOpen) return;
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set([modal, overlay], { visibility: 'hidden' });
                    modalImgTop.src = "";
                    modalImgBottom.src = "";
                    isModalOpen = false;
                }
            });
            tl.to(modal, { opacity: 0, transform: 'translate(-50%, -50%) scale(0.9)', duration: 0.2, ease: 'power2.in' })
              .to(overlay, { opacity: 0, duration: 0.3 }, "-=0.1");
        };

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (isModalOpen) return;
                openModal(item);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        });
    }
});


