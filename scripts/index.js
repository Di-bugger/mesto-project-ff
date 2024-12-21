// @todo: Темплейт карточки
let templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы
let cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, urlImage) {

    let card = templateCard.querySelector(".card").cloneNode(true);

    card.querySelector(".card__image").src = urlImage;
    card.querySelector(".card__image").alt = name;
    card.querySelector(".card__title").textContent = name;

    card.querySelector(".card__delete-button").addEventListener("click", deleteCard);

    cardList.append(card);
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
function loadCards(infoCards) {
    for (let item of infoCards) {
        createCard(item.name, item.link);
    }
}

loadCards(initialCards);
