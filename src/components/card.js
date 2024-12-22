import { putLikeCard, deleteLikeCard, deleteDataCard } from './api.js';

function createCard(item, deleteCard, openImage, likeCard, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const itemCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = itemCard.querySelector('.card__title');
    const cardImage = itemCard.querySelector('.card__image');
    const deleteButton = itemCard.querySelector('.card__delete-button');
    const likeButton = itemCard.querySelector('.card__like-button');
    const likeCounter = itemCard.querySelector('.card__like-count');
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    likeCounter.textContent = item.likes.length;
    
    if (item.owner._id !== userId) {
        deleteButton.remove();
      }
    
    if (item.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
      }

    deleteButton.addEventListener('click', () => {
        deleteCard(itemCard, item);
    });

    likeButton.addEventListener('click', () => {
       likeCard(likeButton, likeCounter, item, userId);
    });

    cardImage.addEventListener('click', () => {
        openImage(item.link, item.name);
    });

    return itemCard;
};

  function deleteCard(card, item) {
    deleteDataCard(item._id)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function likeCard(likeButton, likeCounter, item, userId) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    updateLikeStatus(likeButton, likeCounter, item, userId, isLiked ? 'remove' : 'add');
  };

  function updateLikeStatus(likeButton, likeCounter, item, userId, action) {
    const apiCall = action === 'add' ? putLikeCard : deleteLikeCard;
    apiCall(item._id)
      .then((res) => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
export {createCard, deleteCard, likeCard};