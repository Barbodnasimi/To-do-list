const listContainer = document.querySelector('#list-container');
const input = document.querySelector('input');
const searchBtn = document.querySelector('button');
// Load tasks from local storage on page load
loadTasksFromLocalStorage();

function AddTask(taskText){
    let listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class='removeBtn'>X</button>
    `;
    listItem.classList.add('unchecked');
    listContainer.appendChild(listItem);

    const removeBtn = listItem.querySelector('.removeBtn');

    listItem.addEventListener('click', () => {
        listItem.classList.toggle('checked');
        listItem.classList.toggle('unchecked');
        saveTasksToLocalStorage()
    });

    removeBtn.addEventListener('click', () => {
        listItem.remove();
        saveTasksToLocalStorage()
    });
}

searchBtn.addEventListener('click', () => {
    let taskText = input.value.trim();
    input.value = '';
    if (taskText !== '') {
    AddTask(taskText)
    saveTasksToLocalStorage()
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'  ) {
        let taskText = input.value.trim();
        input.value = '';
        if(taskText !== ''){
        AddTask(taskText)
        saveTasksToLocalStorage()}
    }
});
function saveTasksToLocalStorage(){
    const tasks = Array.from(listContainer.children).map(task => {
        return{
            text: task.querySelector('span').innerText,
            checked: task.classList.contains('checked'),
        }
    })
    localStorage.setItem('ToDolists' , JSON.stringify(tasks))
}
function loadTasksFromLocalStorage(){
  const savedTasks = localStorage.getItem('ToDolists')
  if (savedTasks) {
     const tasks = JSON.parse(savedTasks)
     tasks.forEach(task => {
        AddTask(task.text)
        const lastListItem = listContainer.lastChild;
        if (task.checked) {
             lastListItem.classList.add('checked')
        }
    });
  }
}


