const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
    const html = 
`    <div class="card border-0">
        <h5 class="card-title text-warning">${dueDate}:</h5>
        <h4 class="card-subtitle">Task ${name}:</h4>
        <h6 class="card-subtitle">${assignedTo}:</h6>
        <p class="bg-danger">Task ${description}<br><br><br></p>
    </div>`

    return html;
}

class TaskManager {

    
    tasks;
    currentId;

    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;

    }

    addTask (name, description, assignedTo, dueDate, status = 'TODO')
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
        
    }

    
}