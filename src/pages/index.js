import "./index.css";
import { settings, enableValidation } from "../scripts/validation.js";
// import valThorensImage from "../images/val-thorens.jpg";
// import restaurantTerraceImage from "../images/restaurant-terrace.jpg";
// import outdoorCafeImage from "../images/outdoor-cafe.jpg";
// import longBridgeImage from "../images/long-bridge.jpg";
// import tunnelImage from "../images/tunnel.jpg";
// import mountainHouseImage from "../images/mountain-house.jpg";
import { Api } from "../utils/api.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: valThorensImage
//   },
//   {
//     name: "Restaurant terrace",
//     link: restaurantTerraceImage
//   },
//   {
//     name: "An outdoor cafe",
//     link: outdoorCafeImage
//   },
//   {
//     name: "A very long bridge, over the forest...",
//     link: longBridgeImage
//   },
//   {
//     name: "Tunnel with morning light",
//     link: tunnelImage
//   },
//   {
//     name: "Mountain house",
//     link: mountainHouseImage
//   }
// ];



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
const modalImageContainer = modalPreviewImage.querySelector(".modal__image-container");
const modalImageElement = modalPreviewImage.querySelector(".modal__image");
const modalImageCaption = modalPreviewImage.querySelector(".modal__caption");
const modalPreviewCloseButton = modalPreviewImage.querySelector(".modal__preview-close-btn");

const allModals = document.querySelectorAll(".modal");
let escapeHandler;


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

api.getAppInfo()
  .then(([cards, user]) => {
    //for user
    profileNameElement.textContent = user.name;
    profileDescriptionElement.textContent = user.about;
    profileAvatarElement.src = user.avatar;
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
  });

  const cardDeleteButton = cardElement.querySelector(".cards__delete-btn");
  cardDeleteButton.addEventListener("click", function() {
    cardElement.remove();
  });

  const cardLikeButton = cardElement.querySelector(".cards__like-btn");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("cards__like-btn_active");
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

  // const modalPostProfileLinkInputValue = modalPostProfileLinkInput.value;
  // const modalPostProfileCaptionInputValue = modalPostProfileCaptionInput.value;

  // renderCard({
  //   name: modalPostProfileCaptionInputValue,
  //   link: modalPostProfileLinkInputValue
  // });

  // closeModal(modalPostProfile);

  // postProfileFormElement.reset();
}

postProfileFormElement.addEventListener('submit', handleAddCardSubmit);

enableValidation(settings);