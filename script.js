// ==========================================
// ES6 & jQuery Basics Demo - Task Manager
// Topics Covered:
// 1. DOM Manipulation (jQuery & Native DOM)
// 2. Event Handling (Click, Keypress, Change, Delegation)
// 3. Forms (Input, Validation, Reset)
// 4. localStorage (CRUD operations, Error handling)
// ==========================================

// ========== VARIABLES & DATA TYPES ==========

// const: constant, cannot be reassigned
const APP_NAME = 'Task Manager';

// let: block-scoped, can be reassigned
let tasks = [];

// Different data types
let taskId = 0;
const MAX_TASKS = 100;
const STORAGE_KEY = 'tasksData';
const SETTINGS_KEY = 'appSettings';
let currentFilter = 'all';


// ========== DATA STRUCTURES ==========

// Object - represents a single task
const createTask = (text) => ({
    id: ++taskId,
    text: text,
    completed: false,
    createdAt: new Date()
});

// ========== LOCALSTORAGE EXAMPLES ==========

// Topic: localStorage - Retrieve data
const loadTasks = () => {
    try {
        // localStorage.getItem() - Retrieve value by key
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (stored) {
            // Parse JSON string back to object
            tasks = JSON.parse(stored);
            
            // Find the highest ID to continue from there
            if (tasks.length > 0) {
                taskId = Math.max(...tasks.map(t => t.id));
            }
            console.log(`✓ Loaded ${tasks.length} tasks from localStorage`);
        } else {
            console.log('📝 No tasks found in localStorage - starting fresh');
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasks = [];
    }
};

// Topic: localStorage - Store data
const saveTasks = () => {
    try {
        // localStorage.setItem() - Store key-value pair as JSON
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        console.log(`💾 Saved ${tasks.length} tasks to localStorage`);
    } catch (error) {
        console.error('Error saving tasks:', error);
        alert('Failed to save tasks. Storage might be full.');
    }
};

// Topic: localStorage - Get all storage info
const getStorageInfo = () => {
    console.log('📊 localStorage Info:');
    console.log(`- Total keys: ${localStorage.length}`);
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`  ${key}: ${value.substring(0, 50)}...`);
    }
};

// Topic: localStorage - Check if key exists
const hasStorageKey = (key) => localStorage.getItem(key) !== null;

// Topic: localStorage - Remove specific item
const removeFromStorage = (key) => {
    localStorage.removeItem(key);
    console.log(`🗑️ Removed ${key} from localStorage`);
};

// Topic: localStorage - Clear all data
const clearAllStorage = () => {
    if (confirm('Clear ALL stored data? This cannot be undone.')) {
        localStorage.clear();
        console.log('🔄 All localStorage data cleared');
        location.reload();
    }
};


// ========== ARRAY OPERATIONS ==========

// Topic: Forms - Validation
// Add task to array with comprehensive validation
const addTask = (text) => {
    // Trim whitespace from form input
    const trimmedText = text.trim();
    
    // Validation 1: Check if input is empty
    if (trimmedText === '') {
        showFormError('taskInput', 'Task cannot be empty!');
        return false;
    }
    
    // Validation 2: Check minimum length
    if (trimmedText.length < 3) {
        showFormError('taskInput', 'Task must be at least 3 characters!');
        return false;
    }
    
    // Validation 3: Check maximum length
    if (trimmedText.length > 200) {
        showFormError('taskInput', 'Task cannot exceed 200 characters!');
        return false;
    }
    
    // Validation 4: Check task limit
    if (tasks.length >= MAX_TASKS) {
        alert(`Maximum ${MAX_TASKS} tasks allowed!`);
        return false;
    }
    
    // Validation 5: Check for duplicate tasks
    if (tasks.some(task => task.text.toLowerCase() === trimmedText.toLowerCase())) {
        showFormError('taskInput', 'Task already exists!');
        return false;
    }
    
    // Add task to array
    tasks.push(createTask(trimmedText));
    saveTasks();
    clearFormError('taskInput');
    return true;
};

// Delete task from array
const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
};

// Toggle task completion
const toggleTask = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
    }
};

// Clear completed tasks
const clearCompleted = () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
};

