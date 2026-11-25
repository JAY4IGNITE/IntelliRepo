# IntelliRepo Frontend

The frontend for IntelliRepo is a web dashboard built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 Features

* **Dashboard Analytics**: Overview of synchronized repositories, language distributions, and repository health metrics.
* **GitHub Integration**: Connect and synchronize personal GitHub repositories.
* **Authentication**: Secure user registration, login, and JWT session handling.
* **Theme Support**: Seamless Dark/Light mode toggle powered by React Context.
* **Modern UI Primitives**: Accessible dialogs, tooltips, cards, and buttons powered by Radix UI and Tailwind CSS.

---

## 🛠 Available Scripts

Inside the `frontend` directory, you can run:

### `npm run dev`
Starts the Vite local development server with hot module replacement (HMR) at `http://localhost:5173`.

### `npm run build`
Compiles TypeScript with `tsc -b` and builds optimized static production assets to the `dist/` directory.

### `npm run lint`
Runs fast code linting via `oxlint`.

### `npm run preview`
Locally previews the production build output generated in `dist/`.

---

## 📂 Project Structure

```
frontend/
├── public/                 # Favicon and static SVGs
├── src/
│   ├── animations/         # Framer Motion animation variants
│   ├── assets/             # Images and local media
│   ├── components/         # Reusable UI widgets and layout wrappers
│   │   └── ui/             # Radix UI and Tailwind primitives (buttons, inputs, cards, etc.)
│   ├── context/            # AuthContext and ThemeContext
│   ├── lib/                # Axios API client and class utility helpers
│   ├── pages/              # Views (Dashboard, Repositories, Settings, Login, Register, Landing)
│   ├── App.tsx             # Root routing and context provider hierarchy
│   ├── index.css           # Global Tailwind CSS imports and CSS theme variables
│   └── main.tsx            # Application entry point
├── package.json
└── vite.config.ts
```

---

## ⚙️ Environment Variables

Optionally create a `.env` file in the `frontend` root:

```env
# URL of the backend FastAPI server (defaults to /api or http://127.0.0.1:8000)
VITE_API_URL=http://127.0.0.1:8000
```
