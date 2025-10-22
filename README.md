# Renad Elsafi Portfolio

<img width="1250" height="430" alt="Screenshot 2025-09-24 at 12 31 31 PM" src="https://github.com/user-attachments/assets/a51e8747-ee12-470c-9009-87335aeb3604" />

## 💡 About This Project

This is the **second stage** of developing my personal portfolio web application — building on the foundation from **Assignment 1**.
It’s a **responsive**, **interactive**, and **AI-enhanced** portfolio designed to showcase my skills, projects, and contact information in a clean, modern layout.

The portfolio now includes **dynamic content, data handling, and animations** to enhance user experience.

### 🧭 Main Sections

* **About Me** – A short introduction and tagline.
* **Skills** – A categorized list of technical tools and languages (New Section).
* **Projects** – A collection of projects that can be explored interactively.
* **Experience** – A summary of professional or academic experiences.
* **Contact** – A validated contact form with live user feedback.

---

## ⚙️ Features Implemented

### 🪄 **1. Dynamic & Interactive Content**

* **Time-Based Greeting**: The hero section greeting changes automatically based on the time of day (“Good Morning,” “Good Afternoon,” etc.).
* **Theme Switcher (Light/Dark Mode)**: Users can toggle between light and dark themes, and their preference is saved using **Local Storage**.
* **Responsive Navigation**: Smooth scrolling and active link highlighting when navigating between sections.
* **Interactive Buttons & Hover Effects**: Buttons and icons include hover transitions for better feedback.

### 💾 **2. Data Handling**

* Used **Local Storage** to remember the user’s selected theme preference (persisting after page reload).
* Added **Contact Form Validation** to check input fields before submission and show appropriate success or error messages.
* Added **Latest from GitHub** Fetched Live GitHub Data using the GitHub REST API to display the latest repositories dynamically in the Projects section.

### 🎨 **3. Animation & Transitions**

* Smooth hover animations on buttons, cards, and icons.
* Subtle fade-in effects for text and images as the user scrolls.
* Section transitions designed to feel fluid and modern, improving the overall UX.

### ⚠️ **4. Error Handling & User Feedback**

* Displays validation errors if form fields are left empty or incorrect.
* Shows a “Form submitted successfully” message for valid entries.
* Includes friendly fallback messages for interactive features if data or preferences cannot load.

### 🤖 **5. AI Integration**

AI tools were used to assist in design, debugging, and documentation:

| **AI Tool**                 | **Purpose**                                   | **Result/Improvement**                                    |
| --------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| **ChatGPT**                 | Debugging JS and improving theme toggle logic | Fixed event handling and optimized code                   |
| **Claude**                  | CSS and layout refinement                     | Improved animations, responsive alignment                 |
| **ChatGPT (Documentation)** | README and AI usage report writing            | Improved structure and clarity of technical documentation |

➡️ For a full breakdown of AI usage, see [docs/ai-usage-report.md](docs/ai-usage-report.md).

---

## 🧠 Technologies Used

* **HTML5** – Structure and semantic layout
* **CSS3** – Responsive design, animations, and transitions
* **JavaScript (ES6)** – Dynamic interactions and local storage handling
* **Font Awesome & Devicon** – Icons and visual enhancements
* **Figma** – Portfolio design planning and visual layout
* **AI Tools** – ChatGPT & Claude for improvement suggestions and debugging

---

## 🖥️ How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/reyyynad/Renad_Elsafi_Portfolio.git
   ```

2. **Open the folder:**
   Open the project in **VS Code** or your preferred IDE.

3. **Run the project:**

   * Open `index.html` directly in your browser, **or**
   * Use the **Live Server** extension:

     ```bash
     http://localhost:5500
     ```

---

## 🚀 Live Demo

🌐 **Live Site:** [reyyynad.github.io/Renad_Elsafi_Portfolio](https://reyyynad.github.io/Renad_Elsafi_Portfolio/)

The website is fully functional and responsive across devices.

---

## 📚 Documentation

* **`docs/ai-usage-report.md`** – Detailed log of how AI was used, including prompts, edits, and learning outcomes.
* **`docs/technical-documentation.md`** – Explains code structure, feature breakdown, and performance considerations.

---

## 🧩 Folder Structure

```
assignment-2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

---

## 📊 Learning Outcomes

Through this assignment, I learned how to:

* Integrate **dynamic JavaScript features** to improve interactivity.
* Use **Local Storage** for saving user preferences.
* Create **smooth animations and transitions** using CSS and JS.
* Apply **AI responsibly** to support code improvement and learning.
* Structure and document a real-world project effectively.

---

## 🧾 License

This project is developed for **educational purposes** as part of Assignment 2.
All assets and code belong to **Renad Elsafi** unless otherwise stated.

---

Would you like me to also draft the matching **`docs/ai-usage-report.md`** (the required AI documentation file) next?
It needs to include your prompts, tools, edits, and reflection — worth points in the rubric.
