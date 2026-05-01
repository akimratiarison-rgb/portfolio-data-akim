// ==========================================
// EFFET DE TYPING (hero)
// ==========================================
const TYPED_WORDS = ['à Python & SQL.', 'à Google Analytics.', 'à Looker Studio.', 'au Machine Learning.'];
let wordIdx = 0, charIdx = 0, isDeleting = false;

function type() {
    const el = document.getElementById('typed-text'); 
    if (!el) return;
    const current = TYPED_WORDS[wordIdx];
    
    el.textContent = isDeleting ? current.slice(0, charIdx--) : current.slice(0, charIdx++);

    if (!isDeleting && charIdx > current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIdx < 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % TYPED_WORDS.length;
        charIdx = 0;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 40 : 80 + Math.random() * 50);
    }
}

// ==========================================
// MENU BURGER (animation en X)
// ==========================================
function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        btn.classList.toggle('active');
    });
    
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            btn.classList.remove('active');
        });
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========== COMPTEUR ANIMÉ ==========
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        let step = 0;
        const interval = setInterval(() => {
            current += increment;
            step++;
            if (current < target && step < 50) {
                stat.innerText = Math.floor(current);
            } else {
                stat.innerText = target;
                clearInterval(interval);
            }
        }, 30);
    });
}

function initStatsObserver() {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(statsContainer);
}

// ========== REVEAL DES BADGES ==========
function initTechReveal() {
    const badges = document.querySelectorAll('.badge-skill, .tech-badge');
    if (badges.length === 0) return;
    
    badges.forEach(badge => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        badge.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targets = entry.target.querySelectorAll('.badge-skill, .tech-badge');
                targets.forEach(badge => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'scale(1)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('#projets, #competences, .card-project');
    sections.forEach(section => {
        if (section.querySelectorAll('.badge-skill, .tech-badge').length) {
            observer.observe(section);
        }
    });
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            const targets = section.querySelectorAll('.badge-skill, .tech-badge');
            targets.forEach(badge => {
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            });
        }
    });
}

// ========== GLOW DOUX SUR LE NOM (navbar) ==========
function initNameSoftGlow() {
    const nameSpan = document.querySelector('nav .font-sans.text-base.md\\:text-xl');
    if (!nameSpan) return;
    let glowActive = false;
    setInterval(() => {
        if (!glowActive) {
            glowActive = true;
            nameSpan.style.transition = 'text-shadow 0.2s ease, color 0.2s ease';
          
            setTimeout(() => {
                nameSpan.style.textShadow = '';
                nameSpan.style.color = '';
                glowActive = false;
            }, 400);
        }
    }, 3000);
}

// ========== REVEAL AU SCROLL (sauf #a-propos) ==========
function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll(
        '#hero, #hero img, .card-project, .certif-item, #competences .group'
    );
    if (elementsToReveal.length === 0) return;
    
    elementsToReveal.forEach(el => {
        if (!el.classList.contains('stats-container')) {
            el.classList.add('reveal');
        }
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ========== EFFET TYPING + SWING POUR LA SECTION À PROPOS ==========
function initAProposTyping() {
    const section = document.querySelector('#a-propos');
    if (!section) return;

    const paragraphs = section.querySelectorAll('.typed-paragraph');
    if (paragraphs.length === 0) return;

    let alreadyTyped = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !alreadyTyped) {
                alreadyTyped = true;
                // Démarrer le balancement immédiatement
                if (!section.classList.contains('swing')) {
                    section.classList.add('swing');
                }
                // Démarrer l'écriture progressive
                typeParagraphs(paragraphs, 0);
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(section);
}

function typeParagraphs(paragraphs, index) {
    // Tous les paragraphes terminés → arrêter le swing après un court délai
    if (index >= paragraphs.length) {
        const section = document.querySelector('#a-propos');
        if (section && section.classList.contains('swing')) {
            setTimeout(() => {
                section.classList.remove('swing');
            }, 500);
        }
        return;
    }

    const p = paragraphs[index];
    const text = p.getAttribute('data-text');
    if (!text) {
        setTimeout(() => typeParagraphs(paragraphs, index + 1), 100);
        return;
    }

    p.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            p.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                typeParagraphs(paragraphs, index + 1);
            }, 300);
        }
    }, 20);
}

// ========== INITIALISATION UNIQUE ==========
document.addEventListener('DOMContentLoaded', () => {
    type();
    initMobileMenu();
    initSmoothScroll();
    initStatsObserver();
    initTechReveal();
    initNameSoftGlow();
    initScrollReveal();
    initAProposTyping();   // ← lance le typing + swing
});