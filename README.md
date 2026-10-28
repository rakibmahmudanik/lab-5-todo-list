# Todo List Application (Lab 5)

A modern, responsive Todo List web application built using **React.js**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Features Implemented

1. **Vite + React Setup**: Fast, modern frontend development environment configured directly in the project root.
2. **Tailwind CSS Integration**: Fully configured with `tailwind.config.js` and `postcss.config.js` for clean styling.
3. **State Management (`useState`)**:
   - Manages tasks list state dynamically.
   - Controlled input for task entry with enter-key submission and whitespace trimming.
   - Filter state (`all`, `active`, `completed`).
4. **Add Tasks**: Form to append new tasks with unique timestamps as IDs.
5. **Dynamic Rendering (`map()`)**: Iterates through tasks and displays them dynamically in the UI.
6. **Toggle Task Status**: Interactive checkboxes to mark tasks as completed or incomplete with visual strikethrough styling.
7. **Delete Tasks**: Remove individual tasks with a single click on the delete button.
8. **Remaining Tasks Counter**: Real-time counter displaying the number of active, incomplete tasks left.
9. **Filtering & Bulk Actions**:
   - Filter tasks by "All", "Active", and "Completed".
   - "Clear completed" button to quickly clean up finished tasks.
10. **Persistence**: Saves tasks in `localStorage` so data remains between browser refreshes.

---

## 🛠️ Tech Stack

- **React.js 18** (Components, Hooks: `useState`, `useEffect`)
- **Vite** (Build tool & development server)
- **Tailwind CSS 3** (Utility-first CSS styling)
- **PostCSS & Autoprefixer**

---

## 💻 How to Run

### 1. Install Dependencies (if not already installed)
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to the local URL (typically `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

