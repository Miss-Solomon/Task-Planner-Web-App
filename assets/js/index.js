//Note to console.log that this js page is linked.
console.log("index.js is linked.");

const tm = new TaskManager();

//new taskform pointer
const newTaskForm = document.querySelector("#taskForm"); 

//Pointer to mark done buttons in index.html task list
const taskList = document.querySelector('#taskCardsSection');

//Task list form variables
const submitButton = document.querySelector("#submitButton");

const newTaskName = document.querySelector('#newTaskNameInput');
const newPerson = document.querySelector('#newPersonInput');
const newDate = document.querySelector('#newDateInput');
const newDescription = document.querySelector('#newDescriptionInput');
const newTaskStatus = document.querySelector('#newTaskStatusInput');
const formInputs = document.querySelectorAll('.newTaskFormInput');

//alert variables
const nameAlert = document.querySelector('.nameAlert');
const personAlert = document.querySelector('.personAlert');
const dateAlert = document.querySelector('.dateAlert');
const descriptionAlert = document.querySelector('.descriptionAlert');
const allAlerts = (document.getElementsByClassName("alert"));

//function to validate the form fields as required in Task 4
let validFormFieldInput = (data) => {
    //Task 4 asks that the Task Name be printed out to console as a test
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const name = newTaskNameInput.value;
    console.log("name:  "+name);

    //Not required in Task 4, but just to test if other fields give correct information
    console.log(`Date: ${document.querySelector('#newDateInput').value} Person: ${document.querySelector('#newPersonInput').value} Desc: ${document.querySelector('#newDescriptionInput').value} Status: ${document.querySelector('#newTaskStatusInput').value}`);

    //Task 4: Code to show errors to users if the forms are not filled out. Note that the "Task Status" is not included as it will always have a status
    if (newTaskName.value == "") {
        nameAlert.hidden = false;
    } else {
        nameAlert.hidden = true;
    }

    if (newPerson.value == "") {
        personAlert.hidden = false;
    } else {
        personAlert.hidden = true;
    }

    if (newDate.value.length < 10) {
        dateAlert.hidden = false;
    } else {
        dateAlert.hidden = true;
    }

    if (newDescription.value == "") {
        descriptionAlert.hidden = false;
    } else {
        descriptionAlert.hidden = true;
    }

    //Task 5: If all alerts are hidden = true, then push new task into task list
    if (descriptionAlert.hidden) {
        console.log("No alerts are shown. Will push task");
        //adding current values in the new task form into the task list
        tm.addTask(newTaskName.value, newDescription.value, newPerson.value, newDate.value, newTaskStatus.value);
        console.log(tm.tasks);

        //this calls the render() after the new task is added under the task list
        tm.render();

        //for loop for clearing out the form after a push to new task list
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].value = "";
        }

        //setting the status back to "To Do"
        newTaskStatus.value = "To Do";

    } else {

        //this shows up on the console log when there are errors. Just for troubleshooting purposes
        console.log("Alerts are shown. No pushing the task to the Task List.")
    };
    
    // return false;
}

//for future references, will stop submit
let doNotSubmit = () => {
    return false; 
}



//submit button listening for the mouse click event
submitButton.addEventListener("click", validFormFieldInput);



//function that moves tasks to the done column and change their color to match
//deactivated since there is a better function down below.

// const markDoneClick = (data) => {
//     //checking if the button is clicked
//     if (data.target.className.match("done-button")) {
//         //console.log indicating that the button is successfully clicked
//         console.log("The clicker has been clicked!");

//         data.target.hidden = true;
//         console.log(data.target.innerHTML);
        
//         //pointing to the parent div of the task card
//         let parentTask = data.target.parentNode.parentNode;

//         //changing the color of the card into the done column color
//         parentTask.querySelector('p').className = "bg-secondary";

//         //console.log the task card's old status before it changes
//         console.log(`This is the old task status: ${parentTask.getAttribute("task-status")}`);

//         //changing the status of the task card to done
//         data.target.parentNode.parentNode.setAttribute("task-status", "Done");

//         //printing console.log the html of the entire task card for troubleshooting
//         console.log(`This is the parent task of the task being marked done: ${parentTask.outerHTML}`);

//         document.querySelector("#DoneColumn").appendChild(parentTask);
//     }

//     //console.log to check to make sure the status attribute of the moved task card is changed
//     setTimeout(console.log(`This is the newly updated task status: ${data.target.parentNode.parentNode.getAttribute("task-status")}`), 10000);
// }



//done button listener
// taskList.addEventListener("click", markDoneClick);







