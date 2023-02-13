/* HTML 태그 가져오기 */
const ul = document.querySelector('.ul');

/* To-Do 리스트 렌더링 */
renderTodoList();

/**
 * DB와 통신하여 To-Do 리스트를 받아온 후 JSON으로 변환.
 * 각 To-Do를 목록으로 화면에 렌더링
 */
async function renderTodoList() {
  const res = await fetch('/todolist');
  const todoList = await res.json();

  todoList.forEach(todo => {
    const li = document.createElement('li');
    li.innerText = todo.content;
    ul.append(li);
  });
}