function createCard(name, link, deleteCard, openImage, likeCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const itemCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = itemCard.querySelector('.card__title');
    const  cardImage = itemCard.querySelector('.card__image');
    const deleteButton = itemCard.querySelector('.card__delete-button');
    const likeButton = itemCard.querySelector('.card__like-button');
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    
   deleteButton.addEventListener('click', () => {
        deleteCard(itemCard);
    });
    likeButton.addEventListener('click', () => {
       likeCard(likeButton);
    });
    cardImage.addEventListener('click', () => {
        openImage(link, name);
    });
    return itemCard;
};

function deleteCard (itemCard) {
    itemCard.remove()
}

function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
};

export {createCard, deleteCard, likeCard};