//function that moves tasks to the done column and change their color to match
const changeStatus = (data) => {

    //checking if the button is clicked
    if (data.target.value.match("Done")) {
        //console.log indicating that the button is successfully clicked
        console.log("The clicker has been clicked!");
        
        //pointing to the parent div of the task card
        let parentTask = data.target.parentNode.parentNode;

        //changing the color of the card into the done column color, gray
        parentTask.querySelector('p').className = "bg-secondary";

        //console.log the task card's old status before it changes
        console.log(`This is the old task status: ${parentTask.getAttribute("task-status")}`);

        //changing the status of the task card to done
        data.target.parentNode.parentNode.setAttribute("task-status", "Done");

        //printing console.log the html of the entire task card for troubleshooting
        console.log(`This is the parent task of the task being marked done: ${data.target.parentNode.querySelector('.done-button')}`);

        //hide Move Task button
        data.target.parentNode.querySelector('.done-button').setAttribute("hidden", true);
        //hide drop down list
        data.target.setAttribute("hidden", true);

        //This gets the id of the task having their status changed
        let id = Number(parentTask.getAttribute("data-task-id"));

        //This checks the id of the task's status being changed and changes the status of the task list array item as well.
        changeStatusOnList(id, "Done");

        //This appends the task card into the Done column
        document.querySelector("#DoneColumn").appendChild(parentTask);

    } else if (data.target.value.match("Review")) {

        //console.log indicating that the button is successfully clicked
        console.log("The clicker has been clicked!");
        
        //pointing to the parent div of the task card
        let parentTask = data.target.parentNode.parentNode;

        //changing the color of the card into the review column color, red
        parentTask.querySelector('p').className = "bg-danger";

        //console.log the task card's old status before it changes
        console.log(`This is the old task status: ${parentTask.getAttribute("task-status")}`);

        //changing the status of the task card to Review
        data.target.parentNode.parentNode.setAttribute("task-status", "Review");

        //This gets the id of the task having their status changed
        let id = Number(parentTask.getAttribute("data-task-id"));

        //This checks the id of the task's status being changed and changes the status of the task list array item as well.
        changeStatusOnList(id, "Review");

        //This appends the task card into the review column
        document.querySelector("#ReviewColumn").appendChild(parentTask);

    } else if ((data.target.value.match("Doing"))) {

        //console.log indicating that the button is successfully clicked
        console.log("The clicker has been clicked!");
        
        //pointing to the parent div of the task card
        let parentTask = data.target.parentNode.parentNode;

        //changing the color of the card into the Doing column color, yellow
        parentTask.querySelector('p').className = "bg-warning";

        //console.log the task card's old status before it changes
        console.log(`This is the old task status: ${parentTask.getAttribute("task-status")}`);

        //changing the status of the task card to done
        data.target.parentNode.parentNode.setAttribute("task-status", "Doing");

        //This gets the id of the task having their status changed
        let id = Number(parentTask.getAttribute("data-task-id"));

        //This checks the id of the task's status being changed and changes the status of the task list array item as well.
        changeStatusOnList(id, "Doing");

        //This appends the task card into the Doing column
        document.querySelector("#DoingColumn").appendChild(parentTask);

    } else if (data.target.value.match("To Do")) {

        //console.log indicating that the button is successfully clicked
        console.log("The clicker has been clicked!");
        
        //pointing to the parent div of the task card
        let parentTask = data.target.parentNode.parentNode;

        //changing the color of the card into the To Do column color, green
        parentTask.querySelector('p').className = "bg-success";

        //console.log the task card's old status before it changes
        console.log(`This is the old task status: ${parentTask.getAttribute("task-status")}`);

        //changing the status of the task card to done
        data.target.parentNode.parentNode.setAttribute("task-status", "To Do");

        //This gets the id of the task having their status changed
        let id = Number(parentTask.getAttribute("data-task-id"));

        //This checks the id of the task's status being changed and changes the status of the task list array item as well.
        changeStatusOnList(id, "To Do");

        //adding the task card back into the To Do column of the task list
        document.querySelector("#ToDoColumn").appendChild(parentTask);

    } else {

        //this prints to console when the change status button was changed or some error occured
        console.log("A status was not changed.")
    }

    //console.log to check to make sure the status attribute of the moved task card is changed
    setTimeout(console.log(`This is the newly updated task status: ${data.target.parentNode.parentNode.getAttribute("task-status")}`), 10000);

}

//This checks the id of the task's status being changed and changes the status of the task list array item as well.
const changeStatusOnList = (id, status) => {
    let task = tm.getTaskById(id);
    task.status = status;
}



//This listens to a change in the drop down menu of the individual tasks in the task list
taskList.addEventListener("change", changeStatus);



//sample task cards for troubleshooting
// tm.addTask('Take out the trash', 'Take out the trash to the front of the house', 'Nick', '2020-09-20', "To Do");
// console.log(tm.tasks);

// tm.addTask('Milk', 'Get milk from Betsy', 'Sherri', '2020-09-20', "To Do");
// console.log(tm.tasks);

// tm.addTask('Egg', 'Get eggs from chicken', 'Lee', '2020-09-20', "Review");
// console.log(tm.tasks);


const tasks = tm.tasks;
if(tasks.length > 0)
{
    const task = tasks[0];
    const taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, 
        task.dueDate, task.status, task.id);
    
    // console.log(taskHtml);
}

// this was to troubleshoot. This will activate both render and statusColor
// tm.render(0);
// tm.statusColor();