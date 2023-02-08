const ul = document.querySelector('.ul');

test();
async function test() {
  const res = await fetch('/todoList');
  const list = await res.json();

  list.forEach(todo => {
    const li = document.createElement('li');
    li.innerText = todo.content;

    ul.append(li);
  });
}