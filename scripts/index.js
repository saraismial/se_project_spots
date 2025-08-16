const modalEditProfile = document.querySelector(".modal_edit-profile");
const editProfileButton = document.querySelector(".profile__edit-btn");
const modalPostProfile = document.querySelector(".modal_post-profile");
const newPostButton = document.querySelector(".profile__post-btn");
const modalEditCloseButton = modalEditProfile.querySelector(".modal__close-btn");
const modalPostCloseButton = modalPostProfile.querySelector(".modal__close-btn");


editProfileButton.addEventListener("click", function() {
  modalEditProfile.classList.add("modal_is-opened");
});

modalEditCloseButton.addEventListener("click", function() {
  modalEditProfile.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", function() {
  modalPostProfile.classList.add("modal_is-opened");
});

modalPostCloseButton.addEventListener("click", function() {
  modalPostProfile.classList.remove("modal_is-opened");
});


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
]

initialCards.forEach(function(item) {
  console.log(`Name: ${item.name}, Link: ${item.link}`);
});