import './pages/index.css';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {initialCards} from './scripts/cards.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
});

const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;
    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;
    closeModal(popupEdit);
};

const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
profileAddButton.addEventListener('click', function () {
    openModal(popupNewCard);
})

const cardsContainer = document.querySelector('.places__list');
initialCards.forEach(function(element) {
    const itemCard = createCard(element.name, element.link, deleteCard, openImage, likeCard);
    cardsContainer.append(itemCard);
});

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
function openImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupTypeImage)
};

const popupCloseButtons = document.querySelectorAll('.popup__close');
popupCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        closeModal(popup);
    });
 }); 

const formElementAddCard = document.querySelector('form[name="new-place"]');
const inputCardName = formElementAddCard.querySelector('.popup__input_type_card-name');
const inputCardLink = formElementAddCard.querySelector('.popup__input_type_url');
function handleCardSubmit(evt) {
    evt.preventDefault();
    const cardName = inputCardName.value;
    const cardLink = inputCardLink.value;
    const itemCard = createCard(cardName, cardLink, deleteCard, openImage, likeCard);
    cardsContainer.prepend(itemCard);
    formElementAddCard.reset(); 
    closeModal(popupNewCard);
};

formElementProfile.addEventListener('submit', handleFormProfileSubmit); 
formElementAddCard.addEventListener('submit', handleCardSubmit);