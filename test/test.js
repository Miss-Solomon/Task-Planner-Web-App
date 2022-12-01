const assert = require('assert');
const TaskManager = require('../assets/js/taskManager.js');

const tm = new TaskManager();

describe('TaskManager', () => {

    //not sure about what they mean when they want a test case of the TaskManager to this is a guess
    describe('the constructor', () => {
        it('testing call of the constructor', () => {
        //setup
        const expectedTaskList = [];
        const expectedId = 0;
        let actual = '';
        //exercise
        actual = tm;
        // Verify
        assert.deepEqual(actual.tasks, expectedTaskList);
        assert.strictEqual(actual.currentId, expectedId);
        });
    });

    describe('.addTask', () => {
        it('adds a task to the task list', () => {
        //setup
        const expected = {name: "Sing", description: "Practice singing for the prince", assignedTo: "Ariel", dueDate: "2022-12-25", id: 1, status: "To Do"};
        let actual = '';
        //exercise
        tm.addTask("Sing", "Practice singing for the prince", "Ariel", "2022-12-25", 'To Do');
        actual = tm.tasks[tm.tasks.length - 1];
        // Verify
        assert.deepEqual(actual, expected);
        });
    });

    describe('.getTaskById', () => {
        it('returns a task with that same id', () => {
        //setup
        const taskId = 1;
        const expected = {name: "Sing", description: "Practice singing for the prince", assignedTo: "Ariel", dueDate: "2022-12-25", id: 1, status: "To Do"};
        //exercise
        const actual = tm.getTaskById(taskId);
        //verify
        assert.deepEqual(actual, expected);
        })
    })

    describe('.deleteTask', () => {
        it('deletes a task from the task list', () => {
        //setup
        const taskId = 1;
        const expected = undefined;
        //exercise
        tm.deleteTask(taskId);
        const actual = tm.getTaskById(taskId);
        // Verify
        assert.strictEqual(actual, expected);
        });
    });

});