// Filter tasks based on status
const getFilteredTasks = () => {
    if (currentFilter === 'completed') {
        return tasks.filter(task => task.completed);
    } else if (currentFilter === 'active') {
        return tasks.filter(task => !task.completed);
    }
    return tasks;
};

// Get statistics
const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
};


// ========== FORM HELPER FUNCTIONS ==========

// Topic: Forms - Error display
const showFormError = (inputId, message) => {
    // DOM Manipulation: Get element and add error class
    const $input = $(`#${inputId}`);
    $input.addClass('input-error');
    
    // DOM Manipulation: Show or update error message
    let $errorMsg = $input.next('.error-message');
    if ($errorMsg.length === 0) {
        $errorMsg = $('<div class="error-message"></div>').insertAfter($input);
    }
    $errorMsg.text(message).fadeIn();
};

// Topic: Forms - Clear error
const clearFormError = (inputId) => {
    const $input = $(`#${inputId}`);
    $input.removeClass('input-error');
    $input.next('.error-message').fadeOut(() => $(this).remove());
};

// Topic: Forms - Reset form
const resetForm = () => {
    // Native DOM: Get form element
    const form = document.getElementById('taskForm') || document.querySelector('form');
    if (form) {
        form.reset();
    }
    
    // jQuery: Clear input and remove errors
    $('#taskInput').val('').focus();
    clearFormError('taskInput');
};

// Topic: DOM Manipulation - Get form data
const getFormData = () => {
    return {
        task: $('#taskInput').val(),
        timestamp: new Date().toISOString()
    };
};

// Topic: DOM Manipulation - Set form data
const setFormData = (data) => {
    $('#taskInput').val(data.task);
};


// ========== FUNCTIONS & LOOPS ==========

// Topic: DOM Manipulation - Render list with jQuery
// Regular function
function renderTaskList() {
    // DOM Selection: Get element by ID
    const $taskList = $('#taskList');
    
    // DOM Manipulation: Clear all children
    $taskList.empty();

    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        // DOM Manipulation: Set HTML content
        $taskList.html('<div class="empty-state">No tasks yet. Add one to get started!</div>');
        return;
    }

    // forEach loop - iterate through array
    filteredTasks.forEach((task) => {
        // Topic: DOM Manipulation - Create elements
        const $li = $('<li>')
            // DOM Manipulation: Add conditional class
            .addClass(task.completed ? 'completed' : '')
            // DOM Manipulation: Set HTML with template literal
            .html(`
                <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${escapeHtml(task.text)}</span>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            `);
        
        // Topic: DOM Manipulation - Append child element
        $taskList.append($li);
    });
}

