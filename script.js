document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => displayTask(task));
}

function addTask() {
  const taskText = document.getElementById('task-input').value.trim();
  const dueDate = document.getElementById('due-date').value;
  const priority = document.getElementById('priority').value;

  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    date: dueDate,
    priority: priority,
    completed: false
  };

  saveTask(task);
  displayTask(task);
  document.getElementById('task-input').value = '';
  document.getElementById('due-date').value = '';
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTask(task) {
  const li = document.createElement('li');
  li.className = `task ${task.priority}`;
  if (task.completed) li.classList.add('completed');
  li.setAttribute('data-id', task.id);

  const span = document.createElement('span');
  span.textContent = `${task.text} ${task.date ? '📅 ' + task.date : ''}`;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const checkBtn = document.createElement('button');
  checkBtn.innerHTML = '✔';
  checkBtn.onclick = () => toggleComplete(task.id);

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '✏️';
  editBtn.onclick = () => editTask(task.id);

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '🗑️';
  delBtn.onclick = () => deleteTask(task.id);

  actions.append(checkBtn, editBtn, delBtn);
  li.append(span, actions);
  document.getElementById('task-list').appendChild(li);
}

function toggleComplete(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.map(task => {
    if (task.id === id) task.completed = !task.completed;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.getElementById('task-list').innerHTML = '';
  loadTasks();
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.getElementById('task-list').innerHTML = '';
  loadTasks();
}

function editTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task", task.text);
  if (newText) {
    task.text = newText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('task-list').innerHTML = '';
    loadTasks();
  }
}

function filterTasks(type) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  document.getElementById('task-list').innerHTML = '';
  tasks.forEach(task => {
    if (
      type === 'all' ||
      (type === 'completed' && task.completed) ||
      (type === 'pending' && !task.completed)
    ) {
      displayTask(task);
    }
  });
}

loadTasks();
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === slideIndex) {
      slide.classList.add("active");
    }
  });

  slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showSlides, 5000); // Change every 5 seconds
