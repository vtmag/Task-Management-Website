document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    let tasks = []; // Array to store tasks

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get form input values
        const taskTitle = document.getElementById("taskTitle").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;
        
        // Create task object
        const task = {
            id: Date.now(),
            title: taskTitle,
            description: taskDescription,
            dueDate: dueDate,
            priority: priority
        };
        
       // Add task to tasks array
       tasks.push(task);
        
       // Sort tasks by priority (high to low)
       tasks.sort((a, b) => {
           const priorityOrder = { high: 1, medium: 2, low: 3 };
           return priorityOrder[a.priority] - priorityOrder[b.priority];
       });
       
       // Clear existing task list
       taskList.innerHTML = "";
       
       // Add sorted tasks to task list
       tasks.forEach(addTaskToList);
       
       // Reset form inputs
       taskForm.reset();

       
    });

    function addTaskToList(task) {
        // Create list item for the task
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <strong>${task.title}</strong><br>
            Description: ${task.description}<br>
            Due Date: ${task.dueDate}<br>
            Priority: ${task.priority}<br>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;
        
        // Add event listeners for edit and delete buttons
        const editBtn = taskItem.querySelector(".editBtn");
        editBtn.addEventListener("click", function() {
            editTask(task);
        });

        // Add delete button click event listener
        const deleteBtn = taskItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", function() {
            deleteTask(task);
        });
        
        // Append task item to task list
        taskList.appendChild(taskItem);

        taskList.appendChild(document.createElement("hr"));
    }

    function editTask(task) {
        // Prompt user to enter updated task details
        const updatedTitle = prompt("Enter updated title:", task.title);
        if (updatedTitle === null) {
            return; // User clicked cancel
        }
        const updatedDescription = prompt("Enter updated description:", task.description);
        if (updatedDescription === null) {
            return; // User clicked cancel
        }
        const updatedDueDate = prompt("Enter updated due date:", task.dueDate);
        if (updatedDueDate === null) {
            return; // User clicked cancel
        }
        const updatedPriority = prompt("Enter updated priority (high, medium, low):", task.priority);
        if (updatedPriority === null) {
            return; // User clicked cancel
        }
        
        // Update task details
        task.title = updatedTitle;
        task.description = updatedDescription;
        task.dueDate = updatedDueDate;
        task.priority = updatedPriority;
        
        // Re-render task list with updated tasks
        taskList.innerHTML = "";
        tasks.forEach(addTaskToList);
    }

    function deleteTask(task) {
        // Remove task from tasks array
        tasks = tasks.filter(t => t !== task);
        
        // Re-render task list without deleted task
        taskList.innerHTML = "";
        tasks.forEach(addTaskToList);
    }


});
