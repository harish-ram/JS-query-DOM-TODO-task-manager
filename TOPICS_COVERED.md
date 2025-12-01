# Complete Reference: DOM, Events, Forms & localStorage

This document provides a comprehensive guide to all topics covered in the Task Manager application.

---

## 1️⃣ DOM MANIPULATION

DOM Manipulation involves selecting, creating, and modifying HTML elements on the page.

### jQuery DOM Manipulation

#### Selecting Elements
```javascript
// Select by ID
$('#taskInput')

// Select by class
$('.filter-btn')

// Select by tag
$('li')

// Select by attribute
$('[data-id="5"]')

// Combining selectors
$('ul li.completed')
```

**File: `script.js:245-249`** - Example in `renderTaskList()`

#### Creating Elements
```javascript
// Create new element with jQuery
const $li = $('<li>')
    .addClass('completed')
    .html(`<span>Task</span>`)
    .append(childElement);
```

**File: `script.js:262-274`** - Example in `renderTaskList()`

#### Modifying Content
```javascript
// Set text content
$('#totalTasks').text(total);

// Set HTML content
$taskList.html('<div>No tasks</div>');

// Set input value
$('#taskInput').val('new value');

// Get value
const text = $('#taskInput').val();
```

**File: `script.js:315-318`** - Example in `updateStats()`

#### Adding/Removing Classes
```javascript
// Add class
$('#taskInput').addClass('input-error');

// Remove class
$('.filter-btn').removeClass('active');

// Toggle class
$element.toggleClass('active');

// Check if has class
if ($element.hasClass('completed')) { }
```

**File: `script.js:196, 419, 428`** - Examples in event handlers

#### Setting Properties & Attributes
```javascript
// Set property (checked, disabled, etc.)
$('#clearBtn').prop('disabled', true);

// Get property
const isDisabled = $('#clearBtn').prop('disabled');

// Set data attribute
$element.data('id', '5');

// Get data attribute
const id = $element.data('id');
```

**File: `script.js:320`** - Example in `updateStats()`

#### Showing/Hiding Elements
```javascript
// Show element
$('.stats-section').show();

// Hide element
$('.stats-section').hide();

// Fade in
$errorMsg.fadeIn();

// Fade out
$errorMsg.fadeOut();
```

**File: `script.js:323-327`** - Example in `updateStats()`

#### Appending & Removing
```javascript
// Append child
$taskList.append($li);

// Insert after
$errorMsg.insertAfter($input);

// Remove element
$errorMsg.remove();

// Clear all children
$taskList.empty();
```

**File: `script.js:273, 201`** - Examples in various functions

### Native DOM Manipulation

#### Selecting Elements
```javascript
// Get by ID
const element = document.getElementById('taskInput');

// Get by class (returns NodeList)
const elements = document.querySelectorAll('.filter-btn');

// Get first match
const element = document.querySelector('li.completed');

// Get by tag
const elements = document.getElementsByTagName('li');
```

**File: `script.js:279-283`** - Example in `renderTaskListNative()`

#### Creating & Modifying
```javascript
// Create element
const li = document.createElement('li');

// Add class
li.classList.add('completed');

// Remove class
li.classList.remove('completed');

// Set text
li.textContent = 'Task text';

// Set HTML
li.innerHTML = '<span>Task</span>';

// Set attributes
li.setAttribute('data-id', '5');

// Append child
parent.appendChild(li);

// Remove element
element.remove();
```

**File: `script.js:290-306`** - Example in `renderTaskListNative()`

### Key jQuery vs Native DOM Differences

| Task | jQuery | Native DOM |
|------|--------|-----------|
| Select by ID | `$('#id')` | `document.getElementById('id')` |
| Select multiple | `$('.class')` | `document.querySelectorAll('.class')` |
| Set text | `$el.text('text')` | `el.textContent = 'text'` |
| Set HTML | `$el.html('<div>')` | `el.innerHTML = '<div>'` |
| Add class | `$el.addClass('name')` | `el.classList.add('name')` |
| Show/hide | `$el.show()/hide()` | `el.style.display = 'block'/'none'` |
| Append | `$el.append(child)` | `el.appendChild(child)` |

---

