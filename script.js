// ---------------------- Section Navigation ----------------------
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ---------------------- To-Do List Logic ----------------------
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
    saveTask(task);
    taskInput.value = '';
  }
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
  });
}

// ---------------------- Product Listing Logic ----------------------
const products = [
  { name: "Laptop", category: "electronics", price: 60000, rating: 4.5 },
  { name: "Mobile", category: "electronics", price: 20000, rating: 4.3 },
  { name: "Book A", category: "books", price: 400, rating: 4.8 },
  { name: "Book B", category: "books", price: 300, rating: 4.0 },
];

const container = document.getElementById('productContainer');

function displayProducts(list) {
  container.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: ₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
    `;
    container.appendChild(div);
  });
}

function filterProducts() {
  const filter = document.getElementById('filter').value;
  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);
  displayProducts(filtered);
}

function sortProducts() {
  const sort = document.getElementById('sort').value;
  let sorted = [...products];
  if (sort === 'price') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sort === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
  }
  displayProducts(sorted);
}

// ---------------------- Initialize ----------------------
window.onload = () => {
  showSection('portfolio');  // Show default section
  loadTasks();               // Load tasks if any
  displayProducts(products); // Show all products
};