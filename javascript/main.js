//=========Modal part==========
// Get the modal
var modal = $("#myModal");

// Get the button that opens the modal
var addNewTask = $("#myBtn");

// Get the <span> element that closes the modal
var closeModal = $('.close').eq(0);

// When the user clicks on the button, open the modal
addNewTask.click( function() {
    modal.show();
})

// When the user clicks on <span> (x), close the modal
closeModal.click ( function() {
    modal.hide();
})

//=========End Modal part==========

//=========Overlay Search Bar==========
let open_search = $("#openSearch");
let close_search = $("#closeBtnSearch");
open_search.click(function(){
    $("#myOverlay").show();
});
close_search.click(function(){
    $("#myOverlay").hide();
})

//=========End Overlay Search Bar==========


// Display tasks on load
$(document).ready(function(){
    displayTasksOnLoad();
});

// On load get and display tasks form localStorage
function displayTasksOnLoad(){
    const tasks_to_do = JSON.parse(localStorage.getItem("tasks_to_do"));
    if (tasks_to_do) {
        for (let i=0; i<tasks_to_do.length ; i++){
            displayTasksToDo(tasks_to_do[i]);
        }
    }
    const completed_tasks = JSON.parse(localStorage.getItem("tasks_completed"));
    if (completed_tasks) {
        for (let i=0; i<completed_tasks.length ; i++){
            displayCompletedTask(completed_tasks[i]);
        }
    }
}


//=========Create Task==========
let add_new_task = $("#modal-add-task");
add_new_task.click(function(){
    createTask();
})

function createTask(){
    let id = getId(); //to be coded
    let date = getDateTime();
    let title = $("#modal-title").val();
    let description = $("#modal-description").val();
    let point = $("#modal-point").val();
    let due_date =  $("#modal-due-date").val();;
    let is_done = false;
    // create new task object
    let new_task = {
        id: id,
        date: date,
        title: title,
        description: description,
        point: point,
        due_date: due_date,
        is_done: is_done,
    }
    saveToLocalStorage(new_task);
    displayTasksToDo(new_task);

}

function displayTasksToDo(new_task){
    // Get the element
    let tasks_to_do = $("#tasks-to-do");
    let new_task_element = `<div class="task-box-header row">
                        <span class="row-id" >${new_task.id}</span>
                        <span class="row-Created">${new_task.date}</span>
                        <span class="row-Title">${new_task.title}</span>
                        <span class="row-Description">${new_task.description}</span>
                        <span class="row-Point">${new_task.point}</span>
                        <span class="row-Due">${new_task.due_date}</span>
                        <span class="row-done">${new_task.is_done}</span>
                        <span class="row-Options"><i onClick="markAsDone(this)" id="fa-check" class="fa-solid fa-check"></i><i class="fa-solid fa-pen"></i><i onClick="deletePost(this)" class="fa-solid fa-trash-can"></i></span>
                    </div>`
    tasks_to_do.append(new_task_element);
}



function saveToLocalStorage(new_task){
    //should return an array of objects
    const tasks_to_do = JSON.parse(localStorage.getItem("tasks_to_do"));
    if (tasks_to_do){
        console.log("detected content");
        // Push new task
        tasks_to_do.push(new_task);
        localStorage.setItem("tasks_to_do", JSON.stringify(tasks_to_do));
        console.log(tasks_to_do);
    }else{
        console.log("no detected content");
        let tasks_to_do = [];
        tasks_to_do.push(new_task);
        localStorage.setItem("tasks_to_do", JSON.stringify(tasks_to_do));
        console.log(tasks_to_do);
        
    }
}

// get id from local storage
function getId(){
    let id = localStorage.getItem("id");
    let new_id;
    if (id===null){
        new_id = 0;
        localStorage.setItem("id", new_id);
    }else{
        new_id = Number(id) + 1;
        localStorage.setItem("id", new_id );
    }
    return new_id;
}

