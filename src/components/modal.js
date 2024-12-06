function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    popup.addEventListener('mousedown', closeModalOverlay);
    document.addEventListener('keydown', escClose);
};
  
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escClose);
};

function escClose (evt) {
    if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
    }
};

const closeModalOverlay = (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
    }
 };

export {openModal, closeModal};