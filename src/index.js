import './pages/index.css';
import {initialCards, createCard} from "./scripts/cards";
import {closeModal, openModal, closeModalOverlay, closeModalEsc} from "./scripts/modal";
import {handleLikeCard} from "./scripts/cards";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// Кнопки открытия
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Попапы
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imgPopup = document.querySelector(".popup_type_image");

// Данные информации аккаунта
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");

//Данные попапов
const titleChangeProfile = document.querySelector(".popup__input_type_name");
const descriptionChangeProfile = document.querySelector(".popup__input_type_description");
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const imgUrlCardInput = document.querySelector(".popup__input_type_url");


function handleProfileSubmit(event) {
    event.preventDefault();

    titleProfile.textContent = titleChangeProfile.value;
    descriptionProfile.textContent = descriptionChangeProfile.value;

    closeModal(editPopup);
}

function handleNewCardSubmit(event) {
    event.preventDefault();

    cardList.prepend(createCard(nameCardInput.value, imgUrlCardInput.value, handleLikeCard, handleImgCardPopup));
    closeModal(addPopup);
}

function handleImgCardPopup(name, urlImage) {
    const imgCardPopup = document.querySelector(".popup__image");
    const infoCardPopup = document.querySelector(".popup__caption");
    imgPopup.addEventListener("click", (event)=> {
        closeModalOverlay(event, imgPopup);
    });

    imgCardPopup.src = urlImage;
    infoCardPopup.textContent = name;
    imgCardPopup.alt = name;

    openModal(imgPopup);
}

document.querySelectorAll('.popup__close').forEach(elem => {
    elem.addEventListener('click', event => {
        closeModal(elem.closest('.popup'))
    })
})

editButton.addEventListener('click', (elem) => {
    titleChangeProfile.value = titleProfile.textContent;
    descriptionChangeProfile.value = descriptionProfile.textContent;
    editPopup.addEventListener('click', (elem) => {
        closeModalOverlay(elem, editPopup);
    })
    editPopup.addEventListener('submit', (elem) => {
        handleProfileSubmit(elem)
    })
    openModal(editPopup);
})

addButton.addEventListener('click', (elem) => {
    nameCardInput.value = '';
    imgUrlCardInput.value = '';
    addPopup.addEventListener('click', (elem) => {
        closeModalOverlay(elem, addPopup);
    })
    addPopup.addEventListener('submit', handleNewCardSubmit)
    openModal(addPopup);
})

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardElement = createCard(item.name, item.link, handleLikeCard, handleImgCardPopup);
    cardList.append(cardElement);
})

