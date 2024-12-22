const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: '6c1e004d-3ce1-44ff-8646-8ad226696ebb',
    'Content-type': 'application/json',
  },
};
  
const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
};
  
export const getUserRequest = () =>
  fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResponse);

export const editProfileApi = (nameInput, jobInput) => 
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
    name: nameInput,
    about: jobInput,
    }),
  }).then(checkResponse);  
  
export const addNewCardApi = (name, link) =>
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
    name: name,
    link: link,
    }),
  }).then(checkResponse);
  
export const loadCards = () =>
  fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResponse);  
  
export const newAvatarApi = (link) => 
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: link }),
  }).then(checkResponse);
    
export const deleteDataCard = (cardId) =>
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);

export const putLikeCard = (cardId) =>
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({ _id: cardId }),
  }).then(checkResponse);
    
export const deleteLikeCard = (cardId) =>
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);