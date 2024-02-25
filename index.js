'use strict';

const root = document.querySelector('#root'); //Отримання секції

/**
 * Функція для створення нових елементів у верстці
 * @param {String} type - тег елемента, який нам потрібно створити
 * @param {[]} classNames - список класів, які потрібно додати до документів
 * @param  {...Node} childNodes - список дочірніх вузлів
 * @returns html element
 */

function createElement(type, { classNames }, ...childNodes) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  elem.append(...childNodes);
  return elem;
}

//Перевіряємо як загрузились зображення і після того як вони загрузилися додаємо їх до нашої обгортки.Target тут це наше зображення, яке успішно завантажилося
function imageLoadHandler({ target }) {
  console.log('image succesfully loaded');
  console.dir(target);
  const parentWrapper = document.querySelector(`#wrapper${target.dataset.id}`);
  parentWrapper.append(target);
}

//Перевіряємо чи немає помилки при завантаженні зображення. Якщо є, то картинку видаляємо
function imageErrorHandler({ target }) {
  console.log('image loading has error');
  console.log(event);
  target.remove();
}

//Прописуємо зображення. Ставимо слухачі на завантаження і помилку завантаження
function createUserImage(user) {
  const img = document.createElement('img');
  img.classList.add('card-image');
  img.setAttribute('src', user.profilePicture);
  img.setAttribute('alt', 'John avatar');
  img.dataset.id = user.id;
  img.addEventListener('load', imageLoadHandler);
  img.addEventListener('error', imageErrorHandler);
  return img;
}

//Створюємо обгортку для зображення
function createImgWrapper(user) {
  const imgWrapper = createElement('div', { classNames: ['image-wrapper'] });
  imgWrapper.setAttribute('id', `wrapper${user.id}`);

  imgWrapper.style.backgroundColor = stringToColour(user.name);

  const img = createUserImage(user);

  return imgWrapper;
}

//Створюємо карточку
function createUserCard(user) {
  const imgWrapper = createImgWrapper(user);
  const h2 = createElement('h2', { classNames: ['username'] }, user.name);
  const p = createElement(
    'p',
    { classNames: ['description'] },
    user.description
  );

  return (article = createElement(
    'article',
    { classNames: ['card-wrapper'] },
    imgWrapper,
    h2,
    p
  ));
}

const cardArray = data.map((user) => createUserCard(user)); //Створюємо масив з карточками з нашими даними з допомогою функції яку ми прописали і в яку передаємо обєкти з нашого масиву data

root.append(...cardArray); //Додаємо створені елементи в секцію

//Функція що створює з рядка HEX code. Використовуємо для бекграунда обгортки

function stringToColour(str) {
  let hash = 0;
  str.split('').forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, '0');
  }
  return colour;
}

// Примітивний варіант вирішення
// function createUserCard(user) {
//   const article = document.createElement('article');
//   article.classList.add('card-wrapper');
//   const img = document.createElement('img');
//   img.classList.add('card-image');
//   img.setAttribute('src', user.profilePicture);
//   img.setAttribute('alt', 'John avatar');
//   const h2 = document.createElement('h2');
//   h2.classList.add('user-name');
//   h2.append(user.name);

//   const p = document.createElement('p');
//   p.classList.add('description');
//   p.append(user.description);

//   article.append(img, h2, p);
//   return article;
// }
