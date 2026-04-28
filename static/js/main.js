// static/js/main.js
const TYPED_WORDS = ['Python & SQL.', 'Google Analytics.', 'Looker Studio.', 'le Machine Learning.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    const currentWord = TYPED_WORDS[wordIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentWord.slice(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % TYPED_WORDS.length;
            setTimeout(typeEffect, 400);
            return;
        }
    } else {
        typedElement.textContent = currentWord.slice(0, charIndex++);
        if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    }
    
    // Délais variables (entre 40ms et 120ms) pour un rythme organique
    const delay = isDeleting ? 35 : 55 + Math.random() * 45;
    setTimeout(typeEffect, delay);
}

// Menu burger mobile
function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });
    
    // Fermer le menu après clic sur un lien
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        });
    });
}

// Smooth scroll pour les ancres
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

// Lazy loading / observation des cartes (effet au scroll)
function initRevealOnScroll() {
    const cards = document.querySelectorAll('.card-project');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Lancement des scripts
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    initMobileMenu();
    initSmoothScroll();
    initRevealOnScroll();
});




// Changement progressif des images de fond au scroll
function updateBackgroundScroll() {
    const bg1 = document.getElementById('bg1');
    const bg2 = document.getElementById('bg2');
    if (!bg1 || !bg2) return;

    // Hauteur totale scrollable
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    // Position actuelle (0 = tout en haut, 1 = tout en bas)
    const scrollPercent = window.scrollY / scrollHeight;

    // Opacité de bg2 entre 0 et 1 (0% en haut, 100% en bas)
    let opacity = Math.min(1, scrollPercent * 1.5); // *1.5 pour arriver plus vite
    bg2.style.opacity = opacity;
    bg1.style.opacity = 1 - opacity;
}

// Écoute l'événement scroll
window.addEventListener('scroll', updateBackgroundScroll);
// Appel initial
updateBackgroundScroll();