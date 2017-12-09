{
  const todoText = document.querySelector('#todo-text');
  const addTodo = document.querySelector('#add-todo');
  const todoList = document.querySelector('#todo-list');
  let allLi;
  let allTrashIcons;
  // массив для хранения наших todo
  let arrayTodo = [];

  // todo из localStorage
  const todoFromLocalStorage = JSON.parse(localStorage.getItem('todo'));

  function getAllLi() {
    allLi = document.querySelectorAll('.todo');
  }

  // мы ищем все иконки с классом fa-trash
  function getTrashIcons() {
    allTrashIcons = document.querySelectorAll('.fa-trash');
  }

  // мы проверяем есть ли значение в localStorage
  if (todoFromLocalStorage) {
    // добавляем значение из localStorage в локальный массив
    todoFromLocalStorage.map((value) => {
      arrayTodo.push(value);
    });
    addAllTodo(); // мы проходимся по всему массиву наших todo
    getAllLi();
    getTrashIcons();
  }
  
  // пишем в массив arrayTodo
  function saveTodo() {
    const lengthOfTodoList = arrayTodo.length + 1;
    const text = todoText.value;
    const timestamp = moment().format('DD.MM.YYYY HH:mm');
    if (text) {
      arrayTodo.unshift({ id: lengthOfTodoList, text, done: false, timestamp });
    } else {
      alert('Вы должны ввести значение!');
    }
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
  function createLi(todo) {
    const li = document.createElement('li');
    const { done, id, text, timestamp } = todo;
    const check = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
    const uncheck = '<i class="fa fa-square-o" aria-hidden="true"></i>';
    li.innerHTML = `
      <div class="todo-info">
        <strong data-idtodo="${id}" class="todo ${done ? 'check' : 'uncheck'}">
          ${text} ${done ? check : uncheck}
        </strong>
        <i data-id="${id}" class="fa fa-trash" aria-hidden="true"></i>
      </div>
      <div>
        Дата создания: ${timestamp}
      </div>
    `;
    todoList.appendChild(li);
  }
  
  // мы проходимся по всему массиву наших todo
  function addAllTodo() {
    arrayTodo.map(function(todo) {
      createLi(todo);
    });
  }
  // сохраняем массив arrayTodo в localStorage
  function saveToLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(arrayTodo));
  }

  function addEventToTrashIcon(list) {
    list.forEach((icon) => {
      icon.addEventListener('click', function() {
        const id = icon.dataset.id;
        const newArrayTodo = [];
        const findTodo = arrayTodo.find(todo => todo.id === parseInt(id));
        arrayTodo.map(el => {
          if (el.id !== findTodo.id) {
            newArrayTodo.push(el);
          }
        });
        arrayTodo = newArrayTodo;
        clearUl(); // чистим ul
        addAllTodo(); // мы проходимся по всему массиву наших todo
        getAllLi(); // обновли все элементы li в переменную
        getTrashIcons(); // обновили все иконки в переменную
        addEventToLi(allLi); // добавили события к li
        addEventToTrashIcon(allTrashIcons); // добавили события к иконки удаления
        saveToLocalStorage();
      });
    });
  }

  function addEventToLi(list) {
    list.forEach((el) => {
      el.addEventListener('click', function() {
        const id = el.dataset.idtodo;
        const newArrayTodo = [];
        const findTodo = arrayTodo.find(todo => todo.id === parseInt(id));
        findTodo.done = !findTodo.done;
        arrayTodo.map(el => {
          if (el.id === findTodo.id) {
            newArrayTodo.push(findTodo);
          } else {
            newArrayTodo.push(el);
          }
        });
        arrayTodo = newArrayTodo;
        clearUl(); // чистим ul
        addAllTodo(); // мы проходимся по всему массиву наших todo
        getAllLi(); // обновли все элементы li в переменную
        getTrashIcons(); // обновили все иконки в переменную
        addEventToLi(allLi); // добавили события к li
        addEventToTrashIcon(allTrashIcons); // добавили события к иконки удаления
        saveToLocalStorage();
      });
    });
  }
  
  // событие по клику на кнопку add
  addTodo.addEventListener('click', function() {
    saveTodo(); // пишем в массив arrayTodo
    clearUl(); // чистим
    addAllTodo(); // мы проходимся по всему массиву наших todo
    getAllLi(); // обновили все элементы li в переменную
    getTrashIcons(); // обновили все иконки в переменную
    addEventToLi(allLi); // добавили события к li
    addEventToTrashIcon(allTrashIcons); // добавили события к иконки удаления
    saveToLocalStorage(); // сохраняем массив arrayTodo в localStorage
    clearInput(); // очищаем инпут todoText
  });

  if (allLi) {
    addEventToLi(allLi);
  }
  if (allTrashIcons) {
    addEventToTrashIcon(allTrashIcons);
  }
}