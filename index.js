const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList1"),
  toDoListt = document.querySelector(".js-toDoList2");

const TODOS_LS = "toDos";
const FIN_LS = "finished";

let toDos = [];

let toFin = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const pa = li.parentNode;

  if (pa.id === "apple") {
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  } else {
    toDoListt.removeChild(li);
    const cleanTODos = toFin.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toFin = cleanTODos;
    saveToDos();
  }
}

function finishToDo(event) {
  const std = event.target;
  const lii = std.parentNode;
  const last = lii.parentNode;
  if (last.id === "apple") {
    std.innerText = "←";
    toDoListt.appendChild(lii);

    const addToDos = toDos.filter(function (toDo) {
      return toDo.id === parseInt(lii.id);
    });
    toFin = toFin.concat(addToDos);
    const removeDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(lii.id);
    });
    toDos = removeDos;
    saveToDos();
  } else {
    std.innerText = "✔";
    toDoList.appendChild(lii);
    const addTODos = toFin.filter(function (toDo) {
      return toDo.id === parseInt(lii.id);
    });
    toDos = toDos.concat(addTODos);
    const reMoveDos = toFin.filter(function (toDo) {
      return toDo.id !== parseInt(lii.id);
    });
    toFin = reMoveDos;
    saveToDos();
  }
}
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(FIN_LS, JSON.stringify(toFin));
}
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  const finBtn = document.createElement("button");
  finBtn.innerText = "✔";
  finBtn.addEventListener("click", finishToDo);
  delBtn.innerText = "❌ ";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function taintToDo(text) {
  const lis = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toFin.length + 1;
  const finBtn = document.createElement("button");
  finBtn.innerText = " ← ";
  finBtn.addEventListener("click", finishToDo);
  delBtn.innerText = "❌ ";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  lis.appendChild(delBtn);
  lis.appendChild(finBtn);
  lis.appendChild(span);
  lis.id = newId;
  toDoListt.appendChild(lis);
  const toDoOBj = {
    text: text,
    id: newId
  };
  toFin.push(toDoOBj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const finishedToDos = localStorage.getItem(FIN_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }

  if (finishedToDos !== null) {
    const parsedTODos = JSON.parse(finishedToDos);
    parsedTODos.forEach(function (toDo) {
      taintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();