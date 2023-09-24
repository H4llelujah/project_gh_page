
const url = 'https://jsonplaceholder.typicode.com/users';

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
