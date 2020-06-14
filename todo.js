const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishList = document.querySelector(".js-finishList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDosArr = [];
let finishArr = [];

function backFinished(event){
  event.preventDefault();
  const li = event.target.parentNode;
  deleteFinished(event);
  const text = li.querySelector("span").textContent;
  paintTodo(text);
}
function deleteFinished(event) {
    event.preventDefault();
  const li = event.target.parentNode;
  const cleanFinish = finishArr.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });

  finishList.removeChild(li);
  finishArr = cleanFinish;
  saveFinish();
}
function addFinish(e) {
    e.preventDefault();
  const li = e.target.parentNode;
  const cleanToDos = toDosArr.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDoList.removeChild(li);
  toDosArr = cleanToDos;
  const newId = finishArr.length + 1;
  const text = li.querySelector("span").textContent;
  paintFinished(text);
}
function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinished);
  const backBtn = document.createElement("button");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", backFinished);
  const span = document.createElement("span");
  const newId = finishArr.length + 1;

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  finishList.appendChild(li);

  const finishObj = {
    id: newId,
    text: text
  };
  finishArr.push(finishObj);

  saveFinish();
  saveToDos();
}
function saveFinish(){
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishArr));
}
function deleteToDos(event) {
    event.preventDefault();
  const li = event.target.parentNode;
  const cleanToDos = toDosArr.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });

  toDoList.removeChild(li);
  toDosArr = cleanToDos;

  saveToDos();
}

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(toDosArr));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDos);

  const finishBtn = document.createElement("button");
  finishBtn.innerText = "✅";
  finishBtn.addEventListener("click", addFinish);
  const span = document.createElement("span");
  const newId = toDosArr.length + 1;

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finishBtn);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    id: newId,
    text: text
  };
  toDosArr.push(toDoObj);

  saveToDos();
}
function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value = "";
}
function loadToDo() {
  const toDos = localStorage.getItem(PENDING_LS);
  if (toDos !== null) {
    const lsParse = JSON.parse(toDos);
    lsParse.forEach(el => {
      paintTodo(el.text);
    });
  }
  const finished = localStorage.getItem(FINISHED_LS);
  if (finished !== null) {
    const lsParse = JSON.parse(finished);
    lsParse.forEach(el => {
      paintFinished(el.text);
    });
  }
}
function initTodo() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

initTodo();