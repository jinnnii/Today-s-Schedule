const todos = document.querySelector('.todos')
const input = document.querySelector('.footer_input');
const tag = document.querySelector('.tag_select span');
const addBtn = document.querySelector('.footer_button');

let id = 0;

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
    todos.appendChild(todo);

    todo.scrollIntoView({ block: 'center' });
    input.value = '';
    input.focus();
}

function createTodo(text, tagText) {
    const todoRow = document.createElement('li');
    todoRow.setAttribute('class', 'todo_row');
    todoRow.setAttribute('data-id', id);

    const todo = `
        <div class="todo animate__animated animate__fadeInUp">
            <input type="checkbox" name="check" id="todo_${id}">
            <label for="todo_${id}">
                <span class="todo_check"></span>
                <div class="todo_tag_name">
                    <span class="todo_tag">${tagText}</span>
                    <span class="todo_name">${text}</span>
                </div>
            </label>
            <button class="todo_delete hvr-pulse-shrink">
                <i class="far fa-trash-alt" data-id="${id}"></i>
            </button>
        </div>
    `;
    todoRow.innerHTML = todo;

    id++;
    return todoRow;
}

function onAddTag() {
    const tag_input = document.querySelector('.input_tag');
    const text = tag_input.value;
}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', event => {
    if (event.key == 'Enter') {
        onAdd();
    }
})

todos.addEventListener('click', (event) => {
    if (event.target.tagName === 'I') {
        const id = event.target.dataset.id;
        if (id) {
            const toBeDelete = document.querySelector(`.todo_row[data-id="${id}"]`);
            toBeDelete.classList.add('animate__animated', 'animate__fadeOut');
            toBeDelete.addEventListener('animationend', () => {
                todos.removeChild(toBeDelete);
            });
        }
    }
});