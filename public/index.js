/* HTML 태그 가져오기 */
const ul = document.querySelector('.ul');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const clearBtn = document.querySelector('.clear-btn');


/* 첫 접속 시 실행 */
renderTodoList();

/* form 제출 시 실행 */
form.addEventListener('submit', async event => {
  event.preventDefault();  // 새로고침 방지
  addTodo();
  renderTodoList();
  input.value = '';
});

/* Clear 버튼 클릭 시 실행 */
clearBtn.addEventListener('click', () => {
  clearTodoList();
  renderTodoList();
});


/* 함수 선언 */

/**
 * To-Do 목록 렌더링 함수.
 * DB에서 목록을 받아온 후 화면에 렌더링
 */
async function renderTodoList() {
  const res = await fetch('/todolist');  // DB에서 To-Do 목록 받아오기
  const todoList = await res.json();  // JSON 포맷으로 변환

  ul.innerHTML = '';
  todoList.forEach(todo => {  // To-Do를 HTML 요소에 담아 렌더링
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    deleteBtn.innerText = '❌';
    span.innerText = todo.content;

    li.id = todo.id;  // To-Do 삭제를 위해 ID 부여
    const liId = li.id;

    li.append(span, deleteBtn);
    ul.append(li);

    /* 삭제(X) 버튼 클릭 시 실행 */
    deleteBtn.addEventListener('click', () => {
      deleteTodo(liId);
      renderTodoList();
    });
  });
}

/**
 * To-Do 생성 함수.
 * 사용자 입력 값을 key-value 형태로 웹서버에 전달.
 * 웹서버의 라우팅 코드 중 req.body.content에서 확인 가능
 */
async function addTodo() {
  await fetch('/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(
      {content: input.value}  // content라는 이름으로 입력값 전달
    )
  });
}

/**
 * To-Do 삭제 함수.
 * To-Do에 부여된 ID를 key-value 형태로 웹서버에 전달
 */
async function deleteTodo(liId) {
  await fetch('/todo', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({id: liId})  // id라는 key로 ID 전달
  });
}

/**
 * To-Do 목록 초기화 함수
 */
async function clearTodoList() {
  await fetch('/todolist', {
    method: 'DELETE'
  });
}