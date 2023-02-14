/* HTML 태그 가져오기 */
const ul = document.querySelector('.ul');
const form = document.querySelector('.form');
const input = document.querySelector('.input');

/* 첫 접속 시 To-Do 리스트 렌더링 */
renderTodoList();


form.addEventListener('submit', async event => {
  event.preventDefault();
  addTodo();
  renderTodoList();
  input.value = '';
});


/**
 * DB와 통신하여 To-Do 리스트를 받아온 후 JSON으로 변환.
 * 각 To-Do를 목록으로 화면에 렌더링
 */
async function renderTodoList() {
  const res = await fetch('/todolist');
  const todoList = await res.json();

  ul.innerHTML = '';
  todoList.forEach(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    deleteBtn.innerText = '❌';
    span.innerText = todo.content;

    li.id = todo.id;
    const liId = li.id;

    li.append(span, deleteBtn);
    ul.append(li);

    deleteBtn.addEventListener('click', () => deleteTodo(liId));
  });
}

async function addTodo() {
  await fetch('/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(
      {content: input.value}
    )
  });
}

async function deleteTodo(liId) {
  await fetch('/todo', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({id: liId})
  });
  renderTodoList();
}





const btn = document.querySelector('.btn');
btn.addEventListener('click', async () => {
  await fetch('/del', {
    method: 'DELETE'
  })
  renderTodoList()
})