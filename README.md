# StockWatch

> A full-stack inventory management and task verification web application built for a real-world restaurant client.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## Overview

StockWatch was built to solve a real operational problem at **[Gami Chicken and Beer (Hawthorn, VIC)](https://www.gamichicken.com.au/restaurant/hawthorn/)** — manually tracking daily stock counts and closing tasks was error-prone and time-consuming. This app replaces paper-based processes with a mobile-friendly web interface that restaurant staff use every shift.

The project demonstrates end-to-end ownership: requirements gathering from a real client, UI/UX design, full-stack development, and cloud deployment.

---

## Key Features

| Feature | Description |
|---|---|
| 📦 **Real-time Inventory Tracking** | Staff update stock quantities directly from their phones; changes sync instantly via Firestore. |
| 📅 **Inventory History by Date** | Managers can browse past stock submissions filtered by date for accountability and auditing. |
| ✅ **Closing Checklist with Photo Verification** | Staff mark tasks complete and upload photos as proof; managers can review today's and yesterday's uploads. |
| 🖼️ **Client-side Image Compression** | Photos are compressed in the browser before uploading to Firebase Storage, reducing storage costs and improving upload speed. |
| ⚡ **Responsive Mobile-first Design** | Fully usable on phones — the primary device used by kitchen staff during their shift. |

---

## Tech Stack

### Frontend
- **React 18** with **TypeScript** — component-based UI with strong typing
- **React Router v6** — client-side routing with nested layouts
- **Tailwind CSS** — utility-first styling with a custom responsive grid
- **Headless UI** — accessible UI primitives (dropdowns, dialogs)
- **Vite** — fast development server and optimised production builds

### Backend & Infrastructure
- **Firebase Firestore** — NoSQL real-time database for stock and task records
- **Firebase Storage** — cloud storage for task verification photos
- **Firebase Hosting** — production deployment via CLI

### Tooling
- **ESLint** + **Prettier** — enforced code style and linting
- **browser-image-compression** — client-side image optimisation before upload

---

## Architecture Highlights

- **Custom React Hooks** — reusable logic extracted into `useInputFields`, `useFlashMessage`, and `useHorizontalScroll` to keep components clean.
- **Context API** — `FlashMessageProvider` delivers global UI feedback (success/error toasts) across the component tree without prop drilling.
- **Modular Firebase layer** — all Firestore and Storage calls are separated into dedicated modules (`fetchStock`, `fetchTasks`, `updateStock`, `uploadTasks`), keeping business logic out of components.
- **Type-safe throughout** — TypeScript interfaces are defined for all data models, API responses, and component props.

---

## Demo

▶️ Watch the full walkthrough:

[![StockWatch Demo](http://img.youtube.com/vi/STfpD1Epv-I/0.jpg)](https://www.youtube.com/watch?v=STfpD1Epv-I)

---

## Screenshots

**Dashboard**

<img src="./stockWatch-images/Dashboard.png" width="45%" alt="Dashboard"/>

&nbsp;

**Stock List — Counting & Submitting Stock**

<img src="./stockWatch-images/counting-stock.png" width="45%" alt="Counting stock"/>
<img src="./stockWatch-images/submited-stock.PNG" width="45%" alt="Submitted stock"/>

&nbsp;

**Stock History — Browse Records by Date**

<img src="./stockWatch-images/Record-by-date.png" width="45%" alt="Record by date"/>

&nbsp;

**Closing Checklist — Task List & Submission**

<img src="./stockWatch-images/tasklist.png" width="45%" alt="Task list"/>
<img src="./stockWatch-images/submited-tasks.png" width="45%" alt="Submitted tasks"/>

&nbsp;

**Closing Checklist — Reviewing Uploaded Photos**

<img src="./stockWatch-images/viewing_tasks.png" width="45%" alt="Viewing uploaded tasks"/>

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A Firebase project with Firestore and Storage enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Brian3010/StockWatchApp.git
   cd StockWatchApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your Firebase config:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all TypeScript files |

---

## Contact

I'm actively looking for opportunities as a software developer. Feel free to reach out!

- **Email:** [briannguyenwg@gmail.com](mailto:briannguyenwg@gmail.com)
- **LinkedIn:** [linkedin.com/in/brian-nguyen-411483196](https://www.linkedin.com/in/brian-nguyen-411483196/)
- **GitHub:** [github.com/Brian3010](https://github.com/Brian3010)
