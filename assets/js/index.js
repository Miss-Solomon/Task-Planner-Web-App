
const tm = new TaskManager();

//forms
const newTaskForm = document.querySelector("#taskForm"); 


//form variables
const submitButton = document.querySelector("#submitButton");

const newTaskName = document.querySelector('#newTaskNameInput');
const newTaskPerson = document.querySelector('#newTaskPersonInput');
const newTaskDate = document.querySelector('#newTaskDateInput');
const newTaskDescription = document.querySelector('#newTaskDescriptionInput');

const newTaskStatus = document.querySelector('#newTaskStatusInput');
//alert variables
const nameAlert = document.querySelector('.nameAlert')
const personAlert = document.querySelector('.personAlert')
const dateAlert = document.querySelector('.dateAlert')
const descriptionAlert = document.querySelector('.descriptionAlert')

//function to validate the form fields as required in Task 4
let validFormFieldInput = (data) => {
    //Task 4 asks that the Task Name be printed out to console as a test
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const name = newTaskNameInput.value;
    console.log("name:  "+name);
    //Not required in Task 4, but just to test if other fields give correct information
    console.log(`${document.querySelector('#newTaskDateInput').value} ${document.querySelector('#newTaskPersonInput').value} ${document.querySelector('#newTaskDescriptionInput').value} ${document.querySelector('#newTaskStatusInput').value}`);
    //Task 4: Code to show errors to users if the forms are not filled out. Note that the "Task Status" is not included as it will always have a status
    if (newTaskName.value == "") {
        nameAlert.hidden = false;
    } else {
        nameAlert.hidden = true;
    }

    if (newTaskPerson.value == "") {
        personAlert.hidden = false;
    } else {
        personAlert.hidden = true;
    }

    if (newTaskDate.value == "") {
        dateAlert.hidden = false;
    } else {
        dateAlert.hidden = true;
    }

    if (newTaskDescription.value == "") {
        descriptionAlert.hidden = false;
    } else {
        descriptionAlert.hidden = true;
    }

    return false;
}

let doNotSubmit = () => {
    return false; 
}



//submit button listening for the mouse click event
submitButton.addEventListener("click", validFormFieldInput);
//newTaskForm.addEventListener("submit", doNotSubmit());




tm.addTask('Take out the trash', 'Take out the trash to the front of the house', 'Nick', '2020-09-20');
console.log(tm.tasks);

const tasks = tm.tasks;
if(tasks.length > 0)
{
    const task = tasks[0];
    const taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, 
        task.dueDate, task.status);
    
    console.log(taskHtml);
}

