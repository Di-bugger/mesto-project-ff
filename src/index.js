import './pages/index.css';
import {initialCards, createCard} from "./scripts/cards";
import {closeModal, openModal, closeModalOverlay, closeModalEsc} from "./scripts/modal";

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

function handleProfileSubmit(event) {
    event.preventDefault();

    titleProfile.textContent = titleChangeProfile.value;
    descriptionProfile.textContent = descriptionChangeProfile.value;

    closeModal(editPopup);
}

function handleNewCardSubmit(event) {
    event.preventDefault();

    const nameCard = document.querySelector(".popup__input_type_card-name");
    const imgUrlCard = document.querySelector(".popup__input_type_url");

    cardList.prepend(createCard(nameCard.value, imgUrlCard.value));

    nameCard.value = '';
    imgUrlCard.value = '';
    closeModal(addPopup);
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
    addPopup.addEventListener('click', (elem) => {
        closeModalOverlay(elem, addPopup);
    })
    addPopup.addEventListener('submit', handleNewCardSubmit)
    openModal(addPopup);
})

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    cardList.append(cardElement);
})

