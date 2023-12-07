"use strict";

window.onload = () => {
  getUserDropdown();
  getUserTasks();
  displayUserTasks();
};

async function getUserDropdown() {
  try {
    const users = await fetch("http://localhost:8083/api/users");
    const usersData = await users.json();
    if (users.ok) {
      const userDropdown = document.getElementById("userDropdown");

      usersData.forEach((user) => {
        const userOption = new Option(user.name, user.id);
        userDropdown.appendChild(userOption);
        // console.log(userDropdown);
      });
    }
  } catch (error) {
    console.log("Fetch Error", error);
  }
}

function getUserTasks() {
  const selectedUser = document.getElementById("userDropdown");
  selectedUser.onchange = async () => {
    document.getElementById('displayTasks').innerHTML = '';
    try {
      const selectedUser = document.getElementById("userDropdown").value;
      const response = await fetch(
        `http://localhost:8083/api/todos/byuser/${selectedUser}`
      );
      if (response.ok) {
        const retrievedData = await response.json();
        // console.log(retrievedData);
        displayUserTasks(retrievedData);
      }
    } catch (error) {
      console.log("Fetch Error", error);
    }
  };
}

function displayUserTasks(_tasks) {
  const displayDiv = document.getElementById("displayTasks");
  let data = _tasks;
  console.log(data);

  data.forEach((item) => {
    const date = new Date(item.deadline);
    const formatDate = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
    const newDate = date.toLocaleDateString('en-US', formatDate)
  

    const newCard = document.createElement("div");
    newCard.innerHTML = `
    <div class="postNote">
    <h2 class="post-title">${item.category}<hr /></h2>
    <h4 class="post-priority">Priority: <strong>${item.priority}</strong></h4>
    <p class="post-desc">&#8729;${item.description}</p>
    <p class="post-date">${newDate}</p>
    <p class="post-complete">Completed: ${item.completed ? "✔" : "✘"}</p>
    <p class="post-detail"><button><a href=http://localhost:5500/todo_details.html?id=${item.id}>See Details</button></p>
    </div>`

    displayDiv.appendChild(newCard);

  });
}
