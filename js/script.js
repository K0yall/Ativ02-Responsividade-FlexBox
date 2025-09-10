// Funcionalidades futuristas do site
+document.addEventListener('DOMContentLoaded', function() {
+    // Navegação entre seções
+    const navLinks = document.querySelectorAll('.nav-link');
+    const sections = document.querySelectorAll('.section');
+    
+    function showSection(targetId) {
+        // Esconder todas as seções
+        sections.forEach(section => {
+            section.classList.remove('active');
+        });
+        
+        // Mostrar seção alvo
+        const targetSection = document.getElementById(targetId);
+        if (targetSection) {
+            targetSection.classList.add('active');
+        }
+        
+        // Atualizar links ativos
+        navLinks.forEach(link => {
+            link.classList.remove('active');
+        });
+        
+        const activeLink = document.querySelector(`[href="#${targetId}"]`);
+        if (activeLink) {
+            activeLink.classList.add('active');
+        }
+    }
+    
+    // Event listeners para navegação
+    navLinks.forEach(link => {
+        link.addEventListener('click', function(e) {
+            e.preventDefault();
+            const targetId = this.getAttribute('href').substring(1);
+            showSection(targetId);
+            
+            // Fechar menu mobile se estiver aberto
+            const mobileNav = document.querySelector('.nav-links');
+            const mobileToggle = document.querySelector('.mobile-menu-toggle');
+            if (mobileNav.classList.contains('active')) {
+                mobileNav.classList.remove('active');
+                mobileToggle.textContent = '☰';
+            }
+        });
+    });
+    
+    // Header scroll effect
+    const header = document.querySelector('header');
+    
+    function handleScroll() {
+        const scrolled = window.scrollY > 50;
+        header.classList.toggle('scrolled', scrolled);
+    }
+    
+    window.addEventListener('scroll', handleScroll);
+    
+    // Mobile menu toggle
+    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
+    const navLinksContainer = document.querySelector('.nav-links');
+    
+    if (mobileMenuToggle && navLinksContainer) {
+        mobileMenuToggle.addEventListener('click', function() {
+            navLinksContainer.classList.toggle('active');
+            
+            // Animação do ícone do menu
+            const isActive = navLinksContainer.classList.contains('active');
+            mobileMenuToggle.textContent = isActive ? '✕' : '☰';
+        });
+        
+        // Fechar menu ao clicar fora
+        document.addEventListener('click', function(event) {
+            if (!navLinksContainer.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
+                navLinksContainer.classList.remove('active');
+                mobileMenuToggle.textContent = '☰';
+            }
+        });
+    }
+    
+    // Animação de entrada dos elementos
+    const observerOptions = {
+        threshold: 0.1,
+        rootMargin: '0px 0px -50px 0px'
+    };
+    
+    const observer = new IntersectionObserver(function(entries) {
+        entries.forEach(entry => {
+            if (entry.isIntersecting) {
+                entry.target.classList.add('fade-in-up');
+                observer.unobserve(entry.target);
+            }
+        });
+    }, observerOptions);
+    
+    // Observar elementos para animação
+    const animatedElements = document.querySelectorAll('.card, .section h2, .section p, .stat-item');
+    animatedElements.forEach(el => {
+        observer.observe(el);
+    });
+    
+    // Efeito de digitação no título
+    function typeWriter(element, text, speed = 100) {
+        let i = 0;
+        element.innerHTML = '';
+        
+        function type() {
+            if (i < text.length) {
+                element.innerHTML += text.charAt(i);
+                i++;
+                setTimeout(type, speed);
+            }
+        }
+        
+        type();
+    }
+    
+    // Aplicar efeito de digitação ao título principal
+    const heroTitle = document.querySelector('#home h1');
+    if (heroTitle) {
+        const originalText = heroTitle.textContent;
+        setTimeout(() => {
+            typeWriter(heroTitle, originalText, 80);
+        }, 500);
+    }
+    
+    // Efeito parallax sutil
+    function handleParallax() {
+        const scrolled = window.pageYOffset;
+        const heroImage = document.querySelector('.hero-image');
+        
+        if (heroImage && scrolled < window.innerHeight) {
+            const rate = scrolled * -0.3;
+            heroImage.style.transform = `translateY(${rate}px) scale(1.05)`;
+        }
+    }
+    
+    // Throttle para performance
+    let ticking = false;
+    function requestTick() {
+        if (!ticking) {
+            requestAnimationFrame(function() {
+                handleParallax();
+                ticking = false;
+            });
+            ticking = true;
+        }
+    }
+    
+    window.addEventListener('scroll', requestTick);
+    
+    // Formulário de contato
+    const contactForm = document.querySelector('.contact-form');
+    if (contactForm) {
+        contactForm.addEventListener('submit', function(e) {
+            e.preventDefault();
+            
+            // Simular envio
+            const submitButton = this.querySelector('.cta-button');
+            const originalText = submitButton.innerHTML;
+            
+            submitButton.innerHTML = 'Enviando... <span>⚡</span>';
+            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
+            
+            setTimeout(() => {
+                submitButton.innerHTML = 'Enviado! <span>✓</span>';
+                
+                setTimeout(() => {
+                    submitButton.innerHTML = originalText;
+                    submitButton.style.background = '';
+                    this.reset();
+                }, 2000);
+            }, 1500);
+        });
+    }
+    
+    // Efeito de brilho nos cards
+    const cards = document.querySelectorAll('.card');
+    cards.forEach(card => {
+        card.addEventListener('mouseenter', function() {
+            this.classList.add('glow-animation');
+        });
+        
+        card.addEventListener('mouseleave', function() {
+            this.classList.remove('glow-animation');
+        });
+    });
+    
+    // Contador animado para estatísticas
+    function animateCounter(element, target, duration = 2000) {
+        let start = 0;
+        const increment = target / (duration / 16);
+        
+        function updateCounter() {
+            start += increment;
+            if (start < target) {
+                element.textContent = Math.floor(start) + '+';
+                requestAnimationFrame(updateCounter);
+            } else {
+                element.textContent = target + '+';
+            }
+        }
+        
+        updateCounter();
+    }
+    
+    // Observar estatísticas para animação
+    const statObserver = new IntersectionObserver(function(entries) {
+        entries.forEach(entry => {
+            if (entry.isIntersecting) {
+                const statNumber = entry.target.querySelector('.stat-number');
+                const value = parseInt(statNumber.textContent);
+                
+                if (!isNaN(value)) {
+                    animateCounter(statNumber, value);
+                }
+                
+                statObserver.unobserve(entry.target);
+            }
+        });
+    });
+    
+    const statItems = document.querySelectorAll('.stat-item');
+    statItems.forEach(item => {
+        statObserver.observe(item);
+    });
+    
+    // Prevenção de FOUC (Flash of Unstyled Content)
+    document.body.style.visibility = 'visible';
+    
+    // Melhorar acessibilidade - navegação por teclado
+    document.addEventListener('keydown', function(e) {
+        if (e.key === 'Escape') {
+            // Fechar menu mobile se estiver aberto
+            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
+                navLinksContainer.classList.remove('active');
+                mobileMenuToggle.textContent = '☰';
+                mobileMenuToggle.focus();
+            }
+        }
+        
+        // Navegação por teclado entre seções
+        if (e.key >= '1' && e.key <= '4' && e.ctrlKey) {
+            e.preventDefault();
+            const sectionIndex = parseInt(e.key) - 1;
+            const sectionIds = ['home', 'sobre', 'servicos', 'contato'];
+            if (sectionIds[sectionIndex]) {
+                showSection(sectionIds[sectionIndex]);
+            }
+        }
+    });
+    
+    // Detectar preferência de movimento reduzido
+    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
+    
+    if (prefersReducedMotion.matches) {
+        // Desabilitar animações para usuários que preferem movimento reduzido
+        document.documentElement.style.setProperty('--transition-fast', '0ms');
+        document.documentElement.style.setProperty('--transition-normal', '0ms');
+        document.documentElement.style.setProperty('--transition-slow', '0ms');
+    }
+    
+    // Cursor personalizado (opcional)
+    const cursor = document.createElement('div');
+    cursor.className = 'custom-cursor';
+    cursor.style.cssText = `
+        position: fixed;
+        width: 20px;
+        height: 20px;
+        background: radial-gradient(circle, var(--accent-primary), transparent);
+        border-radius: 50%;
+        pointer-events: none;
+        z-index: 9999;
+        mix-blend-mode: difference;
+        transition: transform 0.1s ease;
+    `;
+    document.body.appendChild(cursor);
+    
+    document.addEventListener('mousemove', function(e) {
+        cursor.style.left = e.clientX - 10 + 'px';
+        cursor.style.top = e.clientY - 10 + 'px';
+    });
+    
+    // Efeito hover no cursor
+    const interactiveElements = document.querySelectorAll('a, button, .card');
+    interactiveElements.forEach(el => {
+        el.addEventListener('mouseenter', () => {
+            cursor.style.transform = 'scale(2)';
+        });
+        
+        el.addEventListener('mouseleave', () => {
+            cursor.style.transform = 'scale(1)';
+        });
+    });
+});
+
+// Service Worker registration para PWA
+if ('serviceWorker' in navigator) {
+    window.addEventListener('load', function() {
+        navigator.serviceWorker.register('./service-worker.js')
+            .then(function(registration) {
+                console.log('ServiceWorker registration successful with scope: ', registration.scope);
+            })
+            .catch(function(err) {
+                console.log('ServiceWorker registration failed: ', err);
+            });
+    });
+}
+
+// Função para mostrar notificação de instalação PWA
+let deferredPrompt;
+const installButton = document.createElement('button');
+installButton.textContent = 'Instalar App';
+installButton.className = 'install-button cta-button';
+installButton.style.display = 'none';
+installButton.style.position = 'fixed';
+installButton.style.bottom = '20px';
+installButton.style.right = '20px';
+installButton.style.zIndex = '1001';
+
+window.addEventListener('beforeinstallprompt', (e) => {
+    e.preventDefault();
+    deferredPrompt = e;
+    installButton.style.display = 'block';
+});
+
+installButton.addEventListener('click', async () => {
+    if (deferredPrompt) {
+        deferredPrompt.prompt();
+        const { outcome } = await deferredPrompt.userChoice;
+        console.log(`User response to the install prompt: ${outcome}`);
+        deferredPrompt = null;
+        installButton.style.display = 'none';
+    }
+});
+
+// Adicionar botão de instalação ao body
+document.addEventListener('DOMContentLoaded', function() {
+    document.body.appendChild(installButton);
+});
+