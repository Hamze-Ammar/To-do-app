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
    let due_date =  $("#modal-due-date").val();
    console.log(id);
    console.log(date);
    console.log(title);
    console.log(description);
    console.log(point);
    console.log(due_date);

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

