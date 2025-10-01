import "./index.css";
import { settings, enableValidation } from "../scripts/validation.js";
import { Api } from "../utils/api.js";


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4062b538-5906-4b8e-84a0-90b8e0b106e8",
    "Content-Type": "application/json"
  }
});

const modalEditProfile = document.querySelector(".modal_edit-profile");
const editProfileButton = document.querySelector(".profile__edit-btn");
const modalEditCloseButton = modalEditProfile.querySelector(".modal__close-btn");
const editProfileFormElement = modalEditProfile.querySelector(".modal__form");
const modalEditProfileNameInput = modalEditProfile.querySelector("#profile-name-input");
const modalEditProfileDescriptionInput = modalEditProfile.querySelector("#profile-description-input");

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");

const profileAvatarElement = document.querySelector(".profile__image");
const modalProfileAvatar = document.querySelector(".modal_profile-avatar");
const editAvatarButton = document.querySelector(".profile__avatar-btn");
const modalAvatarCloseButton = modalProfileAvatar.querySelector(".modal__close-btn");
const avatarFormElement = modalProfileAvatar.querySelector(".modal__form");
const modalAvatarLinkInput = modalProfileAvatar.querySelector("#profile__image-link");


const modalPostProfile = document.querySelector(".modal_post-profile");
const newPostButton = document.querySelector(".profile__post-btn");
const modalPostCloseButton = modalPostProfile.querySelector(".modal__close-btn");
const postProfileFormElement = modalPostProfile.querySelector(".modal__form");
const modalPostProfileLinkInput = modalPostProfile.querySelector("#image-link");
const modalPostProfileCaptionInput = modalPostProfile.querySelector("#image-caption");

const cardsTemplate = document
  .querySelector("#cards-template")
  .content
  .querySelector(".cards-container");
const cardsSection = document.querySelector(".cards");

const modalPreviewImage = document.querySelector("#preview-modal");
const modalImageElement = modalPreviewImage.querySelector(".modal__image");
const modalImageCaption = modalPreviewImage.querySelector(".modal__caption");
const modalPreviewCloseButton = modalPreviewImage.querySelector(".modal__preview-close-btn");

const modalConfirmationModal = document.querySelector("#confirmation-modal");
const modalConfirmationCloseButton = modalConfirmationModal.querySelector(".modal__confirmation-close-btn");
const modalConfirmDeleteButton = modalConfirmationModal.querySelector(".modal__confirm-btn");
const modalCancelDeleteButton = modalConfirmationModal.querySelector(".modal__cancel-btn");

const allModals = document.querySelectorAll(".modal");
let escapeHandler;

let currentUserId;


function openModal(modal) {
  modal.classList.add("modal_is-opened");

  escapeHandler = (evt) => {
    if (evt.key === 'Escape' || evt.keyCode === 27) {
      closeModal(modal);
    }
  };

  document.addEventListener('keydown', escapeHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  document.removeEventListener('keydown', escapeHandler);
}


editProfileButton.addEventListener("click", () => {
  openModal(modalEditProfile);
  modalEditProfileNameInput.value = profileNameElement.textContent;
  modalEditProfileDescriptionInput.value = profileDescriptionElement.textContent;
});


modalEditCloseButton.addEventListener("click", () => {
  closeModal(modalEditProfile);
});

editAvatarButton.addEventListener("click", () => {
  openModal(modalProfileAvatar);
});

modalAvatarCloseButton.addEventListener("click", () => {
  closeModal(modalProfileAvatar);
});


newPostButton.addEventListener("click", () => {
  openModal(modalPostProfile);
});

modalPostCloseButton.addEventListener("click", () => {
  closeModal(modalPostProfile);
});

modalPreviewCloseButton.addEventListener("click", () => {
  closeModal(modalPreviewImage);
});

 allModals.forEach((modal) => {
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('modal')) {
      closeModal(modal);
    }
  });
});

modalConfirmationCloseButton.addEventListener("click", () => {
  closeModal(modalConfirmationModal);
});

api.getAppInfo()
  .then(([cards, user]) => {
    //for user
    profileNameElement.textContent = user.name;
    profileDescriptionElement.textContent = user.about;
    profileAvatarElement.src = user.avatar;
    currentUserId = user._id;
    //for cards
    cards.forEach((item => {
    const cardElement = getCardElement(item);
    cardsSection.append(cardElement);
    }));
  })
  .catch(console.error);


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  api
    .editUserInfo({
      name: modalEditProfileNameInput.value,
      about: modalEditProfileDescriptionInput.value
    })
    .then((data) => {

      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;

      closeModal(modalEditProfile);
    })
    .catch(console.error);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  api
    .editUserAvatar({
      avatar: modalAvatarLinkInput.value
    })
    .then((data) => {
      profileAvatarElement.src = data.avatar;
      avatarFormElement.reset();

      closeModal(modalProfileAvatar);
    })
    .catch(console.error);
}



editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

function getCardElement(data) {
  const cardElement = cardsTemplate.cloneNode(true);

  const cardDescriptionEL = cardElement.querySelector(".cards__description");
  cardDescriptionEL.textContent = data.name;

  const cardImageEL = cardElement.querySelector(".cards__image");
  cardImageEL.src = data.link;
  cardImageEL.alt = data.name;

  cardImageEL.addEventListener("click", () => {
    modalImageCaption.textContent = data.name;
    modalImageElement.src = data.link;
    modalImageElement.alt = data.name;
    openModal(modalPreviewImage);
  })

const cardLikeButton = cardElement.querySelector(".cards__like-btn");
if (data.isLiked) {
  cardLikeButton.classList.add("cards__like-btn_active");
}

cardLikeButton.addEventListener("click", () => {
  const isLiked = cardLikeButton.classList.contains("cards__like-btn_active");
  api.changeLikeCardStatus(data._id, isLiked)
    .then(() => {
      cardLikeButton.classList.toggle("cards__like-btn_active");
    })
    .catch(console.error);
});

  const cardDeleteButton = cardElement.querySelector(".cards__delete-btn");
  cardDeleteButton.addEventListener("click", () => {
  openModal(modalConfirmationModal);

  modalConfirmDeleteButton.onclick = () => {
    api.deleteCard(data._id)
      .then(() => {
        cardElement.remove();
        closeModal(modalConfirmationModal);
      })
      .catch(console.error);
  };

  modalCancelDeleteButton.onclick = () => closeModal(modalConfirmationModal);
});

  return cardElement;
}

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsSection.prepend(cardElement);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  api
    .postCardInfo({
      link: modalPostProfileLinkInput.value,
      name: modalPostProfileCaptionInput.value,
    })
    .then((data) => {
      renderCard({
        link: data.link,
        name: data.name
      });

      closeModal(modalPostProfile);

      postProfileFormElement.reset();
    })
    .catch(console.error)
}

postProfileFormElement.addEventListener('submit', handleAddCardSubmit);

enableValidation(settings);