## 2️⃣ EVENT HANDLING

Event handling involves listening for user interactions and responding to them.

### Click Events

#### Static Elements
```javascript
// Button that exists in HTML
$('#addBtn').on('click', handleAddTask);
```

**File: `script.js:378`**

#### Event Delegation (Dynamic Elements)
```javascript
// Buttons added after page load
$(document).on('click', '.delete-btn', function() {
    const id = $(this).data('id');
    deleteTask(id);
});
```

**File: `script.js:406-412`** - Important for dynamically created elements!

### Keyboard Events

#### Keypress Event
```javascript
// Execute code when key is pressed
$('#taskInput').on('keypress', (e) => {
    if (e.which === 13) {  // 13 = Enter key
        handleAddTask();
    }
});
```

**File: `script.js:382-387`** - Allows pressing Enter to add task

#### Focus Event
```javascript
// Clear error when user focuses on input
$('#taskInput').on('focus', function() {
    clearFormError('taskInput');
});
```

**File: `script.js:400-402`**

#### Input Event (Real-time)
```javascript
// Fires as user types
$('#taskInput').on('input', function() {
    const length = $(this).val().length;
    console.log(`Characters: ${length}`);
});
```

**File: `script.js:440-444`**

### Change Events

```javascript
// Checkbox state change
$(document).on('change', '.task-checkbox', function() {
    const id = $(this).data('id');
    toggleTask(id);
    renderTaskList();
});
```

**File: `script.js:416-424`** - Using event delegation

### Mouse Events

```javascript
// Hover effects
$(document).on('mouseover', '.task-list li', function() {
    $(this).css('background-color', '#f0f0f0');
}).on('mouseout', '.task-list li', function() {
    $(this).css('background-color', '#f9f9f9');
});
```

**File: `script.js:448-452`**

### Document Ready

```javascript
// Ensures DOM is loaded before running code
$(document).ready(() => {
    // All event listeners and initialization here
});
```

**File: `script.js:373`** - Wraps all event handlers

### Event Object Properties

```javascript
$(document).on('click', function(e) {
    e.which        // Key code
    e.target       // Element that triggered event
    e.preventDefault()  // Stop default behavior
    e.stopPropagation() // Stop event bubbling
});
```

### Common Key Codes

| Key | Code |
|-----|------|
| Enter | 13 |
| Escape | 27 |
| Space | 32 |
| Arrow Up | 38 |
| Arrow Down | 40 |

---

## 3️⃣ FORMS

Forms involve input validation, data retrieval, and submission handling.

### Form Structure
```html
<form id="taskForm">
    <input type="text" id="taskInput" name="task" required>
    <button type="button" id="addBtn">Add Task</button>
</form>
```

**File: `index.html:14-17`**

### Getting Form Data

#### jQuery
```javascript
// Get input value
const text = $('#taskInput').val();

// Set input value
$('#taskInput').val('new value');

// Clear input
$('#taskInput').val('');
```

**File: `script.js:353-354`** - In `handleAddTask()`

#### Native DOM
```javascript
// Get value
const text = document.getElementById('taskInput').value;

// Set value
document.getElementById('taskInput').value = 'new value';
```

#### Get All Form Data
```javascript
const getFormData = () => {
    return {
        task: $('#taskInput').val(),
        timestamp: new Date().toISOString()
    };
};
```

**File: `script.js:227-231`**

### Form Validation

#### Input Validation
```javascript
// Check if empty
if (trimmedText === '') {
    showFormError('taskInput', 'Cannot be empty!');
    return false;
}

// Check length
if (trimmedText.length < 3) {
    showFormError('taskInput', 'Minimum 3 characters');
    return false;
}

// Check max length
if (trimmedText.length > 200) {
    showFormError('taskInput', 'Maximum 200 characters');
    return false;
}

// Check duplicates
if (tasks.some(t => t.text === trimmedText)) {
    showFormError('taskInput', 'Task already exists');
    return false;
}
```

**File: `script.js:111-140`** - In `addTask()`

### Form Error Handling

