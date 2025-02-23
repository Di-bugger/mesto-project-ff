const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
        authorization: '1d7b250b-a7ef-48e2-a5e5-2b29c1b122cd',
        'Content-Type': 'application/json'
    }
}

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(getResponse)
}

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(getResponse)
}

export const deleteCardId = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(getResponse)
}

export const updateUserInfo = (name, description) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '1d7b250b-a7ef-48e2-a5e5-2b29c1b122cd',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
        .then(getResponse)
}

export const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: '1d7b250b-a7ef-48e2-a5e5-2b29c1b122cd',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(getResponse)
}