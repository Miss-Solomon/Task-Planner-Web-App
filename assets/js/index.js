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

    if (newDate.value == "") {
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
const markDoneClick = (data) => {
    if (data.target.className.match("done-button")) {
        console.log("The clicker has been clicked!");
        let parentTask = data.target.parentNode.parentNode;
        parentTask.querySelector('p').className = "bg-secondary";
        //printing console.log for troubleshooting
        console.log(`This is the parent task of the task being marked done: ${parentTask}`);
        document.querySelector("#DoneColumn").appendChild(parentTask);
    }

    //console.log to check the class. troubleshooting related
    console.log(`This is the class of the task card being marked done: ${data.target.className}`);
}



//done button listener
taskList.addEventListener("click", markDoneClick);






//sample task cards for troubleshooting
tm.addTask('Take out the trash', 'Take out the trash to the front of the house', 'Nick', '2020-09-20', "To Do");
console.log(tm.tasks);

tm.addTask('Milk', 'Get milk from Betsy', 'Sherri', '2020-09-20', "To Do");
console.log(tm.tasks);

tm.addTask('Egg', 'Get eggs from chicken', 'Lee', '2020-09-20', "Review");
console.log(tm.tasks);


const tasks = tm.tasks;
if(tasks.length > 0)
{
    const task = tasks[0];
    const taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, 
        task.dueDate, task.status, task.id);
    
    // console.log(taskHtml);
}

//this was to troubleshoot. This will activate both render and statusColor
// tm.render();
// tm.statusColor();