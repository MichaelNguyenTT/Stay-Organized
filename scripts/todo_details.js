'use strict'

window.onload = () => {
    displayURLParamsToForm();
    putRequestOnSubmit();
}

async function displayURLParamsToForm() {

    const URLParams = new URLSearchParams(location.search);
    let id = -1;
    if (URLParams.has('id') === true ) {
        id = URLParams.get('id')
        
        const response = await fetch(`http://localhost:8083/api/todos/${id}`)
        const taskData = await response.json();
        console.log(response.status);

        // console.log(taskData);
        const taskcategory = document.getElementById('task-category');
        taskcategory.value = taskData.category

        const description = document.getElementById('description');
        description.value = taskData.description

        const date = new Date(taskData.deadline);
        const formatDate = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const newDate = date.toLocaleDateString('en-US', formatDate)

        const deadline = document.getElementById('deadline');
        deadline.value = newDate;

        const priority = document.getElementById('priority');
        priority.value = taskData.priority

        if (taskData.completed === true) {
            document.getElementById('btnComplete').disabled = true;
        }

        putRequestOnSubmit(taskData)

    } else {
        console.log('Does not have ID');
    }
}


function putRequestOnSubmit(_task) {
    let inputData = {
        category: document.getElementById('task-category').value,
        description: document.getElementById('description').value,
        deadline: document.getElementById('deadline').value,
        priority: document.getElementById('priority').value,
        complete: true
    }

    const completeForm = document.getElementById('task-form');
    completeForm.onsubmit = async (event) => {
        event.preventDefault();

        const URLParams = new URLSearchParams(location.search);
        let id = -1;
        if (URLParams.has('id')) {
            id = URLParams.get('id');

            try {
                const response = await fetch(`http://localhost:8083/api/todos/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(inputData),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                console.log(response.status);
                console.log("PUT Request was successful");
            } catch (error) {
                console.log("PUT Request failed", error);
            }
        }
    }
}