// Função para rastrear eventos (GA4/Pixel)
function trackEvent(eventName, planName) {
    // Preservar parâmetros UTM
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    // Configurar evento para GA4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'plan_name': planName,
            'utm_source': utmSource,
            'utm_medium': utmMedium,
            'utm_campaign': utmCampaign
        });
    }
    
    // Configurar evento para Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: planName,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign
        });
    }
    
    // Log para debug
    console.log('Event tracked:', {
        event: eventName,
        plan_name: planName,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign
    });
}

// Controle do CTA sticky
document.addEventListener('DOMContentLoaded', function() {
    const ctaSticky = document.getElementById('ctaSticky');
    const hero = document.querySelector('.hero');
    
    // Mostrar/ocultar CTA sticky baseado na posição do scroll
    function handleScroll() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > heroBottom) {
            ctaSticky.style.opacity = '1';
            ctaSticky.style.visibility = 'visible';
        } else {
            ctaSticky.style.opacity = '0';
            ctaSticky.style.visibility = 'hidden';
        }
    }
    
    // Inicializar estado do CTA sticky
    ctaSticky.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    ctaSticky.style.opacity = '0';
    ctaSticky.style.visibility = 'hidden';
    
    // Adicionar listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scroll para âncoras
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
    
    // Animações de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animações aos elementos
    const animatedElements = document.querySelectorAll('.service-card, .step, .testimonial, .guarantee-item, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Funcionalidade do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Função para adicionar parâmetros UTM aos links do WhatsApp
function preserveUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        const url = new URL(link.href);
        
        // Adicionar parâmetros UTM se existirem
        if (urlParams.get('utm_source')) {
            url.searchParams.set('utm_source', urlParams.get('utm_source'));
        }
        if (urlParams.get('utm_medium')) {
            url.searchParams.set('utm_medium', urlParams.get('utm_medium'));
        }
        if (urlParams.get('utm_campaign')) {
            url.searchParams.set('utm_campaign', urlParams.get('utm_campaign'));
        }
        
        link.href = url.toString();
    });
}

// Executar preservação de UTM quando a página carregar
document.addEventListener('DOMContentLoaded', preserveUTMParams);

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Otimizações para mobile
if (isMobile()) {
    // Reduzir animações em dispositivos móveis para melhor performance
    document.addEventListener('DOMContentLoaded', function() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(style);
    });
}

