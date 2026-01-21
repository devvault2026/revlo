// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLL FUNCTIONS
// ===================================
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}

function scrollToRevloOS() {
    const revloOSSection = document.getElementById('revlo-os');
    revloOSSection.scrollIntoView({ behavior: 'smooth' });
}

// Add smooth scrolling to all nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards, team members, and other animated elements
const animatedElements = document.querySelectorAll(
    '.service-card, .team-member, .os-feature, .result-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add stagger animation delay
animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// FLOATING CARDS ANIMATION
// ===================================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Add random animation variation
    const randomDelay = Math.random() * 2;
    const randomDuration = 3 + Math.random() * 2;

    card.style.animationDelay = `${randomDelay}s`;
    card.style.animationDuration = `${randomDuration}s`;

    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;

        card.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px)`;
    });
});

// ===================================
// STATS COUNTER ANIMATION
// ===================================
function animateCounter(element, start, end, duration, suffix = '') {
    let current = start;
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const value = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');

                if (!isNaN(value)) {
                    stat.textContent = '0' + suffix;
                    setTimeout(() => {
                        animateCounter(stat, 0, value, 2000, suffix);
                    }, 300);
                }
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// RESULT NUMBERS ANIMATION
// ===================================
const resultsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const resultNumbers = entry.target.querySelectorAll('.result-number');

            resultNumbers.forEach(result => {
                const text = result.textContent;
                result.style.opacity = '0';

                setTimeout(() => {
                    result.style.transition = 'opacity 0.8s ease-out';
                    result.style.opacity = '1';

                    // Add bounce animation
                    result.style.animation = 'bounce 0.6s ease-out';
                }, 200);
            });

            resultsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const resultsSection = document.querySelector('.results-grid');
if (resultsSection) {
    resultsObserver.observe(resultsSection);
}

// Add bounce keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// ===================================
// FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            revenue: document.getElementById('revenue').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `
            <svg class="btn-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.75"/>
            </svg>
            Submitting...
        `;
        submitButton.disabled = true;

        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin {
                animation: spin 1s linear infinite;
            }
        `;
        document.head.appendChild(spinStyle);

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', formData);

            // Show success message
            submitButton.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Success! We'll be in touch soon
            `;
            submitButton.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// ===================================
// FORM INPUT ANIMATIONS
// ===================================
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    // Add focus animations
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });

    // Add validation styling
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.style.borderColor = '#10B981';
        } else if (input.value.length > 0) {
            input.style.borderColor = '#EF4444';
        } else {
            input.style.borderColor = '';
        }
    });
});

// ===================================
// BUTTON HOVER EFFECTS
// ===================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });

    button.addEventListener('mousedown', () => {
        button.style.transform = 'translateY(0)';
    });

    button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(-2px)';
    });
});

// ===================================
// CARD TILT EFFECT
// ===================================
const cards = document.querySelectorAll('.service-card, .team-member, .os-feature');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// GRADIENT ANIMATION
// ===================================
const gradientTexts = document.querySelectorAll('.gradient-text, .gradient-text-alt');

let gradientProgress = 0;
setInterval(() => {
    gradientProgress += 0.5;
    gradientTexts.forEach(text => {
        text.style.backgroundPosition = `${gradientProgress}% 50%`;
        text.style.backgroundSize = '200% 200%';
    });
}, 50);

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================
// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CONSOLE BRANDING
// ===================================
console.log('%c🚀 REVLO AGENCY', 'color: #8B5CF6; font-size: 24px; font-weight: bold;');
console.log('%cScaling brands to 7-figure ARR', 'color: #3B82F6; font-size: 14px;');
console.log('%cInterested in joining our team? Email: careers@revlo.agency', 'color: #64748B; font-size: 12px;');

// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    // Press 'C' to scroll to contact
    if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea')) {
            scrollToContact();
        }
    }

    // Press 'R' to scroll to Revlo OS
    if (e.key === 'r' || e.key === 'R') {
        if (!e.target.matches('input, textarea')) {
            scrollToRevloOS();
        }
    }

    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// ===================================
// EASTER EGGS
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Activate special effect
        document.body.style.animation = 'rainbow 2s ease-in-out';

        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);

        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);

        console.log('%c🎉 You found the easter egg!', 'color: #EF4444; font-size: 20px; font-weight: bold;');
    }
});

console.log('%c💡 Keyboard Shortcuts:', 'color: #8B5CF6; font-weight: bold;');
console.log('%c  C - Contact Form', 'color: #64748B;');
console.log('%c  R - Revlo OS', 'color: #64748B;');
console.log('%c  T - Back to Top', 'color: #64748B;');
