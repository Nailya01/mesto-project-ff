function openModal(popup) {
    popup.classList.add('popup_is-opened');
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

export {openModal, closeModal};