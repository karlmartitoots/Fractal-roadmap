# Fractal-roadmap

A recursive, focus-oriented task management tool that allows you to break down goals into infinite sub-tasks. Instead of overwhelming you with a giant list, Fractal-roadmap lets you "zoom in" on specific tasks, keeping your view clean and your focus sharp.

[**Live Demo**](https://karlmartitoots.github.io/Fractal-roadmap/)

## Key Features

*   **Recursive Task Nesting:** Every task can become its own project with its own sub-tasks. There is no limit to the depth.
*   **Spatial Zoom Navigation:** Navigate through your task tree with smooth zoom transitions (powered by Framer Motion) that provide a sense of depth and context.
*   **Focus Mode:** By zooming in, you hide the "noise" of the rest of the tree, allowing you to focus entirely on the immediate sub-tasks at hand.
*   **Breadcrumb Navigation:** Always know where you are in the hierarchy with an interactive breadcrumb trail.
*   **Progress Tracking:** Visual indicators (strikethroughs and completion states) propagate up the tree. Completing all sub-tasks automatically completes the parent.
*   **"Magic" Breakdown:** A placeholder AI feature. Click the magic wand button to simulate auto-generating sub-tasks for a goal.
*   **Local Persistence:** Your data is saved automatically to your browser's Local Storage, so you won't lose your work upon refresh.

## How to Use

1.  **Navigation:**
    *   **Zoom In:** Click on any task in the list to "dive" into it and view its sub-tasks.
    *   **Zoom Out:** Use the "Zoom Out" button or click a parent link in the breadcrumb trail to move up a level.

2.  **Managing Tasks:**
    *   **Add:** Type a task name in the input field at the bottom and click "Add" to create a new sub-task for the current level.
    *   **Complete:** Click the checkbox next to a task to mark it as done. This status bubbles up the tree.
    *   **Delete:** Hover over a task row to reveal the delete (✕) button. You will be asked to confirm before the task is removed.

3.  **The "Magic" Button (✨):**
    *   Click the sparkle icon next to a task to automatically generate 3 sample sub-tasks.
    *   If you click this on a task in the list, the app will automatically zoom into that task to show you the newly generated items.

## Development

If you want to run this project locally or contribute:

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm (comes with Node.js)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/karlmartitoots/Fractal-roadmap.git
    cd Fractal-roadmap
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally
Start the development server:
```bash
npm run dev
```
Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173/Fractal-roadmap/`).

### Testing
Run the test suite with Vitest:
```bash
npm run test
```

## Tech Stack
*   **React:** UI Component library.
*   **Vite:** Fast build tool and development server.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Framer Motion:** Library for animations and gestures.
