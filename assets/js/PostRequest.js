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
