// ========== COULEUR DES LIENS AU SCROLL (sans toucher au fond) ==========
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

if (navbar && navLinks.length) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navLinks.forEach(link => link.classList.add('nav-link-scrolled'));
        } else {
            navLinks.forEach(link => link.classList.remove('nav-link-scrolled'));
        }
    });
}

// ========== TYPING EFFECT (hero) ==========
const typedWords = ['à Python & SQL.', 'à Google Analytics.', 'à Looker Studio.', 'au Machine Learning.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed-text');
let timeoutId = null;

function typeEffect() {
    if (!typedElement) return;
    
    const currentWord = typedWords[wordIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Fin de l'écriture
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        timeoutId = setTimeout(typeEffect, 2000);
        return;
    }
    
    // Fin de la suppression
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typedWords.length;
        timeoutId = setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 40 : 80;
    timeoutId = setTimeout(typeEffect, speed);
}

// Démarrage unique
if (typedElement) {
    typeEffect();
}

// ========== MOBILE MENU ==========
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.classList.toggle('active');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.classList.remove('active');
        });
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== ANIMATED COUNTERS (statistiques) ==========
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const interval = setInterval(() => {
                current += target / 50;
                if (current < target) el.innerText = Math.floor(current);
                else { el.innerText = target; clearInterval(interval); }
            }, 30);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.3 });
counters.forEach(c => counterObserver.observe(c));

// ========== REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            setTimeout(() => {
                entry.target.classList.remove('animate-in');
            }, 800);
        }
    });
}, { threshold: 0.10 });
revealElements.forEach(el => revealObserver.observe(el));

// ========== TYPING POUR LA SECTION À PROPOS (avec swing) ==========
function initAProposTyping() {
    const section = document.querySelector('#a-propos');
    if (!section) return;
    const paragraphs = section.querySelectorAll('.typed-paragraph');
    if (!paragraphs.length) return;

    let alreadyTyped = false;

    const startTypingAndSwing = () => {
        if (alreadyTyped) return;
        alreadyTyped = true;
        if (!section.classList.contains('swing')) {
            section.classList.add('swing');
        }
        typeParagraphs(paragraphs, 0);
    };

    // Vérification immédiate
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight && rect.bottom > 0) {
        startTypingAndSwing();
        return;
    }

    // Observateur d'intersection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypingAndSwing();
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.1 });
    observer.observe(section);
}

function typeParagraphs(paragraphs, index) {
    if (index >= paragraphs.length) {
        const section = document.querySelector('#a-propos');
        if (section && section.classList.contains('swing')) {
            setTimeout(() => {
                section.classList.remove('swing');
            }, 4000);
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
    }, 25);   // ← ralentissement : 80 ms par lettre (au lieu de 50)
}

document.addEventListener('DOMContentLoaded', initAProposTyping);

// ========== MODEL ACCURACY WIDGET ==========
function initModelAccuracy() {
    const accuracySection = document.querySelector('.model-accuracy');
    if (!accuracySection) return;
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                const percentElement = document.getElementById('accuracy-percent');
                const circle = document.getElementById('progress-circle');
                const target = 99;
                let current = 0;
                const circumference = 283;
                const interval = setInterval(() => {
                    if (current < target) {
                        current++;
                        percentElement.innerText = current;
                        const offset = circumference - (current / 100) * circumference;
                        circle.style.strokeDashoffset = offset;
                    } else {
                        clearInterval(interval);
                    }
                }, 20);
                observer.unobserve(accuracySection);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(accuracySection);
}
document.addEventListener('DOMContentLoaded', () => {
    initModelAccuracy();
});