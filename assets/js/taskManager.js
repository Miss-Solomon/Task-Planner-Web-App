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