const todos = document.querySelector('.todos')
const input = document.querySelector('.footer_input');
const tag = document.querySelector('.tag_select span');
const addBtn = document.querySelector('.footer_button');

let count = 0;

function onAdd() {
    const text = input.value;
    const tagText = tag.innerHTML;
    const msg = document.querySelector('.input_massage');

    if (!text || tagText === "None") {
        msg.innerHTML = `
            <p class="animate__animated animate__headShake">
                다시 한번 확인 부탁드립니다.
            </p>
        `;
        input.focus();
        return;
    } else {
        msg.innerHTML = `<p></p>`;
    }
    const todo = createTodo(text, tagText);
    const todoDelete = todo.querySelector('.todo_delete');
    todoDelete.addEventListener('click', () => {
        todo.classList.add('animate__animated', 'animate__fadeOut');
        todo.addEventListener('animationend', () => {
            todos.removeChild(todo);
        });
    });
    todos.appendChild(todo);

    todo.scrollIntoView({ block: 'center' });
    input.value = '';
    input.focus();
}

function createTodo(text, tagText) {
    const todoRow = document.createElement('li');
    todoRow.setAttribute('class', 'item_row');

    const todo = `
        <div class="todo animate__animated animate__fadeInUp">
            <input type="checkbox" name="check" id="todo_${count}">
            <label for="todo_${count}">
                <span class="todo_check"></span>
                <div class="todo_tag_name">
                    <span class="todo_tag">${tagText}</span>
                    <span class="todo_name">${text}</span>
                </div>
            </label>
            <button class="todo_delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
    `;
    todoRow.innerHTML = todo;

    count++;
    return todoRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', event => {
    if (event.key == 'Enter') {
        onAdd();
    }
})

