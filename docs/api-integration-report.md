# API Integration Report & Usage Examples  
**Renad Elsafi Portfolio** – Assignment Documentation

---

### 1. GitHub REST API Integration

**Purpose**  
Dynamically display my 6 most recently updated public repositories directly from GitHub – no manual updates needed!

**Endpoint Used**  
```
GET https://api.github.com/users/reyyynad/repos
?sort=updated&direction=desc&per_page=6
```

**Key Features Implemented**
- Live repository cards with name, description, language, stars, forks, and last updated ("X days ago")
- Loading spinner + error state with "Try Again" button
- Responsive grid layout
- Direct links to each repository

**Code Snippet (js/script.js)**
```javascript
async fetchRepositories() {
    try {
        this.showLoading();
        const response = await fetch(this.apiUrl + '?sort=updated&per_page=6');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const repos = await response.json();
        this.displayRepositories(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        this.showError();
    }
}
```

**Error Handling**
- Network failures → shows friendly error message + retry button
- Rate limiting → falls back gracefully (GitHub allows ~60 requests/hour unauthenticated)

---

### 2. Quotable.io API – Daily Inspiration Quotes

**Purpose**  
Add a touch of motivation with a fresh technology/inspirational quote every visit.

**Endpoint Used**  
```
GET https://api.quotable.io/random?tags=technology,inspirational,success
```

**Key Features**
- Auto-loads on page visit
- "New Quote" button with rotation animation
- Fallback quote (Steve Jobs) if API fails
- Smooth fade-in effect

**Code Snippet**
```javascript
async fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random?tags=technology,inspirational,success');
        if (!response.ok) throw new Error('Failed to fetch quote');
        const data = await response.json();
        this.displayQuote(data.content, data.author);
    } catch (error) {
        this.displayQuote("The only way to do great work is to love what you do.", "Steve Jobs");
    }
}
```

**Why Quotable.io?**  
- Free, no API key required
- Reliable, fast, and well-documented
- Perfect filtering tags for tech & motivation

---

### Summary Table

| API              | Endpoint                                                                 | Authentication | Rate Limit          | Used For                          | Fallback Strategy                     |
|------------------|--------------------------------------------------------------------------|----------------|---------------------|-----------------------------------|---------------------------------------|
| GitHub REST      | `https://api.github.com/users/reyyynad/repos`                            | None           | ~60 req/hour        | Latest 6 repos                    | Error card + retry button             |
| Quotable.io      | `https://api.quotable.io/random?tags=technology,inspirational,success`   | None           | Very generous       | Daily motivational quote          | Hardcoded Steve Jobs quote            |

---

### Real Usage Examples (Live on Site)

**GitHub Section**  
Live: https://reyyynad.github.io/Renad_Elsafi_Portfolio/#GitHub  
→ Always shows my actual latest work (e.g., this portfolio repo appears automatically when pushed)

**Daily Inspiration Section**  
Live: https://reyyynad.github.io/Renad_Elsafi_Portfolio/#Quotes  
→ Refreshes with a new quote every click

---

**Conclusion**  
Both APIs are used responsibly:
- No API keys exposed
- Proper error handling & user feedback
- Enhances portfolio without slowing it down
- Data is always fresh and accurate

**Result:** A living, breathing portfolio that updates itself

---
*Document created: November 25, 2025*  
*Renad Elsafi – Computer Science @ KFUPM*