// Topic: DOM Manipulation - Native DOM methods example
function renderTaskListNative() {
    // Native DOM: Get element by ID
    const taskList = document.getElementById('taskList');
    
    // Native DOM: Clear content
    taskList.innerHTML = '';

    const filteredTasks = getFilteredTasks();

    // forEach with native DOM
    filteredTasks.forEach((task) => {
        // Native DOM: Create new element
        const li = document.createElement('li');
        
        // Native DOM: Add class
        if (task.completed) {
            li.classList.add('completed');
        }
        
        // Native DOM: Set HTML
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        `;
        
        // Native DOM: Append child
        taskList.appendChild(li);
    });
}

// Topic: DOM Manipulation - Update elements with jQuery
// Update statistics display
function updateStats() {
    const { total, completed, remaining } = getStats();
    
    // DOM Manipulation: Update text content
    $('#totalTasks').text(total);
    $('#completedTasks').text(completed);
    $('#remainingTasks').text(remaining);
    
    // DOM Manipulation: Set element properties
    $('#clearBtn').prop('disabled', completed === 0);
    
    // DOM Manipulation: Toggle visibility based on condition
    if (total === 0) {
        $('.stats-section').hide();
    } else {
        $('.stats-section').show();
    }
}

// Topic: DOM Manipulation - Update with native DOM
function updateStatsNative() {
    const { total, completed, remaining } = getStats();
    
    // Native DOM: Update text content
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('remainingTasks').textContent = remaining;
    
    // Native DOM: Set element properties
    document.getElementById('clearBtn').disabled = (completed === 0);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Topic: Forms - Form submission handler
// Arrow function - handles form submission
const handleAddTask = () => {
    const $input = $('#taskInput');
    const text = $input.val();
    
    if (addTask(text)) {
        $input.val('').focus();
        renderTaskList();
        updateStats();
        updateStorageStats();
    }
};

// Topic: DOM Manipulation - Update display with data
// Update storage stats display
const updateStorageStats = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const count = stored ? JSON.parse(stored).length : 0;
    $('#storageStats').text(count);
};

// Initialize app
const initApp = () => {
    loadTasks();
    renderTaskList();
    updateStats();
    updateStorageStats();
};


// ========== JQUERY EVENT HANDLERS ==========

// Topic: Event Handling - Document ready
$(document).ready(() => {
    initApp();

    // Topic: Event Handling - Click event on static element
    // Add task button click
    $('#addBtn').on('click', handleAddTask);

    // Topic: Event Handling - Keyboard event (Keypress)
    // Add task on Enter key
    $('#taskInput').on('keypress', (e) => {
        // e.which = 13 is the Enter key code
        if (e.which === 13) {
            handleAddTask();
        }
    });

    // Topic: Event Handling - Keyboard focus event
    // Clear error on focus
    $('#taskInput').on('focus', function() {
        clearFormError('taskInput');
    });

    // Topic: Event Handling - Event delegation for dynamic elements
    // Delete task - Using event delegation because buttons are added dynamically
    $(document).on('click', '.delete-btn', function() {
        // this refers to the clicked button element
        const id = parseInt($(this).data('id'));
        deleteTask(id);
        renderTaskList();
        updateStats();
        updateStorageStats();
    });

    // Topic: Event Handling - Change event with delegation
    // Toggle task completion - Checkbox change event
    $(document).on('change', '.task-checkbox', function() {
        // event delegation for dynamic checkboxes
        const id = parseInt($(this).data('id'));
        toggleTask(id);
        renderTaskList();
        updateStats();
        updateStorageStats();
    });

    // Topic: Event Handling - Click with class selector
    // Filter buttons - Using static element selector
    $('.filter-btn').on('click', function() {
        // Remove active class from all buttons
        $('.filter-btn').removeClass('active');
        // Add active class to clicked button
        $(this).addClass('active');
        // Get data attribute value
        currentFilter = $(this).data('filter');
        renderTaskList();
    });

    // Topic: Event Handling - Click with confirmation dialog
    // Clear completed tasks
    $('#clearBtn').on('click', () => {
        // Using confirm() for user confirmation
        if (confirm('Delete all completed tasks?')) {
            clearCompleted();
            renderTaskList();
            updateStats();
            updateStorageStats();
        }
    });

    // Topic: Event Handling - Input event (real-time)
    // Character counter example
    $('#taskInput').on('input', function() {
        const length = $(this).val().length;
        // Show character count (can be used for dynamic feedback)
        console.log(`Characters entered: ${length}/200`);
    });

    // Topic: Event Handling - Mouseover/Mouseout
    // Add hover effects (optional enhancement)
    $(document).on('mouseover', '.task-list li', function() {
        $(this).css('background-color', '#f0f0f0');
    }).on('mouseout', '.task-list li', function() {
        $(this).css('background-color', '#f9f9f9');
    });
});


// ========== ADDITIONAL ARRAY OPERATIONS EXAMPLES ==========

// map - transform array
const getTaskTexts = () => tasks.map(task => task.text);

// reduce - accumulate values
const getTotalTasksCount = () => tasks.reduce((count) => count + 1, 0);

// some - check if any element matches
const hasCompletedTasks = () => tasks.some(task => task.completed);

// every - check if all elements match
const allTasksCompleted = () => tasks.every(task => task.completed);

// find - get first matching element
const getTaskById = (id) => tasks.find(task => task.id === id);

// For...of loop example
const logAllTasks = () => {
    for (const task of tasks) {
        console.log(`${task.text} - ${task.completed ? 'Done' : 'Pending'}`);
    }
};

// Traditional for loop
const printTasks = () => {
    for (let i = 0; i < tasks.length; i++) {
        console.log(`${i + 1}. ${tasks[i].text}`);
    }
};