#### Display Error
```javascript
const showFormError = (inputId, message) => {
    const $input = $(`#${inputId}`);
    
    // Add error class
    $input.addClass('input-error');
    
    // Create/update error message
    let $errorMsg = $input.next('.error-message');
    if ($errorMsg.length === 0) {
        $errorMsg = $('<div class="error-message"></div>')
            .insertAfter($input);
    }
    $errorMsg.text(message).fadeIn();
};
```

**File: `script.js:192-203`**

#### Clear Error
```javascript
const clearFormError = (inputId) => {
    const $input = $(`#${inputId}`);
    $input.removeClass('input-error');
    $input.next('.error-message').fadeOut();
};
```

**File: `script.js:206-210`**

### Form Reset

```javascript
const resetForm = () => {
    // Native: Reset form to defaults
    const form = document.getElementById('taskForm');
    if (form) {
        form.reset();
    }
    
    // jQuery: Clear and reset
    $('#taskInput').val('').focus();
    clearFormError('taskInput');
};
```

**File: `script.js:213-223`**

### Form Submission

```javascript
const handleAddTask = () => {
    const $input = $('#taskInput');
    const text = $input.val();
    
    if (addTask(text)) {
        // Success: reset form
        $input.val('').focus();
        renderTaskList();
        updateStats();
        updateStorageStats();
    }
    // Error: validation message already shown
};
```

**File: `script.js:350-361`**

### CSS for Form Errors

```css
#taskInput.input-error {
    border-color: #ff6b6b;
    background-color: #ffe0e0;
}

.error-message {
    color: #ff6b6b;
    font-size: 0.85em;
    margin-top: 5px;
    padding: 5px 10px;
    background-color: #ffe0e0;
    border-radius: 3px;
}
```

**File: `style.css:60-73`**

---

## 4️⃣ LOCALSTORAGE

localStorage allows you to store data in the browser that persists across page reloads.

### What is localStorage?

- **Client-side storage**: Data stored on user's computer
- **Persistent**: Survives browser restarts
- **Per-domain**: Each website has separate storage
- **Size limit**: Usually 5-10MB per domain
- **Format**: Key-value pairs (strings only - JSON for objects)

### Creating Storage Key Constants

```javascript
const STORAGE_KEY = 'tasksData';
const SETTINGS_KEY = 'appSettings';
```

**File: `script.js:21-22`**

### Storing Data (CREATE/UPDATE)

```javascript
// Store data as JSON
const saveTasks = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        console.log(`✓ Saved ${tasks.length} tasks`);
    } catch (error) {
        console.error('Error saving:', error);
        alert('Failed to save. Storage full?');
    }
};
```

**File: `script.js:62-72`**

**Key Points:**
- Use `JSON.stringify()` to convert objects to strings
- Always wrap in try-catch for error handling
- Check storage quota before saving large data

### Retrieving Data (READ)

```javascript
// Get data from storage
const loadTasks = () => {
    try {
        // Retrieve by key
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (stored) {
            // Convert JSON string back to object
            tasks = JSON.parse(stored);
            console.log(`✓ Loaded ${tasks.length} tasks`);
        } else {
            console.log('📝 No data found');
        }
    } catch (error) {
        console.error('Error loading:', error);
        tasks = [];
    }
};
```

**File: `script.js:38-60`**

**Key Points:**
- Use `JSON.parse()` to convert strings back to objects
- Check if data exists before parsing
- Handle parse errors for corrupted data

### Checking if Key Exists

```javascript
const hasStorageKey = (key) => localStorage.getItem(key) !== null;

// Usage
if (hasStorageKey('tasksData')) {
    // Key exists in storage
}
```

**File: `script.js:86-87`**

### Getting All Storage Info

```javascript
const getStorageInfo = () => {
    console.log('📊 localStorage Info:');
    console.log(`Total keys: ${localStorage.length}`);
    
    // Loop through all stored items
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`  ${key}: ${value.substring(0, 50)}...`);
    }
};
```

**File: `script.js:74-83`**

**Methods used:**
- `localStorage.length` - Number of items
- `localStorage.key(i)` - Get key at index i

### Removing Data (DELETE)

```javascript
// Remove specific item
const removeFromStorage = (key) => {
    localStorage.removeItem(key);
    console.log(`🗑️ Removed ${key}`);
};

