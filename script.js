// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 13, 13, 0.98)';
    } else {
        navbar.style.background = 'rgba(13, 13, 13, 1)';
    }
});

// ========== CARRUSEL DE PROYECTOS ==========
class ProjectsCarousel {
    constructor() {
        this.track = document.querySelector('.projects-carousel-track');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        // Obtener todas las tarjetas de proyecto
        this.cards = Array.from(document.querySelectorAll('.project-card'));
        this.totalCards = this.cards.length;
        
        if (this.totalCards === 0) return;
        
        // Crear indicadores
        this.createIndicators();
        
        // Event listeners para botones
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Soporte para touch/swipe en móviles
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) this.next();
            if (endX - startX > 50) this.prev();
        });
        
        // Auto-advance (opcional)
        // this.startAutoPlay();
    }
    
    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        for (let i = 0; i < this.totalCards; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goTo(i));
            this.indicatorsContainer.appendChild(indicator);
        }
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.indicator'));
    }
    
    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Actualizar indicadores
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
    }
    
    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000);
        
        // Pausar auto-play al hacer hover
        this.track.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        
        this.track.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsCarousel();
});

// ========== ANIMACIONES DE SKILLS ==========
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills')) {
                setTimeout(animateSkills, 300);
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========== FORMULARIO DE CONTACTO CON EMAILJS ==========
(function() {
    // Inicializar EmailJS con tu Public Key
    emailjs.init("itQESBmnv3bpuxLv1");
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Cambiar estado del botón
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Configuración de EmailJS
            const serviceID = 'service_54pdsnb';
            const templateID = 'template_yofs06f';
            
            // Recopilar datos del formulario
            const formData = {
                from_name: contactForm.from_name.value,
                from_email: contactForm.from_email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };
            
            // Enviar email
            emailjs.send(serviceID, templateID, formData)
                .then(function(response) {
                    console.log('Email enviado exitosamente!', response.status, response.text);
                    
                    // Éxito
                    submitBtn.textContent = 'MENSAJE ENVIADO ✓';
                    submitBtn.style.background = '#00ff88';
                    submitBtn.style.opacity = '1';
                    
                    // Limpiar formulario
                    contactForm.reset();
                    
                    // Mostrar notificación
                    showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
                    
                    // Restaurar botón después de 3 segundos
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                    
                }, function(error) {
                    console.log('Error al enviar email:', error);
                    
                    // Error
                    submitBtn.textContent = 'ERROR AL ENVIAR';
                    submitBtn.style.background = '#ff6b6b';
                    submitBtn.style.opacity = '1';
                    
                    // Mostrar notificación
                    showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
                    
                    // Restaurar botón después de 3 segundos
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                });
        });
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        if (type === 'success') {
            notification.style.background = '#00ff88';
            notification.style.color = '#000';
        } else {
            notification.style.background = '#ff6b6b';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
})();

// ========== ANIMACIÓN SUAVE PARA ELEMENTOS ==========
const revealElements = document.querySelectorAll('.project-card, .skill-category, .certification-card');
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ========== CARGA DE IMÁGENES ==========
const loadImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            console.log('Error cargando imagen:', img.src);
        });
    });
};

window.addEventListener('load', loadImages);

// ========== PRELOADER SIMPLE ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
