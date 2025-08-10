const modalEditProfile = document.querySelector(".modal_edit-profile");
const editProfileButton = document.querySelector(".profile__edit-btn");
const modalPostProfile = document.querySelector(".modal_post-profile");
const newPostButton = document.querySelector(".profile__post-btn");
const modalEditCloseButton = modalEditProfile.querySelector(".modal__close-btn");
const modalPostCloseButton = modalPostProfile.querySelector(".modal__close-btn");


editProfileButton.addEventListener("click", function() {
  console.log("Edit Profile button clicked");
  modalEditProfile.classList.add("modal_is-opened");
})

modalEditCloseButton.addEventListener("click", function() {
  modalEditProfile.classList.remove("modal_is-opened");
})

newPostButton.addEventListener("click", function() {
  console.log("Edit Profile button clicked");
  modalPostProfile.classList.add("modal_is-opened");
})

modalPostCloseButton.addEventListener("click", function() {
  modalPostProfile.classList.remove("modal_is-opened");
})