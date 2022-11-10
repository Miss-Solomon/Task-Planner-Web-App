//Note to console.log that this js page is linked.
console.log("taskManager.js is linked.");

//create Task in HTML
const createTaskHtml = (name, description, assignedTo, dueDate, status, id) => {
    const html = 
`    <div class="card border-0" data-task-id="${id}" task-status="${status}">
        <div class="d-grid gap-2 d-md-flex justify-content-between">
            <h6 class="card-title text-warning">Due: ${dueDate}</h6>

            <button class="btn btn-primary btn-sm dropdown-toggle done-button" type="button" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" data-bs-toggle="dropdown" aria-expanded="false">Move Task</button>

            <select class="dropdown-menu">
            <option value="To Do">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
            </select>

        </div>
        <h4 class="card-subtitle">${name}</h4>
        <h6 class="card-subtitle">Person: ${assignedTo}</h6>
        <p class="bg-danger">${description}<br><br><br></p>
    </div>`

    return html;
}

//Task Manager class
class TaskManager {

    
    tasks;
    currentId;

    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;

    }

    addTask (name, description, assignedTo, dueDate, status = 'To Do')
    {
        this.currentId++;

        const task = {
            id: this.currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        };
        
        this.tasks.push(task);
        //console lot to troubleshoot. To check what is pushed into the task array
        // console.log(`A new task is pushed into the array: ${task}`);
        
    }

    //Task 7, Step 4. Method to use the id to find the correct task. Will compare an id to ids of all tasks and find matching task, and return it. NOTE: At the moment, it only checks the items on the task list, which is pre-html rendered. That means if you change status with the button, it does not reflect that. Only the original status.
    getTaskById (taskID) {
        let foundTask = "";

        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];

            if (task.id == taskID) {
                let foundTask = task;
                return foundTask;
            }
        }
    }

    render () {
        //local variables representing each of the separate columns of tasks
        let tasksHtmlListToDo = [];
        let tasksHtmlListDoing = [];
        let tasksHtmlListReview = [];
        let tasksHtmlListDone = [];

        //for loop to change the date format, it goes through all in the task list array
        for (let i = 0; i < this.tasks.length; i++) {

            //variable to hold the current task object
            let taskVariable = this.tasks[i];

            //setting a variable "date" to equal a formatted date variable from the taskVariable object
            let date = new Date(taskVariable.dueDate);

            //changing the date variable to a string
            let formattedDate = date.toString();

            //changing the object's date into the formatted version of date
            taskVariable.dueDate = formattedDate;

            //creating the html string version of the task list object
            let taskHtml = createTaskHtml(taskVariable.name, taskVariable.description, taskVariable.assignedTo, taskVariable.dueDate, taskVariable.status, taskVariable.id);

            //console.log to print out to console to troubleshoot
            // console.log(`This is the status: ${taskVariable.status}`);
            // console.log(`This is taskHtml: ${taskHtml}`)

            //if to check if status of task matches "To Do", "Doing", "Review", or "Done", then it gets pushed into that respective taskHtmlList. Have to use taskVariable because it is an object with the status variable and not taskHtml because the latter is just a string with html, it doesn't have a single variable called status
            if (taskVariable.status == "To Do") {
                tasksHtmlListToDo.push(taskHtml);
            }else if (taskVariable.status == "Doing") {
                tasksHtmlListDoing.push(taskHtml);
            } else if (taskVariable.status == "Review") {
                tasksHtmlListReview.push(taskHtml);
            } else if (taskVariable.status == "Done") {
                tasksHtmlListDone.push(taskHtml);
                // hideButtonInDoneColumn();
            } else {
                console.log("Error in the status of the tasklist item")
            }
        }

        //setting the arrays with each ID from the task column in index.html
        let columnID = ["ToDoColumn", "DoingColumn", "ReviewColumn", "DoneColumn"];

        //create array that have the 4 column objects as items
        let columnVariable = [tasksHtmlListToDo, tasksHtmlListDoing, tasksHtmlListReview, tasksHtmlListDone];

        //a for loop that loops through all our column IDs and put int their respective task in that column.
        for (let i = 0; i < columnID.length; i++) {

            //joining \n in between each task item
            let tasksHtml = columnVariable[i].join("\n\n");
            
            //console log to check if tasksHtml works
            // console.log(`This will be added into the html of the columns: ${tasksHtml}`);
            
            //create a variable pointing to the task's relative column that they will be put into
            let pointer = document.getElementById(columnID[i]);

            //creating element with the objects being added
            let newCardHTML = document.createElement("div");

            //setting our string tasksHtml into the newCardHTML. Have to do this because appending our string straight onto the columns result in errors
            newCardHTML.innerHTML = tasksHtml;

            //now we append our HTML into their respective task columns
            pointer.appendChild(newCardHTML);
        }
        //this calls the color function to make sure the cards are of the right color via boostrap
        this.statusColor();


    }

    statusColor () {

        //setting the arrays with each ID from the task column in index.html
        let columnID = ["ToDoColumn", "DoingColumn", "ReviewColumn", "DoneColumn"];
        //array with the boostrap background color in order of status
        let colorArray = ["bg-success", "bg-warning", "bg-danger", "bg-secondary"]

        //a for loop to change the cards under
        for (let i = 0; i < columnID.length; i++) {
            
            //a pointer for all the p elements in the status card column
            let taskDesc = document.getElementById(columnID[i]).querySelectorAll('p');

            //another for loop to cycle through each of the cards for their p element and changing the class so that it is the right color via boostrap;
            for (let j = 0; j < taskDesc.length; j++){
                taskDesc[j].className = colorArray[i];
            }
        }
    }

    hideButtonInDoneColumn () {
        //This only happens for tasks going into the done column, this is to hide the task change button
        let buttons = document.querySelector('.DoneColumn').querySelectorAll('.done-button');
        
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute("hidden", true);
        }
        
        // setAttribute("hidden", true);
        // //hide drop down list
        // doneHTML.querySelectorAll('.dropdown-menu').setAttribute("hidden", true);
        // console.log(doneHTML);
    }
}