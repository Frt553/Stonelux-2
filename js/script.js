/**
 * STONELUX - Marmoraria Premium
 * JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.header');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // ============================================
    // MENU MOBILE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const menuMobile = document.querySelector('.menu-mobile');
    const menuOverlay = document.querySelector('.menu-mobile-overlay');
    const menuClose = document.querySelector('.menu-mobile-close');
    const dropdownToggles = document.querySelectorAll('.menu-mobile .has-dropdown > a');
    
    function openMenu() {
        menuMobile.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        menuMobile.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Dropdown no mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
    
    // ============================================
    // VOLTAR AO TOPO
    // ============================================
    const voltarTopo = document.querySelector('.voltar-topo');
    
    function handleVoltarTopo() {
        if (window.scrollY > 500) {
            voltarTopo.classList.add('visible');
        } else {
            voltarTopo.classList.remove('visible');
        }
    }
    
    if (voltarTopo) {
        window.addEventListener('scroll', handleVoltarTopo);
        
        voltarTopo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // ANIMAÇÃO AO SCROLL (FADE IN)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    if (fadeElements.length > 0) {
        window.addEventListener('scroll', checkFadeElements);
        checkFadeElements(); // Check on load
    }
    
    // ============================================
    // LIGHTBOX
    // ============================================
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const projetoItems = document.querySelectorAll('.projeto-item[data-lightbox]');
    
    function openLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightboxFunc() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    projetoItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightboxFunc);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightboxFunc();
            }
        });
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightboxFunc();
        }
    });
    
    // ============================================
    // CONTADORES ANIMADOS
    // ============================================
    const contadores = document.querySelectorAll('.contador');
    
    function animarContador(elemento) {
        const target = parseInt(elemento.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                elemento.textContent = target;
                clearInterval(timer);
            } else {
                elemento.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    function checkContadores() {
        contadores.forEach(contador => {
            const rect = contador.getBoundingClientRect();
            if (rect.top < window.innerHeight && !contador.classList.contains('animado')) {
                contador.classList.add('animado');
                animarContador(contador);
            }
        });
    }
    
    if (contadores.length > 0) {
        window.addEventListener('scroll', checkContadores);
        checkContadores();
    }
    
    // ============================================
    // DEPOIMENTOS SLIDER (SIMPLE)
    // ============================================
    const depoimentosSlider = document.querySelector('.depoimentos-slider');
    const depoimentoItems = document.querySelectorAll('.depoimento-item');
    
    if (depoimentoItems.length > 1) {
        let currentSlide = 0;
        
        function showSlide(index) {
            depoimentoItems.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % depoimentoItems.length;
            showSlide(currentSlide);
        }
        
        // Inicializar
        showSlide(0);
        
        // Auto-play
        setInterval(nextSlide, 5000);
    }
    
    // ============================================
    // FORMULÁRIO DE CONTATO
    // ============================================
    const formContato = document.getElementById('form-contato');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (!nome || !email || !telefone || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulação de envio
            const btnSubmit = formContato.querySelector('button[type="submit"]');
            const originalText = btnSubmit.textContent;
            
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                formContato.reset();
                btnSubmit.textContent = originalText;
                btnSubmit.disabled = false;
            }, 1500);
        });
    }
    
    // ============================================
    // MÁSCARA DE TELEFONE
    // ============================================
    const telefoneInputs = document.querySelectorAll('input[type="tel"]');
    
    telefoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 2) {
                value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
            }
            
            if (value.length > 10) {
                value = value.slice(0, 10) + '-' + value.slice(10);
            } else if (value.length > 9) {
                value = value.slice(0, 9) + '-' + value.slice(9);
            }
            
            e.target.value = value;
        });
    });
    
    // ============================================
    // COOKIE BANNER
    // ============================================
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieBtn = document.querySelector('.cookie-btn');
    
    function checkCookie() {
        const cookieAccepted = localStorage.getItem('cookieAccepted');
        if (!cookieAccepted && cookieBanner) {
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 2000);
        }
    }
    
    if (cookieBtn) {
        cookieBtn.addEventListener('click', function() {
            localStorage.setItem('cookieAccepted', 'true');
            cookieBanner.classList.remove('active');
        });
    }
    
    checkCookie();
    
    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        });
    }
    
    // ============================================
    // SMOOTH SCROLL PARA ÂNCORAS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // PARALLAX EFFECT
    // ============================================
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function handleParallax() {
        parallaxElements.forEach(element => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', handleParallax);
    }
    
    // ============================================
    // LAZY LOADING PARA IMAGENS
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sem IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // ============================================
    // ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.servico-card, .projeto-item, .blog-card, .mvv-item').forEach(el => {
        observer.observe(el);
    });
    
});

// ============================================
// FUNÇÕES GLOBAIS
// ============================================

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Formata valor para moeda brasileira
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Valida email
 */
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Copia texto para área de transferência
 */
function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert('Copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}
