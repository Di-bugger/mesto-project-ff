import './pages/index.css';
import {initialCards} from "./scripts/cards";

// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, urlImage) {

    const card = templateCard.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    cardImage.src = urlImage;
    cardImage.alt = name;
    card.querySelector(".card__title").textContent = name;

    card.querySelector(".card__delete-button").addEventListener("click", deleteCard);

    return card;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    cardList.append(cardElement);
})
