//Note to console.log that this js page is linked.
console.log("index.js is linked.");
const tm = new TaskManager();

//forms
const newTaskForm = document.querySelector("#taskForm"); 

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

        //for loop for clearing out the form after a push to new task list
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].value = "";
        }

        //setting the status back to "To Do"
        newTaskStatus.value = "To Do";

    } else {
        console.log("Alerts are shown. No pushing the task to the Task List.")
    };
    //Etta: Why are we returning false here?
    // return false;
}
//Etta what does this do?
let doNotSubmit = () => {
    return false; 
}



//submit button listening for the mouse click event
submitButton.addEventListener("click", validFormFieldInput);
//Temporarily comment it out
// newTaskForm.addEventListener("submit", doNotSubmit);




tm.addTask('Take out the trash', 'Take out the trash to the front of the house', 'Nick', '2020-09-20');
console.log(tm.tasks);