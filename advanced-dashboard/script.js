// Dark/Light Mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Clock
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// To-Do List
const addBtn = document.getElementById('add-todo');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    if(input.value.trim() === '') return;
    const li = document.createElement('li');
    li.textContent = input.value;
    li.addEventListener('click', () => li.remove());
    list.appendChild(li);
    input.value = '';
    saveTodos();
});

function saveTodos() {
    const todos = [];
    list.querySelectorAll('li').forEach(li => todos.push(li.textContent));
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo;
        li.addEventListener('click', () => li.remove());
        list.appendChild(li);
    });
}

loadTodos();

// Weather
async function fetchWeather() {
    const apiKey = 'YOUR_API_KEY'; // Use OpenWeatherMap API key
    const city = 'New York';
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    document.getElementById('weather').textContent =
        `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
}

fetchWeather();
