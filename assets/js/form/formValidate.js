

const namePattern = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;

const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

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
