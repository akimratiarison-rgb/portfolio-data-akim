// ==========================================
// EFFET DE TYPING
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
// MENU BURGER
// ==========================================
function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });
    
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
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

// ========== REVEAL DES BADGES (allégé) ==========
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



// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
    type();
    initMobileMenu();
    initSmoothScroll();
    initStatsObserver();
    initTechReveal();
    initNameSoftGlow();
});

// ==========================================
// MENU BURGER 
// ==========================================
function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
        // Toggle l'affichage du menu
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        
        // Toggle la classe 'active' sur le bouton burger 
        btn.classList.toggle('active');
    });
    
    // Fermer le menu automatiquement après un clic sur un lien
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            btn.classList.remove('active');   
        });
    });
}


// ========== REVEAL AU SCROLL (sauf les stats) ==========
function initScrollReveal() {
    // Sélectionne tout le contenu à animer (sauf .stats-container)
    const elementsToReveal = document.querySelectorAll(
        '#hero, #hero img, .card-project, .certif-item, #competences .group'
    );
    
    if (elementsToReveal.length === 0) return;
    
    // Ajoute la classe 'reveal' à chaque élément (s'il ne l'a pas déjà)
    elementsToReveal.forEach(el => {
        if (!el.classList.contains('stats-container')) {
            el.classList.add('reveal');
        }
    });
    
    // Crée un observateur
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Une fois révélé, on arrête de surveiller
            }
        });
    }, { threshold: 0.5 }); // Déclenche quand 5% de l'élément est visible
    
    // Observe chaque élément
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Lance l'animation au chargement (déjà dans DOMContentLoaded, on ajoute la fonction)
document.addEventListener('DOMContentLoaded', () => {
    // ... les autres initialisations (type, mobileMenu, etc.) ...
    initScrollReveal();  // <-- ajoute cette ligne
});


