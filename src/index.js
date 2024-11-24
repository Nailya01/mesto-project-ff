import {initialCards} from '../scripts/cards.js';
import '../pages/index.css';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(item, deleteCard) {
    const itemCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = itemCard.querySelector('.card__title');
    const cardImage = itemCard.querySelector('.card__image');
    const deleteButton = itemCard.querySelector('.card__delete-button');
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    deleteButton.addEventListener('click', deleteCard);
    return itemCard;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const itemCard = createCard(item, deleteCard);
    cardsContainer.append(itemCard);
});
