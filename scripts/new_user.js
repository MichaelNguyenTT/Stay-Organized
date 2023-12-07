'use strict'

//TODO get values of the input fields
//TODO check if both password strings are the same
//TODO create POST request for the inputs into 
//TODO "http://localhost:8083/api/users"

window.onload = () => {
    const registerForm = document.getElementById('register-form');
    registerForm.onsubmit = (event) => {
        event.preventDefault();
        createUserOnEvent();
    }
    // createUserOnEvent();
}

async function createUserOnEvent() {

    const nameField = document.getElementById('nameInput').value;
    const usernameField = document.getElementById('usernameInput').value;
    const passwordField = document.getElementById('passwordInput').value;
    const second_password_field = document.getElementById('re-enterPasswordInput').value;

    let inputData = {
        name: nameField,
        username: usernameField,
        password: passwordField,
    }
    if (passwordField === second_password_field) {
        try {
            const response = await fetch("http://localhost:8083/api/users", {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            if (response.status === 403) {
                alert('Username is already in use')
            } else {
                alert('User is created')
            }

        } catch (error) {
            console.log('POST Request Failed.', error);
        }

    } else {
        alert('Password must match')
    }

}