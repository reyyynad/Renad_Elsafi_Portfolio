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
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.currentThemeIndex = this.themes.indexOf(savedTheme);
        }
       
        this.applyTheme();
        this.updateIcon();
       
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
       
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
        const currentTheme = this.themes[this.currentThemeIndex];
        const nextTheme = this.themes[(this.currentThemeIndex + 1) % this.themes.length];
        const iconElement = this.themeToggle.querySelector('i');
       
        iconElement.className = this.themeIcons[nextTheme];
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
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
       
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
               
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId) || document.getElementById('/');
               
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
    }
}

// Dynamic Greeting based on time of day
class DynamicGreeting {
    constructor() {
        this.greetingElement = document.getElementById('dynamicGreeting');
        this.init();
    }
   
    init() {
        if (this.greetingElement) {
            const userName = localStorage.getItem('visitorName');
            const greeting = this.getTimeBasedGreeting();
            const name = userName || '<span class="name">Renad Elsafi</span>';
            
            if (userName) {
                this.greetingElement.innerHTML = `${greeting} <span class="name">${userName}</span>! Welcome back to my portfolio.`;
            } else {
                this.greetingElement.innerHTML = `${greeting} I'm ${name}`;
                this.promptForName();
            }
        }
    }
    
    promptForName() {
        setTimeout(() => {
            const name = prompt("Hi there! What's your name? (Optional)");
            if (name && name.trim()) {
                localStorage.setItem('visitorName', name.trim());
                const greeting = this.getTimeBasedGreeting();
                this.greetingElement.innerHTML = `${greeting} <span class="name">${name.trim()}</span>! Welcome to my portfolio.`;
            }
        }, 3000);
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

// Visitor Statistics Tracker
class VisitorTracker {
    constructor() {
        this.timeCounter = document.getElementById('timeCounter');
        this.visitCount = document.getElementById('visitCount');
        this.startTime = Date.now();
        this.init();
    }
    
    init() {
        // Track visit count
        let visits = parseInt(localStorage.getItem('visitCount')) || 0;
        visits++;
        localStorage.setItem('visitCount', visits);
        if (this.visitCount) {
            this.visitCount.textContent = visits;
        }
        
        // Start time counter
        this.startTimeCounter();
    }
    
    startTimeCounter() {
        if (!this.timeCounter) return;
        
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.timeCounter.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}

// Project Filter and Sort System
class ProjectManager {
    constructor() {
        this.projectsGrid = document.getElementById('projectsGrid');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.sortSelect = document.getElementById('sortProjects');
        this.projects = [];
        this.init();
    }
    
    init() {
        if (!this.projectsGrid) return;
        
        // Get all project cards
        this.projects = Array.from(document.querySelectorAll('.project-card'));
        
        // Add event listeners
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => this.filterAndSort());
        }
        
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', () => this.filterAndSort());
        }
    }
    
    filterAndSort() {
        const category = this.categoryFilter.value;
        const sortBy = this.sortSelect.value;
        
        // Filter projects
        let filteredProjects = this.projects.filter(project => {
            if (category === 'all') return true;
            return project.dataset.category === category;
        });
        
        // Sort projects
        filteredProjects.sort((a, b) => {
            switch(sortBy) {
                case 'date-desc':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                case 'date-asc':
                    return new Date(a.dataset.date) - new Date(b.dataset.date);
                case 'name-asc':
                    return a.dataset.name.localeCompare(b.dataset.name);
                case 'name-desc':
                    return b.dataset.name.localeCompare(a.dataset.name);
                default:
                    return 0;
            }
        });
        
        // Hide all projects first
        this.projects.forEach(project => {
            project.style.display = 'none';
            project.style.animation = 'none';
        });
        
        // Show filtered and sorted projects with animation
        filteredProjects.forEach((project, index) => {
            setTimeout(() => {
                project.style.display = 'flex';
                project.style.animation = 'slideInUp 0.6s ease forwards';
            }, index * 100);
        });
        
        // Show message if no projects match
        if (filteredProjects.length === 0) {
            this.showNoResultsMessage();
        } else {
            this.hideNoResultsMessage();
        }
    }
    
    showNoResultsMessage() {
        let message = document.getElementById('noResultsMessage');
        if (!message) {
            message = document.createElement('div');
            message.id = 'noResultsMessage';
            message.className = 'no-results';
            message.innerHTML = `
                <i class="fas fa-search"></i>
                <p>No projects found for this category.</p>
            `;
            this.projectsGrid.appendChild(message);
        }
        message.style.display = 'block';
    }
    
    hideNoResultsMessage() {
        const message = document.getElementById('noResultsMessage');
        if (message) {
            message.style.display = 'none';
        }
    }
}

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

// Quotes API Integration
class QuotesManager {
    constructor() {
        this.quoteCard = document.getElementById('quoteCard');
        this.quoteLoading = document.getElementById('quoteLoading');
        this.quoteContent = document.getElementById('quoteContent');
        this.quoteText = document.getElementById('quoteText');
        this.quoteAuthor = document.getElementById('quoteAuthor');
        this.refreshBtn = document.getElementById('refreshQuote');
        
        this.init();
    }
    
