const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  }
];
const modalEditProfile = document.querySelector(".modal_edit-profile");
const editProfileButton = document.querySelector(".profile__edit-btn");
const modalEditCloseButton = modalEditProfile.querySelector(".modal__close-btn");
const editProfileFormElement = modalEditProfile.querySelector(".modal__form");
const modalEditProfileNameInput = modalEditProfile.querySelector("#profile-name-input");
const modalEditProfileDescriptionInput = modalEditProfile.querySelector("#profile-description-input");

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");

const modalPostProfile = document.querySelector(".modal_post-profile");
const newPostButton = document.querySelector(".profile__post-btn");
const modalPostCloseButton = modalPostProfile.querySelector(".modal__close-btn");
const postProfileFormElement = modalPostProfile.querySelector(".modal__form");
const modalPostProfileLinkInput = modalPostProfile.querySelector("#profile-image-link");
const modalPostProfileCaptionInput = modalPostProfile.querySelector("#profile-image-caption");

const cardLikeButtons = document.querySelectorAll(".card__like-btn");
const cardLikedButtons = document.querySelectorAll(".card__liked-btn");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}


editProfileButton.addEventListener("click", function() {
  openModal(modalEditProfile);
  modalEditProfileNameInput.value = profileNameElement.textContent;
  modalEditProfileDescriptionInput.value = profileDescriptionElement.textContent;
});

modalEditCloseButton.addEventListener("click", function() {
  closeModal(modalEditProfile);
});

newPostButton.addEventListener("click", function() {
  openModal(modalPostProfile);
});

modalPostCloseButton.addEventListener("click", function() {
  closeModal(modalPostProfile);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const modalEditProfileNameInputValue = modalEditProfileNameInput.value;
  const modalEditProfileDescriptionInputValue = modalEditProfileDescriptionInput.value;

  profileNameElement.textContent = modalEditProfileNameInputValue;
  profileDescriptionElement.textContent = modalEditProfileDescriptionInputValue;

  closeModal(modalEditProfile);
}

editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const modalPostProfileLinkInputValue = modalPostProfileLinkInput.value;
  const modalPostProfileCaptionInputValue = modalPostProfileCaptionInput.value;

  console.log(`Image Link: ${modalPostProfileLinkInputValue}, Caption: ${modalPostProfileCaptionInputValue}`);

  closeModal(modalPostProfile);
}

postProfileFormElement.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach(function(item) {
  console.log(`Name: ${item.name}, Link: ${item.link}`);
});

cardLikeButtons.forEach(function(likeButton, index) {
  likeButton.addEventListener("click", function() {
    cardLikedButtons[index].classList.add("card__liked-btn_visible");
    likeButton.classList.add("card__like-btn_visible");
  });
});

