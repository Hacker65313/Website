// ===== PRELOADER / WELCOME ANIMATION =====
const preloader = document.getElementById('preloader');
const typingText = document.getElementById('typing-text');

// Text to type
const textToType = "Ethical Hacking & Cyber Security Solutions";
let charIndex = 0;

// Typing effect
function typeText() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Start typing after delay
setTimeout(typeText, 500);

// Hide preloader after animation
setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Initialize: show beranda sections
    showBeranda();
}, 4000);

// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Show Beranda sections (hero + about only)
function showBeranda() {
    // Hide all sections first
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show hero and about sections
    const heroSection = document.getElementById('beranda');
    const aboutSection = document.getElementById('about');
    
    if (heroSection) heroSection.classList.add('active');
    if (aboutSection) aboutSection.classList.add('active');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to section (SPA functionality)
function navigateTo(sectionId) {
    // Hide all sections first
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    if (sectionId === 'beranda') {
        // Show hero and about sections for beranda
        const heroSection = document.getElementById('beranda');
        const aboutSection = document.getElementById('about');
        
        if (heroSection) heroSection.classList.add('active');
        if (aboutSection) aboutSection.classList.add('active');
    } else {
        // Show only the specific section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== FORM SUBMISSION =====
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    const waMessage = `Halo Mas Jawa,%0A%0ANama: ${name}%0AEmail: ${email}%0ASubjek: ${subject}%0A%0APesan:%0A${message}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/6282338065465?text=${waMessage}`, '_blank');
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Show success message
    alert('Pesan Anda akan dikirim melalui WhatsApp. Terima kasih!');
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.about-card, .service-card, .contact-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== PARALLAX EFFECT FOR FLOATING ELEMENTS =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    document.body.style.overflow = 'hidden'; // Prevent scroll during preloader
    
    // Add loaded class for animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close menu on Escape
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// ===== TOUCH GESTURES FOR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartX - touchEndX;
    
    // Swipe left to close menu
    if (diff > swipeThreshold && mobileMenu.classList.contains('active')) {
        toggleMenu();
    }
}

// ===== LAZY LOADING FOR IMAGES (if any) =====
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== CONSOLE EASTER EGG =====
console.log('%c🛡️ Hacking Mas Jawa', 'font-size: 24px; font-weight: bold; color: #00ff88;');
console.log('%cEthical Hacking & Cyber Security Services', 'font-size: 14px; color: #888;');
console.log('%c⚠️ Peringatan: Aktivitas hacking tanpa izin adalah ilegal!', 'font-size: 12px; color: #ff0055;');