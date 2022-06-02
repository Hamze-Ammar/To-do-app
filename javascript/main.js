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




//=========Create Task==========
let add_new_task = $("#modal-add-task");
add_new_task.click(function(){
    createTask();
})

function createTask(){
    let id = getId(); //to be coded
    let date = Date.now();
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
                        <span>${new_task.id}</span>
                        <span>${new_task.date}</span>
                        <span>${new_task.title}</span>
                        <span class="Description">${new_task.description}</span>
                        <span>${new_task.point}</span>
                        <span>${new_task.due_date}</span>
                        <span>${new_task.is_done}</span>
                        <span></span>
                    </div>`
    tasks_to_do.append(new_task_element);
}

// On load get and display tasks form localStorage
function displayTasksOnLoad(){
    const tasks_to_do = JSON.parse(localStorage.getItem("tasks_to_do"));
    if (tasks_to_do) {
        for (let i=0; i<tasks_to_do.length ; i++){
            displayTasksToDo(tasks_to_do[i]);
        }
    }

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

displayTasksOnLoad();