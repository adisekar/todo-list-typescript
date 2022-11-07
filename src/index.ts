import { v4 as uuidv4 } from '../node_modules/uuid/dist/esm-browser/index.js';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

const listElement = document.querySelector<HTMLUListElement>('#todo-list');
const formElement = document.querySelector<HTMLFormElement>('#todo-form');
const inputElement = document.querySelector<HTMLInputElement>('#todo-input');
let tasks: Task[] = loadTasks();

tasks.forEach((addListItem));

formElement?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputElement?.value == "" || inputElement?.value == null) return;

    const newTask: Task = {
        id: uuidv4(),
        title: inputElement.value,
        completed: false,
        createdAt: new Date()
    }

    tasks.push(newTask);
    saveTasks();

    addListItem(newTask);
    inputElement.value = '';
});

function addListItem(task: Task) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
    });

    label.append(checkbox, task.title);
    item.append(label);
    listElement?.append(item);
    console.log(task.id);
}

function loadTasks(): Task[] {
    const taskJson = localStorage.getItem("TASKS");
    if (taskJson) {
        return JSON.parse(taskJson);
    } else {
        return [];
    }
}


function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}

