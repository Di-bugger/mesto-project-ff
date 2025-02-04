function closeModalEsc(key) {
    if (key.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function closeModalOverlay(event) {
    if (event.target === document.querySelector('.popup_is-opened')) {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
    document.removeEventListener('click', closeModalOverlay);
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
    popup.addEventListener('click', closeModalOverlay);
}

export {closeModal, closeModalOverlay, openModal};

