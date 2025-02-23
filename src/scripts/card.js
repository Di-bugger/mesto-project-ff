import {deleteCardId, setLikeCard} from "./api";

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

function handleLikeCard(likeBtn, cardId, likesCount) {
    const isLiked = likeBtn.classList.contains("card__like-button_is-active");

    setLikeCard(cardId, isLiked)
        .then(card => {
            likeBtn.classList.toggle("card__like-button_is-active")
            console.log(card.likes.length)
            likesCount.textContent = card.likes.length
        })
        .catch(error =>
            console.log(error)
        )
}

// @todo: Функция создания карточки
function createCard(cardId, name, urlImage, likes, ownerCardId, userId, likeAction, openImgPopup, deleteCard) {

    const card = templateCard.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const cardLikes = card.querySelector(".card__like");
    const deleteButton =  card.querySelector(".card__delete-button")
    const likeButton =  card.querySelector(".card__like-button")
    const likesCount = card.querySelector(".card__like");
    const cardHasLiked = likes.some(like =>
        like._id === userId
    )
    cardImage.src = urlImage;
    cardImage.alt = name;
    cardLikes.textContent = likes.length;
    card.querySelector(".card__title").textContent = name;

    if (ownerCardId !== userId) {
        deleteButton.remove()
    } else {
        deleteButton.addEventListener("click", () => {
            deleteCard(card,cardId)
        });
    }

    if (cardHasLiked) {
        likeButton.classList.add('card__like-button_is-active')
    }

    likeButton.addEventListener("click", () => {
        likeAction(likeButton, cardId, likesCount);
    });
    cardImage.addEventListener("click", () => {
        openImgPopup(name, urlImage)
    })

    return card;
}

export {handleLikeCard, deleteCard, createCard};