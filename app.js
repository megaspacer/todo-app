{
  const todoText = document.querySelector('#todo-text');
  const addTodo = document.querySelector('#add-todo');
  const todoList = document.querySelector('#todo-list');
  // массив для хранения наших todo
  const arrayTodo = [];
  
  // пишем в массив arrayTodo
  function saveTodo() {
    const todo = todoText.value;
    arrayTodo.unshift(todo);
  }
  
  // очищаем инпут todoText
  function clearInput() {
    todoText.value = '';
  }
  
  // очищаем наш ul
  function clearUl() {
    todoList.innerText = '';
  }
  
  // мы создаем элемент li
  function createLi(text) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${text}</strong>`;
    todoList.appendChild(li);
  }
  
  // мы проходимся по всему массиву наших todo
  function addAllTodo() {
    arrayTodo.map(function(todo) {
      createLi(todo);
    });
  }
  
  // событие по клику на кнопку add
  addTodo.addEventListener('click', function() {
    saveTodo(); // пишем в массив arrayTodo
    clearUl(); // чистим
    addAllTodo(); // мы проходимся по всему массиву наших todo
    clearInput(); // очищаем инпут todoText
  });  
}