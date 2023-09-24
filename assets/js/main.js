const url = 'https://jsonplaceholder.typicode.com/users';

const namePattern = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;

const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const button = document.querySelector('.feedback__button');

const modal = document.querySelector('.modal');

const modalContent = document.querySelector('.modal__content');

const form = document.querySelector('.form');

const inputsAndTextarea = document.querySelectorAll('input, textarea');

function postRequest(url, data) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(url, options)
        .then((response) => response.json())
        .catch((error) => {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        });
}

class Popup {
    constructor(observer, title, text = '') {
        this.observer = observer;
        this.title = title;
        this.text = text;
        this.popup = document.querySelector('.popup');
        if (observer) {
            this.observer = observer;
        }
        this.popup.addEventListener('click', this.hide.bind(this));
    }

    observe() {
        this.observer.addEventListener('click', this.show.bind(this));
    }

    show() {
        this.popup.classList.add('popup__active');
        this.popup.innerHTML = `
            <div class="popup__content">
                <h3 class="popup__title">${this.title}</h3>
                <div class="popup_text">${this.text}</div>
            </div>`;
        document.querySelector('.popup__content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    hide() {
        this.popup.classList.remove('popup__active');
    }
}

function formValidate(fieldObject) {
    let isValid = true;
    const values = fieldObject;
    const errorMessages = [];

    if (!namePattern.test(values.username)) {
            errorMessages.push('Имя должно содержать только буквы!');
            isValid = false;
    }
    if (!emailPattern.test(values.email)) {
                errorMessages.push('Почта должна быть вида mymail@domain.com');
                isValid = false;
    }
    if (!isValid) {
        const errorMessage = new Popup(null, errorMessages.join('<br>'));
        errorMessage.show();
    } else {
        const SucceedMessage = new Popup(null, 'Your message successfully sent!');
        SucceedMessage.show();
    }
    return isValid;
}

function handleSubmit(event, formFields) {
    event.preventDefault();

    const values = {};
    for (let i = 0; i < formFields.length; i++) {
        const element = formFields[i];
        values[element.id] = element.value;
    }

    if (formValidate(values)) {
        postRequest(url, values);
    } else {
        return;
    }

    /* eslint-disable no-param-reassign */
    formFields.forEach((item) => {
        item.value = '';
    });
}

function toogleModal() {
    modal.classList.toggle('modal-active');
}


button.addEventListener('click', toogleModal);



modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
});

modal.addEventListener('click', toogleModal);

form.addEventListener('submit', (event) => {
    handleSubmit(event, inputsAndTextarea);
});

