"use strict";
window.onload = () => {
  loadUserDropdown();
  loadCategoryDropdown();
  loadPriorities();

  const submitForm = document.getElementById("POSTForm");
  submitForm.onsubmit = (event) => {
    event.preventDefault();
    updatePOSTonSubmit();
  };
};

//TODO user name dropdown load

async function loadUserDropdown() {
  const userDropdown = document.getElementById("userDropdown");
  try {
    const response = await fetch("http://localhost:8083/api/users");
    const userData = await response.json();

    userData.forEach((data) => {
      let userOptions = new Option(data.name, data.id);
      userDropdown.appendChild(userOptions);
    });
    console.log(userData);
  } catch (error) {
    console.log("Fetch Not Complete", error);
  }
}

async function loadCategoryDropdown() {
  const categoryDropdown = document.getElementById("categoryDropdown");

  try {
    const response = await fetch("http://localhost:8083/api/categories");
    const categoryData = await response.json();

    categoryData.forEach((task) => {
      let categoryOption = new Option(task.name, task.id);
      categoryDropdown.appendChild(categoryOption);
    });
  } catch (error) {
    console.log("Fetch Not Complete", error);
  }
}

function loadPriorities() {
  const priorityList = [
    { priority: "Low" },
    { priority: "Medium" },
    { priority: "High" },
  ];

  const priorityDropdown = document.getElementById("priorityDropdown");

  priorityList.forEach((item) => {
    let prio_Options = new Option(item.priority, item.priority);
    priorityDropdown.appendChild(prio_Options);
  });
}

async function updatePOSTonSubmit() {
  let bodyData = {
    userid: document.getElementById("userDropdown").value,
    category: document.getElementById("categoryDropdown").value,
    description: document.getElementById("todo_description").value,
    deadline: document.getElementById("date-input").value,
    priority: document.getElementById("priorityDropdown").value,
  };

  try {
    const response = await fetch("http://localhost:8083/api/todos", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const confirmed = document.getElementById("confirmMessage");
      confirmed.innerHTML = "POST Request was Successful";
    }
  } catch (error) {
    const POST_message = document.getElementById("confirmMessage");
    POST_message.innerHTML = "POST Request was Unsuccessful";
    console.log("Fetch incomplete", error);
  }
}
