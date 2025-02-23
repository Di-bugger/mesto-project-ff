import {deleteCardId} from "./api";

// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

// @todo: Функция удаления карточки
function deleteCard(card, cardId) {
    deleteCardId(cardId)
        .then(() => {
            card.remove();
        })
        .catch(error =>
            console.log(error)
        )
}

function handleLikeCard(card) {
    card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active')
}

// @todo: Функция создания карточки
function createCard(cardId, name, urlImage, likes, ownerCardId, userId, likeAction, openImgPopup, deleteCard) {

    const card = templateCard.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const cardLikes = card.querySelector(".card__like");
    cardImage.src = urlImage;
    cardImage.alt = name;
    cardLikes.textContent = likes.length;
    card.querySelector(".card__title").textContent = name;
    const deleteButton =  card.querySelector(".card__delete-button")

    console.log(deleteButton)
    if (ownerCardId !== userId) {
        console.log('delete btn')
        deleteButton.remove()
    } else {
        deleteButton.addEventListener("click", () => {
            deleteCard(card,cardId)
        });
    }

    card.querySelector(".card__like-button").addEventListener("click", () => {
        likeAction(card);
    });
    cardImage.addEventListener("click", () => {
        openImgPopup(name, urlImage)
    })

    return card;
}

export {handleLikeCard, deleteCard, createCard};