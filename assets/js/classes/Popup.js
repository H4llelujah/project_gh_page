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
