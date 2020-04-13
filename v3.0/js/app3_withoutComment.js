// State
let todos = [];
let filter = "all";

//DOM
const $todos = document.querySelector(".todos");
const $inputTodo = document.querySelector(".input-todo");
const $completeAllCheck = document.querySelector(".complete-all");
const $clearCompleted = document.querySelector(".clear-completed > .btn");
const $activeTodos = document.querySelector(".active-todos");
const $completedTodos = document.querySelector(".completed-todos");
const $filterAll = document.querySelector("#all");
const $filterActive = document.querySelector("#active");
const $filterCompleted = document.querySelector("#completed");

//render 함수
const render = () => {
  let html = "";

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      //active는 완료되지 않은 것.
      return !todo.completed;
    } else if (filter === "completed") {
      //completed는 완료된 것.
      return todo.completed;
    } else {
      return true;
    }
  });

  filteredTodos.forEach((todo) => {
    html += `<li id="${todo.id}" class="todo-item">
    <input id="${todo.id}" class="checkbox" type="checkbox" ${
      todo.completed ? "checked" : ""
    }>
    <label for="${todo.id}">${todo.content}</label>
  <i class="remove-todo far fa-times-circle"></i>
  </li>`;
  });

  $todos.innerHTML = html;

  $completedTodos.innerHTML = todos.filter((todo) => todo.completed).length;
  $activeTodos.innerHTML = todos.filter((todo) => !todo.completed).length;
};

//ID
const generateId = () => {
  return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

//get Data
//onload될 때 한번만 실행된다.
const getTodos = () => {
  todos = [
    { id: 1, content: "HTML", completed: true },
    { id: 2, content: "CSS", completed: false },
    { id: 3, content: "Javascript", completed: true },
  ];
  render();
};

window.onload = getTodos;
//window가 로드될 때 getTodos의 값을 가져온다.

//input창에 내용입력할 때.
$inputTodo.onkeyup = (e) => {
  if (e.keyCode !== 13) return;
  todos = [
    { id: generateId(), content: $inputTodo.value, completed: false },
    ...todos,
  ];

  $inputTodo.value = "";

  render();
};

//삭제 버튼 및 체크박스
$todos.onclick = (e) => {
  if (e.target.matches(".todos>li>label")) {
    let id = e.target.parentNode.id;

    todos = todos.map((todo) =>
      todo.id === parseInt(id) ? { ...todo, completed: !todo.completed } : todo
    );
  }

  if (e.target.matches(".todos>li>i")) {
    // 인수로 전달된 선택자에 의해 특정 노드를 탐색 가능한지 확인한다.
    todos = todos.filter(
      (todo) => todo.id !== parseInt(e.target.parentNode.id)
    );
  }
  render();
};

//전체 선택 체크박스
$completeAllCheck.onclick = (e) => {
  todos = todos.map((todo) => {
    return { ...todo, completed: true };
  });
  render();
};

//clear completed
$clearCompleted.onclick = (e) => {
  todos = todos.filter((todo) => {
    return !todo.completed;
  });
  render();
};

//Tab
$filterAll.onclick = (e) => {
  filter = "all";

  $filterAll.classList.add("active");
  $filterActive.classList.remove("active");
  $filterCompleted.classList.remove("active");

  e.target.render();
};

$filterActive.onclick = (e) => {
  filter = "active";

  $filterAll.classList.remove("active");
  $filterActive.classList.add("active");
  $filterCompleted.classList.remove("active");

  render();
};

$filterCompleted.onclick = (e) => {
  filter = "completed";

  $filterAll.classList.remove("active");
  $filterActive.classList.remove("active");
  $filterCompleted.classList.add("active");

  render();
};
