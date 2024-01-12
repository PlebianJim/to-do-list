// Function to create a new to-do item
function createNewItem(task) {
    // Create a new list item element
    const item = document.createElement("li");
    // Set the inner text of the list item to the task
    item.innerText = task;
    // Add an event listener to the list item for click events, which will call the markAsComplete function
    item.addEventListener("click", markAsComplete);
  
    // Create a remove button element
    const removeButton = document.createElement("button");
    // Set the inner text of the remove button to "x"
    removeButton.innerText = "x";
    // Add an event listener to the remove button for click events, which will call the removeItem function
    removeButton.addEventListener("click", removeItem);
  
    // Append the remove button to the list item
    item.appendChild(removeButton);
    // Return the newly created list item
    return item;
  }
  
  // Function to mark an item as complete
  function markAsComplete() {
    // Toggle the "completed" class on the clicked list item, which will add or remove the line-through style
    this.classList.toggle("completed");
    // Update the local storage with the current list
    updateLocalStorage();
  }
  
  // Function to remove an item
  function removeItem() {
    // Remove the parent node (the list item) of the clicked remove button from the DOM
    this.parentNode.remove();
    // Update the local storage with the current list
    updateLocalStorage();
  }
  
  // Function to update the local storage with the current list
  function updateLocalStorage() {
    // Get all the list items
    const listItems = document.querySelectorAll("#list li");
    // Create an empty array to hold the tasks
    const taskList = [];
    // Loop through each list item and add its inner text to the taskList array
    listItems.forEach(function(item) {
      taskList.push(item.innerText);
    });
    // Store the taskList array as a JSON string in the local storage
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }
  
  // Event listener for adding a new item
  document.getElementById("addButton").addEventListener("click", function() {
    // Get the input field element
    const inputField = document.getElementById("inputField");
    // Get the value of the input field (the entered task)
    const task = inputField.value;
    // Check if the task is not empty
    if (task) {
      // Create a new list item using the createNewItem function and passing the task as an argument
      const newItem = createNewItem(task);
      // Append the new list item to the list element with the id "list"
      document.getElementById("list").appendChild(newItem);
      // Clear the input field by setting its value to an empty string
      inputField.value = "";
      // Update the local storage with the current list
      updateLocalStorage();
    }
  });
  
  // Load the list from local storage when the page loads
  window.addEventListener("load", function() {
    // Get the task list from the local storage as a JSON string
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    // Check if the task list exists
    if (taskList) {
      // Loop through each task in the task list and create a new list item using the createNewItem function
      taskList.forEach(function(task) {
        const newItem = createNewItem(task);
        // Append the new list item to the list element with the id "list"
        document.getElementById("list").appendChild(newItem);
      });
    }
  });