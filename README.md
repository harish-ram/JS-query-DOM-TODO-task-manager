# Task Manager - ES6 & jQuery Basics Project

A simple Task Manager application demonstrating fundamental JavaScript ES6 and jQuery concepts.

## Features

- ✅ Add, delete, and complete tasks
- 🔍 Filter tasks (All, Active, Completed)
- 📊 Task statistics (Total, Completed, Remaining)
- 💾 Persistent storage using localStorage
- 📱 Responsive design
- 🎨 Modern UI with gradient backgrounds

## Concepts Demonstrated

### ES6 JavaScript Basics

#### 1. **Variables & Data Types**
```javascript
const APP_NAME = 'Task Manager';        // const - immutable
let tasks = [];                          // let - mutable, block-scoped
let taskId = 0;                         // number data type
const MAX_TASKS = 100;                  // constant
let currentFilter = 'all';              // string data type
```

#### 2. **Data Structures**
- Objects: Task object with properties (id, text, completed, createdAt)
- Arrays: Array of task objects

#### 3. **Functions**
```javascript
// Regular function
function renderTaskList() { }

// Arrow function
const handleAddTask = () => { }

// Function with return value
const getStats = () => ({
    total, completed, remaining
});
```

#### 4. **Loops**
```javascript
// forEach - iterate with callback
filteredTasks.forEach((task) => { });

// for...of - iterate over values
for (const task of tasks) { }

// Traditional for loop
for (let i = 0; i < tasks.length; i++) { }

// while loop used implicitly in various functions
```

#### 5. **Array Operations**
```javascript
// map - transform array
tasks.map(task => task.text)

// filter - get matching elements
tasks.filter(task => task.completed)

// find - get first match
tasks.find(task => task.id === id)

// some - check if any matches
tasks.some(task => task.completed)

// every - check if all match
tasks.every(task => task.completed)

// reduce - accumulate values
tasks.reduce((count) => count + 1, 0)

// push - add element
tasks.push(createTask(text))

// splice/filter - remove element
tasks.filter(task => task.id !== id)
```

#### 6. **ES6 Features**
- Arrow functions: `() => { }`
- Template literals: `` `${variable}` ``
- Destructuring: `const { total, completed } = getStats()`
- const/let: Block scoping, immutability
- Default parameters
- Object shorthand: `{ id, text, completed }`

### jQuery Basics

#### 1. **DOM Selection**
```javascript
$('#taskInput')      // Select by ID
$('.filter-btn')     // Select by class
$(document)          // Select document
$(this)              // Select current element
```

#### 2. **DOM Manipulation**
```javascript
$().text()           // Get/set text content
$().html()           // Get/set HTML
$().val()            // Get/set input value
$().append()         // Add child
$().addClass()       // Add class
$().removeClass()    // Remove class
$().empty()          // Clear contents
$().prop()           // Get/set properties
$().data()           // Get data attributes
```

#### 3. **Event Handling**
```javascript
$().on('click', handler)        // Click event
$().on('keypress', handler)     // Keyboard event
$().on('change', handler)       // Change event
$(document).on('click', selector, handler)  // Event delegation
```

#### 4. **jQuery Utilities**
```javascript
$.each()            // Loop through elements
$(document).ready() // DOM ready
```

## File Structure

```
jsquery/
├── index.html       # HTML structure
├── style.css        # Styling
├── script.js        # JavaScript with jQuery
└── README.md        # Documentation
```

## How to Use

1. Open `index.html` in a web browser
2. Type a task in the input field
3. Click "Add Task" or press Enter
4. Click the checkbox to mark as complete
5. Click "Delete" to remove a task
6. Use filter buttons to view different task statuses
7. Click "Clear Completed" to remove all completed tasks

## Key Concepts Breakdown

### Creating Objects
```javascript
const createTask = (text) => ({
    id: ++taskId,
    text: text,
    completed: false,
    createdAt: new Date()
});
```

### Filtering Arrays
```javascript
const getFilteredTasks = () => {
    if (currentFilter === 'completed') {
        return tasks.filter(task => task.completed);
    } else if (currentFilter === 'active') {
        return tasks.filter(task => !task.completed);
    }
    return tasks;
};
```

### Event Delegation in jQuery
```javascript
$(document).on('click', '.delete-btn', function() {
    const id = parseInt($(this).data('id'));
    deleteTask(id);
});
```

### Local Storage
```javascript
const saveTasks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const loadTasks = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        tasks = JSON.parse(stored);
    }
};
```

## Learning Resources

- **ES6 Basics**: Variables (const/let), arrow functions, destructuring
- **jQuery**: Selectors, DOM manipulation, event handling
- **Array Methods**: map, filter, find, some, every, reduce, forEach
- **Data Persistence**: localStorage for client-side storage
- **Event Handling**: Click events, keyboard events, event delegation

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge) that support:
- ES6 JavaScript
- jQuery 3.6.0+
- localStorage
- Fetch API (for testing)

## Modifications & Exercises

Try these exercises to expand your learning:

1. Add due dates to tasks
2. Implement task categories
3. Add task priorities
4. Create an edit function
5. Add sorting options
6. Implement drag-and-drop
7. Add animations on add/delete
8. Create a search feature
9. Add keyboard shortcuts
10. Export tasks to JSON

## Notes

- Tasks are stored in browser's localStorage and persist across page reloads
- XSS protection is implemented with HTML escaping
- All array operations are functional (immutable where possible)
- jQuery is used for DOM manipulation and event handling
