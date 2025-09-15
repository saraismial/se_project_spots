export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal-error"
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorMessageElemenet = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElemenet.textContent = errorMessage;
  errorMessageElemenet.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorMessageElemenet = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElemenet.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
  errorMessageElemenet.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
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

  toggleButton(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function() {
      checkInputValidity(formElement, inputElement, config);
      toggleButton(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};



