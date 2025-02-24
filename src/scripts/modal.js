function closeModalEsc(key) {
    if (key.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function closeModalOverlay(event) {
    if (event.target === event.currentTarget) {
        closeModal(event.currentTarget);
    }
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
    popup.removeEventListener('click', closeModalOverlay);
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
    popup.addEventListener('click', closeModalOverlay);
}

export {closeModal, closeModalOverlay, openModal};

