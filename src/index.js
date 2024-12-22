import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getUserRequest, loadCards, editProfileApi, newAvatarApi, addNewCardApi } from './components/api.js';

let userId;

const profileAvatar = document.querySelector('.profile__avatar');
const profilePopup = document.querySelector('.popup_type-avatar');
profileAvatar.addEventListener('click', () => {
  openModal(profilePopup);
  clearValidation(profilePopup, validationConfig);
});

const avatarForm = document.querySelector('form[name="new-avatar"]');
const profileImage = document.querySelector('.profile__image');
const profileLinkInput = document.querySelector('.popup__input_type_url-avatar');
const btnSubmitAvatar = document.querySelector('.button-submit-avatar');
function addAvatar (evt) {
  evt.preventDefault();
  const originalText = btnSubmitAvatar.textContent;
  renderLoading(true, btnSubmitAvatar, originalText);
  newAvatarApi(profileLinkInput.value)
    .then((res) => {
      profileImage.src = res.avatar;
      avatarForm.reset();
      closeModal(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, btnSubmitAvatar, originalText);
    });
};

const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
profileAddButton.addEventListener('click', () => {
    openModal(popupNewCard);
    clearValidation(popupNewCard, validationConfig);
});

const popupEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileEditButton = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
    clearValidation(popupEdit, validationConfig);
});

const popupCloseButtons = document.querySelectorAll('.popup__close');
popupCloseButtons.forEach((button) => { 
  const popup = button.closest('.popup'); 
  button.addEventListener('click', () => closeModal(popup)); 
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popup);
    }  });
  popup.classList.add('popup_is-animated');
}); 

const cardsContainer = document.querySelector('.places__list');
function addCard(item, atFirst) {
  if (atFirst) {
    cardsContainer.prepend(item);
  } else {
    cardsContainer.append(item);
  }
};

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
function openImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupTypeImage)
};

const btnSubmitEditProfile = document.querySelector('.button-submit-edit-profile');
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const originalText = btnSubmitEditProfile.textContent;
  renderLoading(true, btnSubmitEditProfile, originalText);
  editProfileApi(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, btnSubmitEditProfile, originalText);
    });
};

const formElementAddCard = document.querySelector('form[name="new-place"]');
const inputCardName = formElementAddCard.querySelector('.popup__input_type_card-name');
const inputCardLink = formElementAddCard.querySelector('.popup__input_type_url');
const btnSubmitAddNewCard = document.querySelector('.button-submit-add-new-card');
function handleCardSubmit(evt) {
  evt.preventDefault();
  const originalText = btnSubmitAddNewCard.textContent;
  renderLoading(true, btnSubmitAddNewCard, originalText);
  addNewCardApi(inputCardName.value, inputCardLink.value)
    .then((item) => {
      const newCard = createCard(item, deleteCard, openImage, likeCard, userId);  
      addCard(newCard, true);
      formElementAddCard.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formElementAddCard.reset();
      renderLoading(false, btnSubmitAddNewCard, originalText);
    });
};

function renderLoading(isLoading, submitBtn, originalText) {
  if (isLoading) {
    submitBtn.textContent = 'Сохранение...';
  } else {
    submitBtn.textContent = originalText;
  }
};

Promise.all([getUserRequest(), loadCards()])
 .then(([dataRes, cardRes]) => {
    userId = dataRes._id;
    profileTitle.textContent = dataRes.name;
    profileDescription.textContent = dataRes.about;
    profileImage.src = dataRes.avatar;
    cardRes.forEach(function (item) {
      const card = createCard(item, deleteCard, openImage, likeCard, userId);
      cardsContainer.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

formElementProfile.addEventListener('submit', handleFormProfileSubmit); 
formElementAddCard.addEventListener('submit', handleCardSubmit);
avatarForm.addEventListener('submit', addAvatar);
enableValidation(validationConfig);