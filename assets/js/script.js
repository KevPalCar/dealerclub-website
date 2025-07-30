document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidad del Menú Responsivo (Mobile Menu) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('menu-visible');
            navList.classList.toggle('menu-hidden');
            menuToggle.classList.toggle('active'); // Para la animación de la hamburguesa
        });

        // Ocultar menú cuando se hace clic en un enlace (en móvil)
        navList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Solo si es móvil
                    navList.classList.remove('menu-visible');
                    navList.classList.add('menu-hidden');
                    menuToggle.classList.remove('active');
                }
            });
        });

        // Ocultar menú si se cambia el tamaño de la ventana a desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navList.classList.contains('menu-visible')) {
                navList.classList.remove('menu-visible');
                navList.classList.add('menu-hidden');
                menuToggle.classList.remove('active');
            }
        });
    }

    // --- Funcionalidad de Acordeón para FAQ (en Contrata Dealers) ---
    // NOTA: Esta funcionalidad solo tendrá efecto en contrata-dealers.html donde existe la sección FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');

        if (answer) {
            answer.style.display = 'none'; // Oculta la respuesta por defecto
        }

        if (question) {
            question.addEventListener('click', () => {
                if (answer) {
                    if (answer.style.display === 'none') {
                        answer.style.display = 'block'; // Mostrar
                    } else {
                        answer.style.display = 'none';  // Ocultar
                    }
                }
            });
        }
    });

    // --- Funcionalidad de Scroll Suave ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento de salto por defecto

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Obtener la altura del header para ajustar el scroll
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // 20px de espacio extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Funcionalidad del Carrusel de Imágenes (Hero Section - solo en index.html) ---
    // Verificamos si los elementos del carrusel existen en la página actual antes de intentar manipularlos
    const carouselSlides = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    // Solo inicializar el carrusel si sus elementos existen en la página
    if (carouselSlides && slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (dots[i]) dots[i].classList.remove('active'); // Asegurarse de que el dot existe
            });

            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active'); // Asegurarse de que el dot existe
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function startSlideShow() {
            clearInterval(slideInterval); // Limpiar cualquier intervalo existente
            slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
        }

        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopSlideShow();
                nextSlide();
                startSlideShow();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopSlideShow();
                prevSlide();
                startSlideShow();
            });
        }

        if (dotsContainer) {
            dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    stopSlideShow();
                    currentSlide = parseInt(e.target.dataset.slide);
                    showSlide(currentSlide);
                    startSlideShow();
                }
            });
        }

        if (carouselSlides) {
            carouselSlides.addEventListener('mouseenter', stopSlideShow);
            carouselSlides.addEventListener('mouseleave', startSlideShow);
        }

        showSlide(currentSlide); // Mostrar la primera diapositiva al cargar
        startSlideShow();        // Iniciar el carrusel automáticamente
    }
});
// ... (tu código existente para menú hamburguesa, scroll-down, animaciones al scroll, y conteo de números) ...

    // Funcionalidad para las Preguntas Frecuentes (FAQ)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.closest('.faq-item');
            
            // Cierra todas las demás respuestas abiertas
            faqQuestions.forEach(otherQuestion => {
                const otherParentItem = otherQuestion.closest('.faq-item');
                if (otherParentItem !== parentItem && otherParentItem.classList.contains('active')) {
                    otherParentItem.classList.remove('active');
                }
            });

            // Abre o cierra la respuesta actual
            parentItem.classList.toggle('active');
        });
    });
