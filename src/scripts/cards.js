import {closeModal, openModal} from "./modal";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.parentElement.remove();
}

function handleLikeCard(card) {
    card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active')
}

// @todo: Функция создания карточки
export function createCard(name, urlImage, likeAction, imgPopup) {

    const card = templateCard.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    cardImage.src = urlImage;
    cardImage.alt = name;
    card.querySelector(".card__title").textContent = name;

    card.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    card.querySelector(".card__like-button").addEventListener("click", () => {
        likeAction(card);
    });
    cardImage.addEventListener("click", () => {
        imgPopup(name, urlImage)
    })

    return card;
}

export {handleLikeCard};