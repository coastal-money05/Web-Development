let todos = [];
let currentFilter = 'all';

const inputEl = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');
const listEl = document.getElementById('todo-list');
const countEl = document.getElementById('todo-count');
const filterBtns = document.querySelectorAll('.filter-btn');

function addTodo() {
  const text = inputEl.value.trim();
  if (text) {
    todos.push({ id: Date.now(), text, completed: false });
    inputEl.value = '';
    render();
  }
}

addBtn.addEventListener('click', addTodo);
inputEl.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

listEl.addEventListener('click', (e) => {
  const id = Number(e.target.closest('li').dataset.id);
  if (e.target.classList.contains('delete-btn')) {
    todos = todos.filter(t => t.id !== id);
    render();
  } else if (e.target.type === 'checkbox') {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    render();
  }
});


filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

document.getElementById('clear-completed').addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  render();
});

document.getElementById('clear-all').addEventListener('click', () => {
  todos = [];
  render();
});

function render() {
  listEl.innerHTML = '';
  
  let filteredTodos = todos;
  if (currentFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
  if (currentFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span>${todo.text}</span>
      <button class="delete-btn">🗑️</button>
    `;
    listEl.appendChild(li);
  });

  const activeCount = todos.filter(t => !t.completed).length;
  countEl.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}