// {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// }

const showInputError = (arrayConfig, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(arrayConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(arrayConfig.errorClass);
}

const hideInputError = (arrayConfig, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(arrayConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(arrayConfig.errorClass);
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const checkInputValidity = (arrayConfig ,formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(arrayConfig ,formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(arrayConfig ,formElement, inputElement);
    }
}

const toggleButtonState = (inputList, buttonElement, buttonErrorClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(buttonErrorClass);
    } else {
        buttonElement.classList.remove(buttonErrorClass);
    }
}

const setEventListener = (arrayConfig, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(arrayConfig.inputSelector));
    const buttonElement = formElement.querySelector(arrayConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(arrayConfig,formElement, inputElement);
            toggleButtonState(inputList, buttonElement, arrayConfig.inactiveButtonClass,);
        })
    })
}

const clearValidation = (formElement, arrayConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(arrayConfig.inputSelector));
    const buttonElement = formElement.querySelector(arrayConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(arrayConfig, formElement, inputElement);
    })
    toggleButtonState(inputList, buttonElement, arrayConfig.inactiveButtonClass,);
}

const enableValidation = (arrayConfig) => {
    const formList = Array.from(document.querySelectorAll(arrayConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit',function (evt) {
            evt.preventDefault();
        });
        setEventListener(arrayConfig, formElement);
    })
}


export {enableValidation, clearValidation}