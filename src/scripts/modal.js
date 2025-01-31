function closeModalEsc(key, popup) {
    if (key.key === 'Escape') {
        closeModal(popup)
    }
}

function closeModalOverlay(event,popup) {
    if (event.target === popup) {
        closeModal(popup);
    }
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (event) => {
        closeModalEsc(event, popup);
    })
}

export {closeModal, closeModalEsc, closeModalOverlay, openModal};

