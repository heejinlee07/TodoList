//state
let todos = [];

//dom
const $todos = document.querySelector(".todos");
const $inputTodo = document.querySelector(".input-todo");
const $completeAll = document.querySelector(".complete-all");
const $clearCompleted = document.querySelector(".clear-completed>.btn");

//render
const render = () => {
  let html = "";

  todos.forEach((todo) => {
    html += `<li id="${todo.id}" class="todo-item">
<input id="${todo.id}" class="checkbox" type="checkbox" ${
      todo.completed ? "checked" : ""
    }>
<label for="${todo.id}">${todo.content}</label>
<i class="remove-todo far fa-times-circle"></i>
</li>`;
  });
  $todos.innerHTML = html;
};

//get data
const getTodos = () => {
  todos = [
    { id: 1, content: "I", completed: true },
    { id: 2, content: "LOVE", completed: false },
    { id: 3, content: "MINGU", completed: true },
  ];
  render();
};

const generateId = () => {
  return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

window.onload = getTodos;

//input창에 입력
$inputTodo.onkeyup = (e) => {
  if (e.keyCode !== 13) return;
  todos = [
    { id: generateId(), content: $inputTodo.value, completed: false },
    ...todos,
  ];

  $inputTodo.value = "";
  render();
};

//체크박스 및 삭제
$todos.onclick = (e) => {
  let id = e.target.parentNode.id;

  if (e.target.matches(".todos>li>label")) {
    todos = todos.map((todo) =>
      todo.id === parseInt(id) ? { ...todo, completed: !todo.completed } : todo
    );
  }
  if (e.target.matches(".todos>li>i")) {
    todos = todos.filter((todo) => todo.id !== parseInt(id));
  }
  render();
};

//모든 요소 체크
$completeAll.onclick = (e) => {
  todos = todos.map((todo) => {
    return { ...todo, completed: true };
  });
  render();
};
