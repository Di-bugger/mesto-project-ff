import './pages/index.css';
import {initialCards} from "./scripts/cards";
import {closeModal, openModal, closeModalOverlay} from "./scripts/modal";
import {handleLikeCard, createCard, deleteCard} from "./scripts/card";
import {enableValidation, clearValidation} from "./scripts/validation";
import {getInitialCards, getUser, updateUserInfo, postNewCard, updateAvatar} from "./scripts/api";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// Кнопки открытия
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Попапы
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imgPopup = document.querySelector(".popup_type_image");
const editAvatarPopup = document.querySelector(".popup_type_update-avatar");

// Данные информации аккаунта
const userContent = document.querySelector(".profile");
const userImg = userContent.querySelector(".profile__image");
const titleProfile = userContent.querySelector(".profile__title");
const descriptionProfile = userContent.querySelector(".profile__description");

//Формы
const editForm = document.querySelector(".popup__form[name='edit-profile']");
const addForm = document.querySelector(".popup__form[name='new-place']");
const editAvatarForm = document.querySelector('.popup__form[name="update-avatar"]')

//Данные попапов
const titleChangeProfile = document.querySelector(".popup__input_type_name");
const descriptionChangeProfile = document.querySelector(".popup__input_type_description");
const nameCardInput = document.querySelector(".popup__input_type_card-name");
const imgUrlCardInput = document.querySelector(".popup__input_type_url");
const editAvatarInput = document.querySelector(".popup__input_update-avatar");

//
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
let currentUserId = null

function handleProfileSubmit(event) {
    event.preventDefault();
    renderLoading(true, editForm)

    updateUserInfo(titleChangeProfile.value, descriptionChangeProfile.value)
        .then(result => {
            titleProfile.textContent = result.name;
            descriptionProfile.textContent = result.about;
        })
        .catch((error)=> {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, editForm)
        })

    closeModal(editPopup);
}

function handleNewCardSubmit(event) {
    event.preventDefault();
    renderLoading(true, addForm)

    postNewCard(nameCardInput.value, imgUrlCardInput.value)
        .then(result => {
            cardList.prepend(createCard( result._id ,result.name, result.link, result.likes, result.owner._id, currentUserId, handleLikeCard, handleImgCardPopup, deleteCard));
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, addForm)
        })

    closeModal(addPopup);
}

function handleImgCardPopup(name, urlImage) {
    const imgCardPopup = document.querySelector(".popup__image");
    const infoCardPopup = document.querySelector(".popup__caption");

    imgCardPopup.src = urlImage;
    infoCardPopup.textContent = name;
    imgCardPopup.alt = name;

    openModal(imgPopup);
}

function handleUpdateAvatar(event) {
    event.preventDefault();
    renderLoading(true, editAvatarForm)

    const avatarUrl = editAvatarInput.value;
    updateAvatar(avatarUrl)
    .then(avatar => {
        userImg.style.backgroundImage = `url(${avatar.avatar})`;
        editAvatarForm.reset()
        closeModal(editAvatarPopup)
    })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            renderLoading(false, editAvatarForm)
        })
}

function renderUserInfo(name, description, img) {
    userImg.style.backgroundImage = `url(${img})`;
    titleProfile.textContent = name;
    userImg.alt = name;
    descriptionProfile.textContent = description
}

editButton.addEventListener('click', (elem) => {
    titleChangeProfile.value = titleProfile.textContent;
    descriptionChangeProfile.value = descriptionProfile.textContent;
    clearValidation(editForm,validationConfig)
    openModal(editPopup);
})

addButton.addEventListener('click', (elem) => {
    nameCardInput.value = '';
    imgUrlCardInput.value = '';
    clearValidation(addForm,validationConfig)
    openModal(addPopup);
})

userImg.addEventListener('click', (elem) => {
    editAvatarForm.reset()
    clearValidation(editAvatarForm, validationConfig)
    openModal(editAvatarPopup)
})

document.querySelectorAll('.popup__close').forEach(elem => {
    elem.addEventListener('click', event => {
        closeModal(elem.closest('.popup'))
    })
})

const renderLoading = (isLoading, formElement) => {
    const buttonElement = formElement.querySelector('.popup__button')
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...'
    } else {
        buttonElement.textContent = 'Сохранить'
    }
}

enableValidation(validationConfig)

addPopup.addEventListener('submit', handleNewCardSubmit)
editPopup.addEventListener('submit', handleProfileSubmit)
editAvatarForm.addEventListener('submit', handleUpdateAvatar)
Promise.all([getUser(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
        currentUserId = userInfo._id
        renderUserInfo(userInfo.name, userInfo.about, userInfo.avatar)

        initialCards.forEach(item => {
            const cardElement = createCard(item._id, item.name, item.link, item.likes, item.owner._id, currentUserId,  handleLikeCard, handleImgCardPopup, deleteCard);
            cardList.append(cardElement);
        })
    })
    .catch(error =>
        console.log(error)
    )





