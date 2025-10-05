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
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 19, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 14, 19, 0.95)';
    }
});

// Animación de barras de habilidades
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills')) {
                setTimeout(animateSkills, 500);
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Efecto de partículas en el hero
const createParticles = () => {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 70, 85, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
};

// CSS para animación de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Crear partículas cuando se carga la página
window.addEventListener('load', createParticles);

// Efecto de typing para el título
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Animación de números en las estadísticas
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent; // Mantener el símbolo ∞
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
};

// Efecto de hover en las tarjetas de proyecto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Formulario de contacto
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envío de formulario
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'MENSAJE ENVIADO ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Efecto de parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax sutil para las imágenes de proyectos
    const projectImages = document.querySelectorAll('.project-screenshot');
    projectImages.forEach(image => {
        const rect = image.getBoundingClientRect();
        const speed = 0.1;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(rect.top - window.innerHeight) * speed;
            image.style.transform = `translateY(${yPos}px) scale(1.05)`;
        }
    });
});

// Efecto de cursor personalizado
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(255, 70, 85, 0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

// Efecto de cursor en elementos interactivos
document.querySelectorAll('a, button, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(0, 212, 255, 0.8)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'rgba(255, 70, 85, 0.8)';
    });
});

// Animación de carga inicial
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Efecto de resplandor en el logo
const logo = document.querySelector('.logo-text');
if (logo) {
    setInterval(() => {
        logo.style.textShadow = '0 0 20px rgba(255, 70, 85, 0.8)';
        setTimeout(() => {
            logo.style.textShadow = 'none';
        }, 1000);
    }, 3000);
}

// Preloader
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background-dark);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
`;

const loader = document.createElement('div');
loader.style.cssText = `
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 70, 85, 0.3);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
`;

preloader.appendChild(loader);
document.body.appendChild(preloader);

const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinStyle);

// Remover preloader cuando la página esté cargada
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// Efecto de escritura en el subtítulo del hero
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    setTimeout(() => {
        typeWriter(heroSubtitle, originalText, 150);
    }, 1000);
}

// Animación de las estadísticas cuando son visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Efecto de hover en los enlaces sociales
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Smooth reveal para elementos
const revealElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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

// Carga progresiva de imágenes
const loadImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            console.log('Error cargando imagen:', img.src);
            img.style.display = 'none';
        });
    });
};

// Inicializar carga de imágenes
window.addEventListener('load', loadImages);

// Configuración de EmailJS
(function() {
    // Inicializar EmailJS con tu Public Key
    emailjs.init("itQESBmnv3bpuxLv1");
    
    // Configurar el formulario de contacto
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
                    submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
                    submitBtn.style.opacity = '1';
                    
                    // Limpiar formulario
                    contactForm.reset();
                    
                    // Mostrar mensaje de éxito
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
                    submitBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff5252)';
                    submitBtn.style.opacity = '1';
                    
                    // Mostrar mensaje de error
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
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        // Colores según el tipo
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ff5252)';
        }
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
})();

// Efecto de zoom en imágenes de proyectos
document.querySelectorAll('.project-screenshot').forEach(img => {
    img.addEventListener('click', () => {
        img.style.transform = 'scale(1.1)';
        setTimeout(() => {
            img.style.transform = 'scale(1)';
        }, 300);
    });
});
