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

export const setLikeCard = (cardId, isLiked) => {
    const method = isLiked ? 'DELETE' : 'PUT'
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers
    })
        .then(getResponse)
}

export const updateUserInfo = (name, description) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers ,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
        .then(getResponse)
}

export const updateAvatar = avatar => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,
        }),
    })
        .then(getResponse)
}

export const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(getResponse)
}