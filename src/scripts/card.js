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
function createCard(name, urlImage, likes, likeAction, openImgPopup, deleteCard) {

    const card = templateCard.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const cardLikes = card.querySelector(".card__like");
    cardImage.src = urlImage;
    cardImage.alt = name;
    cardLikes.textContent = likes.length;
    card.querySelector(".card__title").textContent = name;

    card.querySelector(".card__delete-button").addEventListener("click", deleteCard);
    card.querySelector(".card__like-button").addEventListener("click", () => {
        likeAction(card);
    });
    cardImage.addEventListener("click", () => {
        openImgPopup(name, urlImage)
    })

    return card;
}

export {handleLikeCard, deleteCard, createCard};