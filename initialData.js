/**
 * @typedef {"todo" | "doing" | "done"} TaskStatus
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {TaskStatus} status
 */

// Initial list of tasks that are rendered into kanban board 
const initialTasks = [
  { id: 1, title: "Launch Epic Career 🚀", description: "Create a killer Resume", status: "todo" },
  { id: 2, title: "Master JavaScript 💛", description: "Get comfortable with the fundamentals", status: "doing" },
  { id: 3, title: "Keep on Going 🏆", description: "You're almost there", status: "doing" },
  { id: 11, title: "Learn Data Structures and Algorithms 📚", description: "Study fundamental data structures and algorithms to solve coding problems efficiently", status: "todo" },
  { id: 12, title: "Contribute to Open Source Projects 🌐", description: "Gain practical experience and collaborate with others in the software development community", status: "done" },
  { id: 13, title: "Build Portfolio Projects 💪", description: "Create a portfolio showcasing your skills and projects to potential employers", status: "done" }
];

// DOM references for the three task columns
const columns = {
  todo: document.querySelector('[data-status="todo"] .tasks-container'),
  doing: document.querySelector('[data-status="doing"] .tasks-container'),
  done: document.querySelector('[data-status="done"] .tasks-container'),
};

// Create modal element and attach to the DOM
const modal = createModal();
document.body.appendChild(modal);
let currentTask = null;

// Render all tasks into their respective columns
function renderTasks(tasks) {
  clearColumns();
  tasks.forEach(task => {
    const el = createTaskElement(task);
    columns[task.status].appendChild(el);
  });
}

// Clear all task elements from columns
function clearColumns() {
  Object.values(columns).forEach(col => col.innerHTML = '');
}

// Create a DOM element for a single task
function createTaskElement(task) {
  const div = document.createElement('div');
  div.className = 'task-div';
  div.textContent = task.title;
  div.addEventListener('click', () => openModal(task)); // Open modal when task is clicked
  return div;
}

// Create the modal element and its inner content and logic
function createModal() {
  const modal = document.createElement('div');
  modal.id = 'task-modal';
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button id="modal-close">&times;</button>
      <h3>Task</h3>
      <label>Title</label>
      <input type="text" id="modal-title" placeholder="Task title" />
      <label>Description</label>
      <textarea id="modal-desc" rows="4" placeholder="Task description"></textarea>
      <label>Status</label>
      <select id="modal-status">
        <option value="todo">To Do</option>
        <option value="doing">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button id="modal-save">Save</button>
    </div>
  `;
}

 // Close modal when the close button is clicked
  modal.querySelector('#modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });


