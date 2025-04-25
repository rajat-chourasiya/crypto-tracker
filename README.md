# Crypto-Tracker (React + Vite + TypeScript) App

This is a modern React application built with Vite, TypeScript, Tailwind CSS, Redux Toolkit, and React Query. It uses scalable patterns, live data fetching, and global state management to create a responsive and performant front-end.

Project Output

![image](https://github.com/user-attachments/assets/5494797b-40d4-4f15-a19a-9cc8a9f32f0d)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/rajat-chourasiya/crypto-tracker.git
cd your-repo-name

🧪 Tech Stack

Tech | Purpose
React 18 | UI Library
Vite | Frontend Build Tool
TypeScript | Type-Safe JavaScript
Tailwind CSS | Utility-first CSS framework
Redux Toolkit | Global state management
React Query | Server-side state + caching
React Router | Client-side routing
Toaster / Sonner | Toast notifications

🧱 Project Structure
src/
├── App.tsx                # Root component with routing & providers
├── main.tsx               # App entry point
├── store/                 # Redux store setup
├── pages/
│   ├── Index.tsx          # Home page
│   └── NotFound.tsx       # 404 fallback page
├── components/ui/         # UI components like Toaster, Tooltip
├── index.css              # Tailwind + custom base styles
├── App.css                # Logo animation and layout tweaks
└── vite-env.d.ts          # Vite environment type declarations


🧠 Architecture Overview

Component-Based: Reusable and composable UI.
Global State: Redux Toolkit for app-wide logic like authentication or toggles.
Server State: React Query manages API calls, caching, and live updates.
Routing: React Router handles navigation and 404 pages.
Styling: Tailwind CSS for rapid and consistent design.


📦 Dependencies Highlights

@reduxjs/toolkit
@tanstack/react-query
react-router-dom
tailwindcss
sonner or toaster (for toasts)
vite
