// ==========================
// Theme Management System
// ==========================
class ThemeManager {
    constructor() {
        this.themes = ['purple', 'light', 'dark'];
        this.currentThemeIndex = 0;
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcons = {
            purple: 'fas fa-heart',
            light: 'fas fa-sun',
            dark: 'fas fa-moon'
        };
        this.init();
    }

    init() {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.currentThemeIndex = this.themes.indexOf(savedTheme);
        }

        this.applyTheme();
        this.updateIcon();

        // Add event listener if element exists
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Smooth transition after page load
        setTimeout(() => {
            document.body.style.transition = 'all 0.3s ease';
        }, 100);
    }

    toggleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.applyTheme();
        this.updateIcon();
        this.saveTheme();
        this.animateButton();
    }

    applyTheme() {
        const currentTheme = this.themes[this.currentThemeIndex];
        document.body.removeAttribute('data-theme');
        if (currentTheme !== 'purple') {
            document.body.setAttribute('data-theme', currentTheme);
        }
    }

    updateIcon() {
        if (!this.themeToggle) return;
        const currentTheme = this.themes[this.currentThemeIndex];
        const nextTheme = this.themes[(this.currentThemeIndex + 1) % this.themes.length];
        const iconElement = this.themeToggle.querySelector('i');
        if (iconElement) iconElement.className = this.themeIcons[nextTheme];
        this.themeToggle.title = `Switch to ${nextTheme} theme`;
    }

    animateButton() {
        if (!this.themeToggle) return;
        this.themeToggle.style.transform = 'rotate(360deg) scale(1.1)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 300);
    }

    saveTheme() {
        const currentTheme = this.themes[this.currentThemeIndex];
        localStorage.setItem('theme', currentTheme);
    }

    getCurrentTheme() {
        return this.themes[this.currentThemeIndex];
    }
}

// ==========================
// Smooth Scrolling
// ==========================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId) || document.body;

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    this.updateActiveLink(link);
                }
            });
        });

        window.addEventListener('scroll', () => this.updateActiveLinkOnScroll());
    }

    updateActiveLink(activeLink) {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) this.updateActiveLink(activeLink);
            }
        });
    }
}

// ==========================
// Animation Enhancer
// ==========================
class AnimationEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.addHoverEffects();
        this.initSkillsAnimation();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });

        const elementsToObserve = document.querySelectorAll('.project-card, .experience-card');
        elementsToObserve.forEach(el => observer.observe(el));
    }

    addHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .experience-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const dots = card.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.animation = 'pulse 0.6s ease';
                    }, index * 100);
                });
            });
        });
    }

    initSkillsAnimation() {
        const skillIcons = document.querySelectorAll('.skill-icon');
        const skillsSection = document.querySelector('.skills-section');
        const svg = document.querySelector('.orbital-svg');
        const connectionLines = document.querySelector('.connection-lines');
        const orb = document.querySelector('.central-orb');
        const orbInner = document.querySelector('.orb-inner');

        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillIcons.forEach((icon, index) => {
                            setTimeout(() => {
                                icon.style.opacity = '1';
                                icon.style.transform = 'scale(1)';
                            }, index * 80);
                        });
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(skillsSection);
        }

        skillIcons.forEach(icon => {
            icon.style.opacity = '0';
            icon.style.transform = 'scale(0.5)';
            icon.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

            icon.addEventListener('mouseenter', () => {
                if (orbInner) {
                    orbInner.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    orbInner.style.boxShadow = '0 0 100px rgba(124, 58, 237, 0.9)';
                    setTimeout(() => {
                        orbInner.style.transform = 'translate(-50%, -50%) scale(1)';
                        orbInner.style.boxShadow = '';
                    }, 300);
                }
                if (svg && connectionLines) this.drawConnectionLine(icon, svg, connectionLines);
            });

            icon.addEventListener('mouseleave', () => {
                if (connectionLines) connectionLines.innerHTML = '';
            });
        });
    }

    drawConnectionLine(icon, svg, connectionLines) {
        const svgRect = svg.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        const iconX = iconRect.left + iconRect.width / 2 - svgRect.left;
        const iconY = iconRect.top + iconRect.height / 2 - svgRect.top;
        const centerX = svgRect.width / 2;
        const centerY = svgRect.height / 2;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', iconX);
        line.setAttribute('y2', iconY);
        line.setAttribute('class', 'connection-line');

        connectionLines.appendChild(line);

        setTimeout(() => {
            line.style.opacity = '0.6';
        }, 10);
    }
}

// ==========================
// Read More Functionality
// ==========================
class ReadMore {
    constructor() {
        this.btn = document.getElementById('readMoreBtn');
        this.moreText = document.getElementById('moreText');
        this.init();
    }

    init() {
        if (this.btn && this.moreText) {
            this.btn.addEventListener('click', () => this.toggleText());
        }
    }

    toggleText() {
        if (this.moreText.classList.contains('show')) {
            this.moreText.classList.remove('show');
            this.btn.textContent = 'Read More';
        } else {
            this.moreText.classList.add('show');
            this.btn.textContent = 'Read Less';
        }
    }
}

// ==========================
// Dynamic Greeting
// ==========================
class DynamicGreeting {
    constructor() {
        this.greetingElement = document.querySelector('.greeting');
        this.init();
    }

    init() {
        if (this.greetingElement) {
            const greeting = this.getTimeBasedGreeting();
            const name = '<span class="name">Renad Elsafi</span>';
            this.greetingElement.innerHTML = `${greeting} I'm ${name}`;
        }
    }

    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good morning!';
        else if (hour >= 12 && hour < 17) return 'Good afternoon!';
        else if (hour >= 17 && hour < 21) return 'Good evening!';
        else return 'Good night!';
    }
}

// ==========================
// Initialize Everything
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    const smoothScroll = new SmoothScroll();
    const animationEnhancer = new AnimationEnhancer();
    const dynamicGreeting = new DynamicGreeting();
    const readMore = new ReadMore();

    // Character counter for textarea
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    if (textarea && charCount) {
        textarea.addEventListener('input', () => {
            charCount.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
        });
    }

    // Add CSS for slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .project-card, .experience-card { opacity: 0; }
        nav a.active { color: var(--purple-accent) !important; }
        .theme-toggle { transition: all 0.3s ease, transform 0.3s ease; }
    `;
    document.head.appendChild(style);

    console.log('Portfolio initialized successfully');
});
