document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input')
    const addButton = document.getElementById('add-button')
    const taskList = document.getElementById('task-list')

    addButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();

        if (taskInput!= '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${taskText} 
            <button class= "delete-button">Excluir</button>`;
            taskList.appendChild(listItem);
            taskInput.value = '';

            const deleteButton = listItem.querySelector('.delete-button');

            deleteButton.addEventListener('click', ()=> {
                listItem.remove()
            })
        }
    })
    
})