function convertDate(timestamp){
    //timestamp *= 1000;
    timestamp = String(timestamp);
    console.log(typeof timestamp);
    let my_date = new Date(timestamp);
    //console.log(my_date);
    my_date = String(my_date).slice(4, 25);
    //console.log(my_date);
}

// Get Date and Time
function getDateTime(){
    let now = new Date();
    return now.toLocaleString();
}



// Delete task
let deletePost = (e) => {
    let id = e.parentElement.parentElement.firstElementChild.innerHTML;
    e.parentElement.parentElement.remove();
    removeTaskFromStorage(id);
};

function removeTaskFromStorage(id){
    //should return an array of objects
    const tasks_to_do = JSON.parse(localStorage.getItem("tasks_to_do"));
    console.log(typeof tasks_to_do[0] );
    for (let i=0; i<tasks_to_do.length ; i++) {
        console.log("forloop")
        if (tasks_to_do[i].id == id){

            console.log("task found at index i= " + i)
            console.log(tasks_to_do[i]);
            console.log(tasks_to_do[i].id);
            let removed_task = tasks_to_do[i];
            tasks_to_do.splice(i, 1);
            //update local storage
            localStorage.setItem("tasks_to_do", JSON.stringify(tasks_to_do));
            return removed_task;
        }
    }
}

// Mark as done task
let markAsDone = (e) => {
    let id = e.parentElement.parentElement.firstElementChild.innerHTML;
    e.parentElement.parentElement.remove();
    let completed_task = removeTaskFromStorage(id);
    console.log(completed_task);
    moveToCompletedTasks(completed_task);
    displayCompletedTask(completed_task);
}

// Save tasks to completed tasks in local storage
function moveToCompletedTasks(task){
    //should return an array of objects
    const tasks_completed = JSON.parse(localStorage.getItem("tasks_completed"));
    if (tasks_completed){
        console.log("detected content");
        // Push new task
        tasks_completed.push(task);
        localStorage.setItem("tasks_completed", JSON.stringify(tasks_completed));
        console.log(tasks_completed);
    }else{
        console.log("no detected content");
        let tasks_completed = [];
        tasks_completed.push(task);
        localStorage.setItem("tasks_completed", JSON.stringify(tasks_completed));
        console.log(tasks_completed);
        
    }
}

// Display in table
function displayCompletedTask(task){
    let is_done = true;
    // Get the element
    let task_completed = $("#tasks-completed");
    let new_task_element = `<div class="task-box-header row">
                        <span class="row-id" >${task.id}</span>
                        <span class="row-Created">${task.date}</span>
                        <span class="row-Title">${task.title}</span>
                        <span class="row-Description">${task.description}</span>
                        <span class="row-Point">${task.point}</span>
                        <span class="row-Due">${task.due_date}</span>
                        <span class="row-done">${is_done}</span>
                        <span class="row-Options"><i onClick="deleteCompletedPost(this)" class="fa-solid fa-trash-can"></i></span>
                    </div>`
    task_completed.append(new_task_element);
}

// Remove completed task from table
let deleteCompletedPost = (e) => {
    let id = e.parentElement.parentElement.firstElementChild.innerHTML;
    e.parentElement.parentElement.remove();
    console.log("deleteCompletedPost" + id);
    deleteFromLocalStorage(id);
};

// Remove completed task from local storage
function deleteFromLocalStorage(target_id){
    //should return an array of objects
    const  completed_tasks = JSON.parse(localStorage.getItem("tasks_completed"));
    for (let i=0; i<completed_tasks.length ; i++) {
        console.log(i);
        console.log("forloop");
        if (completed_tasks[i].id == target_id){
            console.log("task found at index i= " + i)
            console.log(completed_tasks[i]);
            console.log(completed_tasks[i].id);
            //let removed_task = completed_tasks[i];
            completed_tasks.splice(i, 1);
            //update local storage
            localStorage.setItem("tasks_completed", JSON.stringify(completed_tasks));
            //return removed_task;
        }
    }
}