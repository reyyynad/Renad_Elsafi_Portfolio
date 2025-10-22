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
    
    initSkillsAnimation() {
        const skillIcons = document.querySelectorAll('.skill-icon');
        
        // Add stagger animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillIcons.forEach((icon, index) => {
                        setTimeout(() => {
                            icon.style.opacity = '1';
                            icon.style.transform = 'scale(1)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
        
        // Add interactive hover effects
        skillIcons.forEach(icon => {
            icon.style.opacity = '0';
            icon.style.transform = 'scale(0.5)';
            icon.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Create connection lines on hover
            icon.addEventListener('mouseenter', () => {
                this.createConnectionEffect(icon);
            });
        });
    }
    
    createConnectionEffect(icon) {
        const orb = document.querySelector('.central-orb');
        const iconRect = icon.getBoundingClientRect();
        const orbRect = orb.getBoundingClientRect();
        
        // Visual pulse effect on the orb
        orb.style.transform = 'translate(-50%, -50%) scale(1.1)';
        setTimeout(() => {
            orb.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
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

// GitHub API Integration
class GitHubRepos {
    constructor() {
        this.username = 'reyyynad';
        this.apiUrl = `https://api.github.com/users/${this.username}/repos`;
        this.reposGrid = document.getElementById('reposGrid');
        this.loadingState = document.getElementById('loadingState');
        this.errorState = document.getElementById('errorState');
        this.retryBtn = document.getElementById('retryBtn');
        
        this.init();
    }
    
    init() {
        this.fetchRepositories();
        
        if (this.retryBtn) {
            this.retryBtn.addEventListener('click', () => this.fetchRepositories());
        }
    }
    
    async fetchRepositories() {
        try {
            // Show loading state
            this.showLoading();
            
            const response = await fetch(this.apiUrl + '?sort=updated&per_page=6');
            
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            
            const repos = await response.json();
            this.displayRepositories(repos);
            
        } catch (error) {
            console.error('Error fetching repositories:', error);
            this.showError();
        }
    }
    
    showLoading() {
        if (this.loadingState) this.loadingState.style.display = 'block';
        if (this.errorState) this.errorState.style.display = 'none';
        if (this.reposGrid) this.reposGrid.innerHTML = '';
    }
    
    showError() {
        if (this.loadingState) this.loadingState.style.display = 'none';
        if (this.errorState) this.errorState.style.display = 'block';
        if (this.reposGrid) this.reposGrid.innerHTML = '';
    }
    
    displayRepositories(repos) {
        // Hide loading state
        if (this.loadingState) this.loadingState.style.display = 'none';
        if (this.errorState) this.errorState.style.display = 'none';
        
        if (!repos || repos.length === 0) {
            this.reposGrid.innerHTML = '<p style="text-align: center; opacity: 0.8;">No repositories found.</p>';
            return;
        }
        
        this.reposGrid.innerHTML = repos.map((repo, index) => `
            <div class="repo-card" style="animation-delay: ${index * 0.1}s">
                <div class="repo-header">
                    <div class="repo-icon">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="repo-info">
                        <a href="${repo.html_url}" target="_blank" class="repo-name">
                            ${repo.name}
                        </a>
                    </div>
                </div>
                
                ${repo.description ? `
                    <p class="repo-description">${repo.description}</p>
                ` : '<p class="repo-description" style="opacity: 0.5;">No description available</p>'}
                
                <div class="repo-stats">
                    ${repo.language ? `
                        <div class="language-tag">
                            <span class="language-dot"></span>
                            ${repo.language}
                        </div>
                    ` : ''}
                    
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${repo.stargazers_count}</span>
                    </div>
                    
                    <div class="stat">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.forks_count}</span>
                    </div>
                    
                    ${repo.updated_at ? `
                        <div class="stat">
                            <i class="fas fa-clock"></i>
                            <span>${this.formatDate(repo.updated_at)}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }
}

// Update your DOMContentLoaded event to include GitHub integration
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Initialize GitHub Repos
    const githubRepos = new GitHubRepos();
    
    console.log('Portfolio initialized with GitHub integration');
});

// Update your DOMContentLoaded event to include GitHub integration
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Initialize GitHub Repos
    const githubRepos = new GitHubRepos();
    
    // Initialize AI Message Enhancer
    const aiEnhancer = new AIMessageEnhancer();
    
    console.log('Portfolio initialized with GitHub integration and AI Enhancement');
});

// AI Message Enhancement Feature
class AIMessageEnhancer {
    constructor() {
        this.messageTextarea = document.getElementById('message');
        this.aiEnhanceBtn = document.getElementById('aiEnhanceBtn');
        this.aiOptions = document.getElementById('aiOptions');
        this.aiSuggestions = document.getElementById('aiSuggestions');
        this.suggestionContent = document.getElementById('suggestionContent');
        this.acceptBtn = document.getElementById('acceptSuggestion');
        this.rejectBtn = document.getElementById('rejectSuggestion');
        this.closeSuggestion = document.getElementById('closeSuggestion');
        this.currentSuggestion = '';
        
        this.init();
    }
    
    init() {
        if (!this.aiEnhanceBtn) return;
        
        // Toggle AI options
        this.aiEnhanceBtn.addEventListener('click', () => {
            const isVisible = this.aiOptions.style.display === 'flex';
            this.aiOptions.style.display = isVisible ? 'none' : 'flex';
        });
        
        // AI option buttons
        const optionBtns = document.querySelectorAll('.ai-option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.enhanceMessage(action);
            });
        });
        
        // Accept suggestion
        if (this.acceptBtn) {
            this.acceptBtn.addEventListener('click', () => {
                this.messageTextarea.value = this.currentSuggestion;
                this.messageTextarea.dispatchEvent(new Event('input'));
                this.hideSuggestions();
            });
        }
        
        // Reject suggestion
        if (this.rejectBtn) {
            this.rejectBtn.addEventListener('click', () => {
                this.hideSuggestions();
            });
        }
        
        // Close suggestion
        if (this.closeSuggestion) {
            this.closeSuggestion.addEventListener('click', () => {
                this.hideSuggestions();
            });
        }
    }
    
    async enhanceMessage(action) {
        const message = this.messageTextarea.value.trim();
        
        if (!message) {
            alert('Please write a message first!');
            return;
        }
        
        // Show loading state
        this.showLoading();
        
        // Simulate AI processing (in real implementation, this would call an AI API)
        setTimeout(() => {
            const enhanced = this.simulateAIEnhancement(message, action);
            this.showSuggestion(enhanced);
        }, 1500);
    }
    
    simulateAIEnhancement(message, action) {
        // This simulates AI enhancement. In production, you'd call an actual AI API
        switch(action) {
            case 'professional':
                return this.makeProfessional(message);
            case 'friendly':
                return this.makeFriendly(message);
            case 'concise':
                return this.makeConcise(message);
            case 'grammar':
                return this.fixGrammar(message);
            default:
                return message;
        }
    }
    
    makeProfessional(message) {
        // Add professional tone enhancements
        let enhanced = message;
        
        // Replace casual greetings
        enhanced = enhanced.replace(/hi|hey|hello/gi, 'Dear Renad');
        
        // Add professional closing if not present
        if (!enhanced.includes('Regards') && !enhanced.includes('Sincerely')) {
            enhanced += '\n\nBest regards';
        }
        
        // Capitalize sentences
        enhanced = enhanced.replace(/(^\w|[.!?]\s+\w)/g, letter => letter.toUpperCase());
        
        return enhanced;
    }
    
    makeFriendly(message) {
        let enhanced = message;
        
        // Add friendly greeting if not present
        if (!enhanced.match(/^(hi|hey|hello)/i)) {
            enhanced = 'Hi there! ' + enhanced;
        }
        
        // Add enthusiasm
        enhanced = enhanced.replace(/\./g, (match, offset) => {
            return Math.random() > 0.7 ? '!' : match;
        });
        
        // Add friendly closing
        if (!enhanced.includes('Cheers') && !enhanced.includes('Best')) {
            enhanced += '\n\nLooking forward to hearing from you!';
        }
        
        return enhanced;
    }
    
    makeConcise(message) {
        let enhanced = message;
        
        // Remove redundant words
        const redundantPhrases = {
            'in order to': 'to',
            'due to the fact that': 'because',
            'at this point in time': 'now',
            'for the purpose of': 'for',
            'in the event that': 'if',
            'a lot of': 'many',
            'very': ''
        };
        
        Object.entries(redundantPhrases).forEach(([phrase, replacement]) => {
            const regex = new RegExp(phrase, 'gi');
            enhanced = enhanced.replace(regex, replacement);
        });
        
        // Remove extra spaces
        enhanced = enhanced.replace(/\s+/g, ' ').trim();
        
        return enhanced;
    }
    
    fixGrammar(message) {
        let enhanced = message;
        
        // Basic grammar fixes
        // Capitalize first letter of sentences
        enhanced = enhanced.replace(/(^\w|[.!?]\s+\w)/g, letter => letter.toUpperCase());
        
        // Fix common mistakes
        const corrections = {
            ' i ': ' I ',
            "im ": "I'm ",
            "dont": "don't",
            "cant": "can't",
            "wont": "won't",
            "theyre": "they're",
            "youre": "you're",
            "theres": "there's",
            " ur ": " your ",
            " u ": " you "
        };
        
        Object.entries(corrections).forEach(([wrong, correct]) => {
            const regex = new RegExp(wrong, 'gi');
            enhanced = enhanced.replace(regex, correct);
        });
        
        // Fix double spaces
        enhanced = enhanced.replace(/\s+/g, ' ');
        
        // Ensure proper spacing after punctuation
        enhanced = enhanced.replace(/([.!?,])(\w)/g, '$1 $2');
        
        return enhanced;
    }
    
    showLoading() {
        this.aiOptions.style.display = 'none';
        this.aiSuggestions.style.display = 'block';
        this.suggestionContent.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                <div class="ai-loading"></div>
                <span>AI is enhancing your message...</span>
            </div>
        `;
        this.acceptBtn.style.display = 'none';
        this.rejectBtn.style.display = 'none';
    }
    
    showSuggestion(enhanced) {
        this.currentSuggestion = enhanced;
        this.suggestionContent.textContent = enhanced;
        this.acceptBtn.style.display = 'inline-flex';
        this.rejectBtn.style.display = 'inline-flex';
    }
    
    hideSuggestions() {
        this.aiSuggestions.style.display = 'none';
        this.aiOptions.style.display = 'none';
        this.currentSuggestion = '';
    }
}

// Typing Animation for Skills Title
class TypingAnimation {
    constructor() {
        this.titleElement = document.getElementById('skillsTitle');
        this.init();
    }
    
    init() {
        if (!this.titleElement) return;
        
        // Observe when the skills section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start typing animation
                    this.titleElement.style.maxWidth = '0';
                    setTimeout(() => {
                        this.titleElement.style.maxWidth = '100%';
                    }, 100);
                    
                    // Remove cursor after typing completes
                    setTimeout(() => {
                        this.titleElement.classList.add('typing-complete');
                    }, 4500); // 4s animation + 0.5s delay
                    
                    // Stop observing after animation starts
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
}

// Initialize Typing Animation in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Your existing initializations...
    
    // Add Typing Animation
    const typingAnimation = new TypingAnimation();
});

// Contact Form Validation
class ContactFormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm()) {
                    // Simulate successful submission (replace with actual submission logic if needed)
                    alert('Form submitted successfully!');
                    this.form.reset();
                    // Clear character count
                    document.getElementById('charCount').textContent = '0 / 1000';
                }
            });
        }
    }

    validateForm() {
        let valid = true;

        // Name validation
        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();
        if (!nameValue) {
            this.showError('name', 'Please enter your name. This field is required.');
            valid = false;
        } else {
            this.clearError('name');
        }

        // Email validation
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            this.showError('email', 'Please enter your email. This field is required.');
            valid = false;
        } else if (!this.isValidEmail(emailValue)) {
            this.showError('email', 'Please enter a valid email address (e.g., example@domain.com).');
            valid = false;
        } else {
            this.clearError('email');
        }

        // Message validation
        const messageInput = document.getElementById('message');
        const messageValue = messageInput.value.trim();
        if (!messageValue) {
            this.showError('message', 'Please enter your message. This field is required.');
            valid = false;
        } else if (messageValue.length < 20) {
            this.showError('message', 'Your message must be at least 20 characters long. Please add more details.');
            valid = false;
        } else {
            this.clearError('message');
        }

        return valid;
    }

    showError(field, message) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);
        input.classList.add('invalid');
        errorElement.textContent = message;
    }

    clearError(field) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);
        input.classList.remove('invalid');
        errorElement.textContent = '';
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...

    // Initialize Contact Form Validator
    const contactFormValidator = new ContactFormValidator();
});