// Usage
removeFromStorage('tasksData');
```

**File: `script.js:89-92`**

### Clearing All Storage

```javascript
const clearAllStorage = () => {
    if (confirm('Clear ALL stored data?')) {
        localStorage.clear();
        console.log('🔄 All data cleared');
        location.reload();
    }
};
```

**File: `script.js:95-101`**

**Important:** This removes ALL localStorage data for the domain!

### localStorage Methods Summary

| Method | Purpose | Example |
|--------|---------|---------|
| `setItem(key, value)` | Store data | `localStorage.setItem('key', 'value')` |
| `getItem(key)` | Retrieve data | `const val = localStorage.getItem('key')` |
| `removeItem(key)` | Delete specific item | `localStorage.removeItem('key')` |
| `clear()` | Delete all items | `localStorage.clear()` |
| `key(index)` | Get key at index | `const key = localStorage.key(0)` |
| `length` | Number of items | `const count = localStorage.length` |

### When Data is Saved

- **Adding task**: Line 144 in `addTask()`
- **Deleting task**: Line 156 in `deleteTask()`
- **Toggling task**: Line 173 in `toggleTask()`
- **Clearing completed**: Line 180 in `clearCompleted()`

### Practical Example

```javascript
// Store user preferences
const saveSettings = (settings) => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
};

// Load user preferences
const loadSettings = () => {
    const stored = localStorage.getItem('appSettings');
    return stored ? JSON.parse(stored) : {};
};

// Check last visit
const getLastVisit = () => {
    return localStorage.getItem('lastVisit');
};

// Update last visit
const updateLastVisit = () => {
    localStorage.setItem('lastVisit', new Date().toISOString());
};
```

---

## Complete Flow Example

### User adds a task:

1. **Form Event** (line 378): Click button triggers `handleAddTask()`
2. **Form Data** (line 353): Get input value with `$('#taskInput').val()`
3. **Validation** (line 109-140): Check input in `addTask()`
4. **localStorage** (line 144): Save to storage with `saveTasks()`
5. **DOM Update** (line 358): Re-render list with `renderTaskList()`
6. **Event** (line 391): Focus event clears error messages

### User completes a task:

1. **Event Delegation** (line 416): Change event on dynamically added checkbox
2. **Update Data**: `toggleTask()` modifies array (line 172)
3. **localStorage** (line 173): Save updated state
4. **DOM Update** (line 421): Re-render with `renderTaskList()`
5. **Stats Update** (line 422): Update counters with `updateStats()`

---

## Debugging Tips

### Check localStorage in Console

```javascript
// View all stored data
getStorageInfo()

// View specific task count
getTotalTasksCount()

// View all task texts
getTaskTexts()

// Log all tasks
logAllTasks()

// Check if completed tasks exist
hasCompletedTasks()

// View raw storage
localStorage
localStorage.getItem('tasksData')
```

**File: `index.html:49-55`** - Debug info section

### Browser DevTools

1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **localStorage** in left panel
4. View all data for current domain
5. Edit/delete items directly

---

## Key Takeaways

### DOM Manipulation
- jQuery provides shortcuts for common DOM tasks
- Native DOM API is more verbose but powerful
- Always select elements before manipulating

### Event Handling
- Use event delegation for dynamic elements
- Check event object properties for details
- Remember common key codes for keyboard events

### Forms
- Always validate user input
- Provide clear error messages
- Clear form after successful submission

### localStorage
- Perfect for persisting user preferences/data
- Remember to use JSON.stringify/parse
- Always handle errors with try-catch
- Be aware of storage quota limits

---

## Files Reference

| File | Topic | Lines |
|------|-------|-------|
| `script.js` | All code examples | 1-503 |
| `index.html` | Form structure | 14-17 |
| `style.css` | Form error styling | 60-73 |

---

## Practice Exercises

1. Add form field for task priority
2. Save app settings (theme, language) to localStorage
3. Add input field validation with real-time feedback
4. Implement task search/filter using DOM queries
5. Add keyboard shortcuts (Ctrl+S to save)
6. Export localStorage data to JSON file
7. Add animated transitions to DOM updates
8. Create detailed error logs in localStorage
9. Add form autosave functionality
10. Implement undo/redo using localStorage history