    init() {
        if (!this.quoteCard) return;
        
        this.fetchQuote();
        
        if (this.refreshBtn) {
            this.refreshBtn.addEventListener('click', () => {
                this.refreshBtn.classList.add('rotating');
                this.fetchQuote();
                setTimeout(() => {
                    this.refreshBtn.classList.remove('rotating');
                }, 600);
            });
        }
    }
    
    async fetchQuote() {
        try {
            this.showLoading();
            
            // Using quotable.io API (free, no auth required)
            const response = await fetch('https://api.quotable.io/random?tags=technology,inspirational,success');
            
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            
            const data = await response.json();
            this.displayQuote(data.content, data.author);
            
        } catch (error) {
            console.error('Error fetching quote:', error);
            this.displayQuote(
                'The only way to do great work is to love what you do.',
                'Steve Jobs'
            );
        }
    }
    
    showLoading() {
        if (this.quoteLoading) this.quoteLoading.style.display = 'block';
        if (this.quoteContent) this.quoteContent.style.display = 'none';
    }
    
    displayQuote(text, author) {
        setTimeout(() => {
            if (this.quoteLoading) this.quoteLoading.style.display = 'none';
            if (this.quoteContent) this.quoteContent.style.display = 'block';
            if (this.quoteText) this.quoteText.textContent = `"${text}"`;
            if (this.quoteAuthor) this.quoteAuthor.textContent = `— ${author}`;
        }, 500);
    }
}

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
        
        this.aiEnhanceBtn.addEventListener('click', () => {
            const isVisible = this.aiOptions.style.display === 'flex';
            this.aiOptions.style.display = isVisible ? 'none' : 'flex';
        });
        
        const optionBtns = document.querySelectorAll('.ai-option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.enhanceMessage(action);
            });
        });
        
        if (this.acceptBtn) {
            this.acceptBtn.addEventListener('click', () => {
                this.messageTextarea.value = this.currentSuggestion;
                this.messageTextarea.dispatchEvent(new Event('input'));
                this.hideSuggestions();
            });
        }
        
        if (this.rejectBtn) {
            this.rejectBtn.addEventListener('click', () => {
                this.hideSuggestions();
            });
        }
        
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
        
        this.showLoading();
        
        setTimeout(() => {
            const enhanced = this.simulateAIEnhancement(message, action);
            this.showSuggestion(enhanced);
        }, 1500);
    }
    
    simulateAIEnhancement(message, action) {
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
        let enhanced = message;
        enhanced = enhanced.replace(/hi|hey|hello/gi, 'Dear Renad');
        
        if (!enhanced.includes('Regards') && !enhanced.includes('Sincerely')) {
            enhanced += '\n\nBest regards';
        }
        
        enhanced = enhanced.replace(/(^\w|[.!?]\s+\w)/g, letter => letter.toUpperCase());
        return enhanced;
    }
    
    makeFriendly(message) {
        let enhanced = message;
        
        if (!enhanced.match(/^(hi|hey|hello)/i)) {
            enhanced = 'Hi there! ' + enhanced;
        }
        
        enhanced = enhanced.replace(/\./g, (match, offset) => {
            return Math.random() > 0.7 ? '!' : match;
        });
        
        if (!enhanced.includes('Cheers') && !enhanced.includes('Best')) {
            enhanced += '\n\nLooking forward to hearing from you!';
        }
        
        return enhanced;
    }
    
    makeConcise(message) {
        let enhanced = message;
        
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
        
        enhanced = enhanced.replace(/\s+/g, ' ').trim();
        return enhanced;
    }
    
    fixGrammar(message) {
        let enhanced = message;
        enhanced = enhanced.replace(/(^\w|[.!?]\s+\w)/g, letter => letter.toUpperCase());
        
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
        
        enhanced = enhanced.replace(/\s+/g, ' ');
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
                    alert('Form submitted successfully!');
                    this.form.reset();
                    document.getElementById('charCount').textContent = '0 / 1000';
                }
            });
        }
    }

    validateForm() {
        let valid = true;

        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();
        if (!nameValue) {
            this.showError('name', 'Please enter your name. This field is required.');
            valid = false;
        } else {
            this.clearError('name');
        }

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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme Manager
    const themeManager = new ThemeManager();

    // Initialize Smooth Scrolling
    const smoothScroll = new SmoothScroll();

    // Initialize Animation Enhancer
    const animationEnhancer = new AnimationEnhancer();

    // Initialize Dynamic Greeting with Visitor Name
    const dynamicGreeting = new DynamicGreeting();
    
    // Initialize Visitor Tracker (Time counter & Visit count)
    const visitorTracker = new VisitorTracker();
    
    // Initialize Project Filter and Sort System
    const projectManager = new ProjectManager();

    // Initialize GitHub Repos
    const githubRepos = new GitHubRepos();
    
    // Initialize Quotes Manager
    const quotesManager = new QuotesManager();

    // Initialize AI Message Enhancer
    const aiEnhancer = new AIMessageEnhancer();
    
    // Initialize Contact Form Validator
    const contactFormValidator = new ContactFormValidator();

    // Character counter for message textarea
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (textarea && charCount) {
        textarea.addEventListener('input', () => {
            charCount.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
        });
    }

    console.log('Portfolio initialized with all advanced features');
});