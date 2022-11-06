"use strict";
const { v4: uuidv4 } = require('uuid');
const listElement = document.querySelector('#todo-list');
const formElement = document.querySelector('#todo-form');
const inputElement = document.querySelector('#todo-input');
let tasks = loadTasks();
tasks.forEach((addListItem));
formElement === null || formElement === void 0 ? void 0 : formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    if ((inputElement === null || inputElement === void 0 ? void 0 : inputElement.value) == "" || (inputElement === null || inputElement === void 0 ? void 0 : inputElement.value) == null)
        return;
    const newTask = {
        id: uuidv4(),
        title: inputElement.value,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    saveTasks();
    addListItem(newTask);
    inputElement.value = '';
});
function addListItem(task) {
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
    listElement === null || listElement === void 0 ? void 0 : listElement.append(item);
    console.log(task.id);
}
function loadTasks() {
    const taskJson = localStorage.getItem("TASKS");
    if (taskJson) {
        return JSON.parse(taskJson);
    }
    else {
        return [];
    }
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
