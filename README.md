# Oleksandr Meleshko - Personal Portfolio

A modern, responsive personal portfolio and CV website built with React and Vite.

## 🚀 Features

* **Modern UI/UX:** Clean, professional, and accessible design.
* **Responsive Layout:** Fully optimized for mobile, tablet, and desktop devices.
* **Dynamic Localization (i18n):** Easy translation switching with data driven from separate JSON files (`en.json`, `it.json`, `de.json`, `uk.json`).
* **Easy Content Management:** Entire portfolio content—including skills, experience, and education—is separated from the UI logic via a clean JSON structure, making updates fast and seamless.
* **Smooth Animations:** Powered by Framer Motion for a dynamic and engaging user experience.
* **Fast Performance:** Built with Vite for lightning-fast hot module replacement (HMR) and optimized production builds.

## 🛠️ Tech Stack

* **Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)

## 📝 Content Management

The portfolio content and user interface text are entirely decoupled from the source code and stored in structured JSON files. This allows you to update your experiences, skills, and languages easily without editing React components.

1. **Translations**: All supported languages are registered in `public/localization.json`. If you want to add a new language, append it there.
2. **Editing Content**: Each localized file (e.g., `public/en.json`) is split into two sections:
   * `"ui"` - Handles the translation strings for headings and labels.
   * `"content"` - Manages your personal attributes, competencies (e.g. `competencies`), technical skills (e.g. `technicalSkills>), and work history.
3. **Profile Picture**: The primary profile picture relies on `public/MainPhoto.jpg`. An automated fallback is provided via an Imgur URL if the file is missing.

---

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or higher recommended)
* npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the site.