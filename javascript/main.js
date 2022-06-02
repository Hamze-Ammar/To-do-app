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
    // console.log(id);
    // console.log(date);
    // console.log(title);
    // console.log(description);
    // console.log(point);
    // console.log(due_date);
    // console.log(is_done);

    // save to local storage

}


function displayTasksToDo(){
    let tasks_to_do = $("#tasks-to-do");
    let new_task = `<div class="task-box-header row">
                        <span>${id}</span>
                        <span>Created At</span>
                        <span>Title</span>
                        <span class="Description">${id}</span>
                        <span>${id}</span>
                        <span>${id}</span>
                        <span>${id}</span>
                        <span></span>
                    </div>`

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

