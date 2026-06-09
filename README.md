# 🌐 Atlas Job Portal

An advanced, high-performance job directory and application management ecosystem styled meticulously after the minimalist, premium **Atlas Intelligence** design language. Optimized for the modern tech landscape, this platform features precise Indian Rupee (INR) compensation indexers, immersive visual filters, dynamic interactive components, and fluid animations.

---

## 🚀 How to Export & Upload this Project to GitHub

Google AI Studio provides seamless workflows for exporting your projects. You can upload this workspace directly to a GitHub repository using one of the two standard methods below:

### Method 1: Direct Export via Settings Menu (Highly Recommended)
1. **Open Settings**: Locate the **Settings** gear icon in the top-right corner of the Google AI Studio interface.
2. **Select Export**: Click on **Export to GitHub** or **Export as ZIP**.
3. **Authenticate**: If exporting directly, connect and authorize your GitHub account.
4. **Choose Repository**: Create a brand new repository or choose an existing public/private repository in your account to commit the active codebase directly.

### Method 2: Manual Git Upload (Via Local Clone / ZIP)
1. **Download ZIP**: Select **Export as ZIP** from the settings menu and extract it on your desktop.
2. **Initialize Git**: Open your terminal in the extracted folder and run:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Atlas Job Portal"
   ```
3. **Publish to GitHub**:
   * Go to [GitHub](https://github.com) and create a new repository called `atlas-job-portal`.
   * Link your local workspace and push your main branch:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/atlas-job-portal.git
     git branch -M main
     git push -u origin main
     ```

---

## ✨ Features Breakdown

### 💼 Integrated Job & Company Indexers
* **Interactive Marketplace**: Browse and filter premium tech jobs across multiple parameters like remote type (Remote, Hybrid, Onsite) and experience tier.
* **Smart Salary Filtering**: Real-time salary scaling with customizable slider caps, natively formatted in the elegant Indian Standard Numeral System (e.g., Crores, Lakhs) via custom mathematical formatting utilities.
* **Interactive Detail Pane**: Fluid transitions display extensive metadata about selected roles, including detailed role briefs, core tech stacks, work culture, and interactive application triggers.

### 🏢 Startup Hub & Venture Tracking
* **Bento Funding Grid**: Seamlessly view venture indicators, seed histories, and Q2 AI startup funding tracks formatted in active Indian Rupees.
* **Founders Directory**: Discover leading venture leaders, project stages, and engineering personnel profiles.

### 📬 Application Board & Local Persistence
* **Dynamic Candidate Tracker**: Fill out customizable, real-time application sheets. Submit cover letters, portfolio links, and contact information.
* **Instant Action Feeds**: Automated system prompts, live bookmarking/saving logic, and temporary application statuses are persisted elegantly via active React states.

---

## 🛠️ Technology Stack & Architectures

The workspace is structured around a highly optimised, modern front-end stack ensuring speed, modularity, and pixel-perfect rendering.

* **Framework:** [React 19](https://react.dev/) using advanced React hooks and functional styling patterns.
* **Bundler & Tooling:** [Vite 6](https://vite.dev/) with super-fast cold starts and optimized compiler constraints.
* **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) with a rich custom color utility stack.
* **Transitions & Micro-interactions:** [Motion](https://motion.dev/) (from `motion/react`) driving premium spring timelines, sticky card translation offsets, and layout changes.
* **Icons:** [Lucide React](https://lucide.dev/) for precise lightweight vector system typography.
* **Formatting Engine:** Custom multi-variant regex processors located in `src/data.ts` to seamlessly manage text transformations from USD metrics into INR.

---

## 🏗️ Folder Hierarchy

```yaml
├── .env.example        # Reference environment keys template
├── .gitignore          # Production build & cache exclusions
├── index.html          # Standard Single Page Application index skeleton
├── metadata.json       # App name, description, and permissions manifest
├── package.json        # Manifest of operational scripts and packages
├── tsconfig.json       # Strict type compiling and resolution parameters
├── vite.config.ts      # Tailwind CSS v4 and path alias config
└── src
    ├── App.tsx         # Main entry stage, navigation router & modal layers
    ├── data.ts         # Global seeding indexes, stats, and INR currency formatting
    ├── index.css       # Global stylesheet & Tailwind CSS import triggers
    ├── main.tsx        # High-performance virtual DOM attachment script
    └── types.ts        # Fully structured, reusable TypeScript interfaces
```

---

## 💻 Local Development Setup

Follow these directions to spin up the application on your local terminal:

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed on your system.

### 1. Install Dependencies
Navigate into the root project directory and run:
```bash
npm install
```

### 2. Run the Development Server
Launch the local Hot Module Replacement (HMR) development server:
```bash
npm run dev
```
The application will boot, typically accessible on [http://localhost:3000](http://localhost:3000).

### 3. Build & Production Check
Generate a minified, production-ready static bundle inside the `dist/` folder:
```bash
npm run build
```

Verify your code types and ensure compile compliance via:
```bash
npm run lint
```

---

## 🎨 Visual Identity Aesthetics

* **Clean Margins**: Balanced display negative space following the Inter typography grid.
* **Premium Accents**: Signature dynamic colors integrated beautifully with dark slates and white card headers.
* **Accessible Typography**: Pairings of standard crisp system sans-serif headers with monospace indices for numeric salaries and indices.

---

*This document is formatted for optimal display inside both human-readable markdown platforms and standard GitHub markdown interfaces.*
