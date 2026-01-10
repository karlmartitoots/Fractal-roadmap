The Core UX Concept: "The Fractal Navigator"

Instead of a giant, static Gantt chart or a massive Trello board, imagine a recursive tree where every task can be its own roadmap.

Key Experience Pillars:

The "Deep Dive" Focus: When you click a goal, the screen clears. That goal becomes the new "Header," and you only see the 3-5 sub-tasks for that specific node. This prevents the "too large" feeling by physically limiting your field of view.
The "Breadcrumb" Trail: A simple line at the top (e.g., My Business > Marketing > Social Media) keeps you grounded without showing the entire forest.
AI "Sub-mapping": A single button next to any task that says "Break this down." It sends that specific task to an LLM to generate 3 logical next steps, which appear as new nodes.

2. The "Vibe Coding" Stack (Build it in 1 hour)
To get this running today, you don't want a database or a complex framework. You want a single-file React or HTML application that uses localStorage.
UI Library: Tailwind CSS (for speed and aesthetics).
Data Structure: A simple nested JSON object.
Interaction: * Click to enter a node.
Backspace/Esc to go up one level.
Cmd+Enter to add a new sub-task.

3. The Feature Roadmap (Iterative)

Iteration A (The AI Breakdown): "Jules, add a 'Magic' button next to each task. When clicked, it should call a placeholder function that I will eventually hook up to Gemini to auto-generate 3 sub-tasks."

Iteration B (Visual Progress): "Add a progress ring around the 'Zoom Out' button that shows how many sub-tasks in the parent node are completed."

Iteration C (The Aesthetic): "Make the transitions between levels feel like a 'Zoom' animation. When I enter a task, it should feel like I'm diving deeper into the map."

Iteration D: Add a 'Download Roadmap' button that saves your entire fractal tree as a JSON file
