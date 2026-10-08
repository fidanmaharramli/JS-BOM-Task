const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitPassword = document.getElementById('submit-password');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();
    });
}

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const submitPasswordValue = submitPassword.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
    }

    if (submitPasswordValue === '') {
        setErrorFor(submitPassword, 'Confirm password cannot be blank');
    } else if (passwordValue !== submitPasswordValue) {
        setErrorFor(submitPassword, 'Passwords do not match');
    } else {
        setSuccessFor(submitPassword);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.textContent = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const items = document.querySelectorAll('.item');
const columns = document.querySelectorAll('.column');
let draggedItem = null;

if (items.length > 0 && columns.length > 0) {
    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => item.style.display = 'none', 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        column.addEventListener('dragenter', (e) => {
            e.preventDefault();
            column.classList.add('hovered');
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('hovered');
        });

        column.addEventListener('drop', () => {
            column.append(draggedItem);
            column.classList.remove('hovered');
        });
    });
}
