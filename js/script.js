// Theme management system
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
        
        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Add smooth transition after page load
        setTimeout(() => {
            document.body.style.transition = 'all 0.3s ease';
        }, 100);
    }
    
    toggleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.applyTheme();
        this.updateIcon();
        this.saveTheme();
        
        // Add button animation
        this.animateButton();
    }
    
    applyTheme() {
        const currentTheme = this.themes[this.currentThemeIndex];
        
        // Remove all theme classes
        document.body.removeAttribute('data-theme');
        
        // Apply new theme (purple is default, so no data-theme needed)
        if (currentTheme !== 'purple') {
            document.body.setAttribute('data-theme', currentTheme);
        }
    }
    
    updateIcon() {
        const currentTheme = this.themes[this.currentThemeIndex];
        const nextTheme = this.themes[(this.currentThemeIndex + 1) % this.themes.length];
        const iconElement = this.themeToggle.querySelector('i');
        
        // Update icon to show what theme will be next
        iconElement.className = this.themeIcons[nextTheme];
        
        // Update button title for accessibility
        this.themeToggle.title = `Switch to ${nextTheme} theme`;
    }
    
    animateButton() {
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

// Smooth scrolling enhancement for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Get all navigation links
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId) || document.getElementById('/');
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    this.updateActiveLink(link);
                }
            });
        });
        
        // Update active link on scroll
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
                const activeLink = document.querySelector(`nav a[href="#${id}"]`) || 
                                 document.querySelector(`nav a[href="#/"]`);
                if (activeLink) {
                    this.updateActiveLink(activeLink);
                }
            }
        });
    }
}

// Enhanced animations for project cards
class AnimationEnhancer {
    constructor() {
        this.init();
    }
    
    init() {
        this.observeElements();
        this.addHoverEffects();
    }
    
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });
        
        // Observe cards and sections
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
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    const themeManager = new ThemeManager();
    
    // Initialize smooth scrolling
    const smoothScroll = new SmoothScroll();
    
    // Initialize animation enhancer
    const animationEnhancer = new AnimationEnhancer();
    
    // Add CSS for slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .project-card, .experience-card {
            opacity: 0;
        }
        
        nav a.active {
            color: var(--purple-accent) !important;
        }
        
        .theme-toggle {
            transition: all 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Portfolio initialized with theme system');

    // Character counter for message textarea
const textarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

if (textarea && charCount) {
  textarea.addEventListener('input', () => {
    charCount.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
  });
}

});

// Read More Functionality
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


// Dynamic Greeting based on time of day
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
        
        if (hour >= 5 && hour < 12) {
            return 'Good morning!';
        } else if (hour >= 12 && hour < 17) {
            return 'Good afternoon!';
        } else if (hour >= 17 && hour < 21) {
            return 'Good evening!';
        } else {
            return 'Good night!';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme Manager
    const themeManager = new ThemeManager();

    // Initialize Smooth Scrolling
    const smoothScroll = new SmoothScroll();

    // Initialize Animation Enhancer
    const animationEnhancer = new AnimationEnhancer();

    // Initialize Dynamic Greeting
    const dynamicGreeting = new DynamicGreeting();

    // Initialize Read More
    const readMore = new ReadMore();

    // Character counter for message textarea
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (textarea && charCount) {
        textarea.addEventListener('input', () => {
            charCount.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
        });
    }

    console.log('Portfolio initialized with theme system');
});
