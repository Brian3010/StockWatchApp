# StockWatch

**A real-world inventory management and shift task verification app built for a restaurant client — deployed and actively used in production.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## Demo / Screenshots

▶️ [Watch the full video walkthrough](https://www.youtube.com/watch?v=STfpD1Epv-I)

| Dashboard | Stock Entry | Stock History |
|---|---|---|
| <img src="./stockWatch-images/Dashboard.png" width="250" alt="Dashboard"/> | <img src="./stockWatch-images/counting-stock.png" width="250" alt="Counting stock"/> | <img src="./stockWatch-images/Record-by-date.png" width="250" alt="Stock history"/> |

| Closing Checklist | Submitted Tasks | Photo Review |
|---|---|---|
| <img src="./stockWatch-images/tasklist.png" width="250" alt="Task list"/> | <img src="./stockWatch-images/submited-tasks.png" width="250" alt="Submitted tasks"/> | <img src="./stockWatch-images/viewing_tasks.png" width="250" alt="Photo review"/> |

---

## Features

- 📦 **Real-time stock tracking** — staff update quantities on their phones; Firestore syncs instantly
- 📅 **Inventory history by date** — managers review and audit past stock submissions at any time
- ✅ **Closing checklist** — end-of-shift task list with photo upload for proof of completion
- 🖼️ **Client-side image compression** — photos compressed in-browser before upload, reducing storage costs
- 📱 **Mobile-first responsive UI** — designed for kitchen staff using phones during a shift
- ⚡ **Flash notification system** — global success/error feedback delivered via React Context

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- React Router v6 (nested layouts)
- Tailwind CSS (utility-first, custom responsive breakpoints)
- Headless UI (accessible component primitives)
- Vite (dev server + optimised builds)

**Backend & Cloud**
- Firebase Firestore (real-time NoSQL database)
- Firebase Storage (photo uploads)
- Firebase Hosting (production deployment)

**Tooling**
- ESLint + Prettier (enforced code style)
- browser-image-compression (client-side image optimisation)

---

## Architecture / How It Works

```
src/
├── components/       # Shared UI components (NavBar, Footer, FlashMessage, etc.)
├── context/          # React Context providers (FlashMessageProvider)
├── firebase/         # Firebase config + modular data access layer
│   ├── fetchStock/   # Firestore read operations for stock data
│   ├── fetchTasks/   # Firestore read operations for task data
│   ├── updateStock/  # Firestore write operations for stock
│   └── uploadTasks/  # Firebase Storage + Firestore writes for tasks
├── hooks/            # Custom hooks (useInputFields, useFlashMessage, useHorizontalScroll)
├── pages/            # Route-level page components
└── utils/            # Shared utility functions
```

**Key patterns:**
- **Separation of concerns** — all Firebase calls live in a dedicated data layer; pages and components contain no direct Firestore logic
- **Custom hooks** — form state, scroll behaviour, and flash notifications are each encapsulated in their own hook
- **Context API** — `FlashMessageProvider` wraps the app to deliver typed success/error messages globally without prop drilling
- **TypeScript throughout** — interfaces defined for all Firestore data models, component props, and context types

---

## Getting Started

**Prerequisites:** Node.js ≥ 18, a Firebase project with Firestore and Storage enabled.

```bash
# 1. Clone the repo
git clone https://github.com/Brian3010/StockWatchApp.git
cd StockWatchApp

# 2. Install dependencies
npm install

# 3. Add your Firebase config
cp .env.example .env   # then fill in your values
```

`.env` variables required:

```env
VITE_FIREBASE_APIKEY=your_api_key
```

```bash
# 4. Start the dev server
npm run dev
# → http://localhost:5173
```

---

## Usage

| Script | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all TypeScript files |

---

## Why This Project Matters

Restaurant staff at [Gami Chicken and Beer (Hawthorn)](https://www.gamichicken.com.au/restaurant/hawthorn/) previously tracked stock and closing tasks manually on paper — a slow, error-prone process with no audit trail.

StockWatch replaces that entirely. It was scoped, designed, built, and deployed by a single developer based on real requirements from a real client. The app is production-hosted and used by staff every shift.

This project demonstrates the ability to:
- Translate real-world business problems into working software
- Own the full stack from UI to cloud infrastructure
- Make pragmatic architectural decisions (e.g. BaaS over a custom API for a small team)
- Ship and maintain a production application

---

## Future Improvements

- 🔐 **Authentication** — role-based access (manager vs. staff views)
- 📊 **Analytics dashboard** — visualise stock trends over time
- 🔔 **Push notifications** — alert managers when tasks are overdue
- 🧪 **Unit & integration tests** — expand test coverage with Vitest + Testing Library

---

## Author

**Brian Nguyen**

- 📧 [briannguyenwg@gmail.com](mailto:briannguyenwg@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/brian-nguyen-411483196/)
- 🐙 [GitHub](https://github.com/Brian3010)
