// Declaring a configuration object that contains the
// necessary classes and selectors.
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: ".modal__submit-btn-disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal-error"
}

// Passing the configuration object to enableValidation when we call it.


const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorMessageElemenet = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElemenet.textContent = errorMessage;
  inputElement.classList.add(config.errorClass, config.nputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorMessageElemenet = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.errorClass, config.nputErrorClass);
  errorMessageElemenet.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButton = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButton(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function() {
      checkInputValidity(formElement, inputElement);
      toggleButton(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);

