/* для понимания:

http/1.1
запрос на страницу
запрос на стили
запрос на стили

*/

/* http/2

запрос на страницу
паралельный запрос на стили и скрипты

postman - запрос на бекенд без написания кода
SOAP API (более защищенная, тяжело парсится, базируется на формате XML, тяжело сформировать хттп-запрос)
REST API (максимально быстрая, передаёт данные в формате JSON, но не слишком большие и менее защищённая)

*/

/* 

ТИПЫ ЗАПРОСОВ

GET - ПОЛУЧЕНИЕ
POST - СОЗДАНИЕ
PUT/PATCH - ОБНОВЛЕНИЕ
DELETE - УДАЛЕНИЕ

*/

/* 

выбираем эндпоинт https://swapi.dev/api/films/ - (films - это эндпоинт (функция))
смотрим на request параметры (прийдут, как параметры функции) - формируется через ?
если больше 1 параметра, разделяем знаком &
*/

/* 

Кросс-доменные запросы - защита от посторонних запросов

есть домен ресурса: rozetka.com
вкладка network (отвечает за http-запросы)
вкладка Headers - referer: домен, с которого уходит запрос на бекенд
на бекенде есть массив с названиями сайтов, кому можна доверять
если сайта нет, будет CORS-ошибка (Request Header -> origin -> error)

POSTMAN - отдаст, но не факт, что будет работать через fetch.
*/

//==============

// Пагинация

// const BASE_URL = 'https://the-one-api.dev/v2';
// const END_POINT = 'character';
// const KEY = 'pTksQP-kRtSZO_M71kE_';

// function getCharacter() {
//   const param = new URLSearchParams({
//     limit: 30,
//     page: 1,
//   });

//   //   опция для типа запроса
//   const option = {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${KEY}`,
//     },
//   };

//   fetch(`${BASE_URL}${END_POINT}?${param}`, option).then(response =>
//     console.log(response)
//   );
// }

// getCharacter();

//==============

// const BASE_URL = 'https://api.themoviedb.org/3';
// const END_POINT = 'trending/movie/day';
// const API_KEY = '155ac852b40c3d4bc41678b5b0356daa';
// const list = document.querySelector('.js-list');

// function getTrending() {
//   fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=20`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     return response.json();
//   });
// }

// getTrending()
//   .then(data =>
//     list.insertAdjacentHTML('beforeend', createMarkup(data.results))
//   )
//   .catch(err => console.log(err));

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ poster_path, title }) => `<li>
//     <img  src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}">
//     <h2>${title}</h2>
//   </li>`
//     )
//     .join('');
// }

//==============

// CRUD - Create Read Update Delete
// топ-5 запросов на бекенд
// json placeholder - api

// R - GET
// POST (отличие от GET) должен передать какую-то информацию
// работаем в Postman с вкладкой Body (form-data или raw - струкутура в формате json)
// должен быть статус 201, в отличии от GET (200)

// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then(response => response.json())
//   .then(json => console.log(json));

// {
//   id: 1,
//   title: '...',
//   body: '...',
//   userId: 1
// }

// C - POST

// опции (строгая структура)
// body - формат json

const addPost = document.querySelector('.js-add');
const listPosts = document.querySelector('.js-posts');
const formWrapper = document.querySelector('.js-form');
const errMessage = document.querySelector('.js-error');

addPost.addEventListener('click', handlerAddPost);

function handlerAddPost() {
  formWrapper.innerHTML = `
  <form action="submit" class="js-form-add" style: "style="display: flex; flex-direction: column">
  <input type="text" name="name" />
  <textarea name="description" type="text" cols="30" rows="10"></textarea>
  <button>Add Post</button>
  </form>`;

  const form = document.querySelector('.js-form-add');
  form.addEventListener('submit', handlerFormSubmit);
}

function handlerFormSubmit(event) {
  event.preventDefault();

  const { name, description } = event.currentTarget.elements;

  // с функции никогда не отдавать готовый json
  // строгий образец:
  const data = {
    title: name.value,
    body: description.value,
  };

  addPostService(data)
    .then(() => {
      listPosts.insertAdjacentHTML('beforeend', createPostMarkup(data));
    })
    .catch(() => {
      errMessage.innerHTML = 'Can`t add a post';
    })
    .finally(() => {
      formWrapper.innerHTML = '';
      setTimeout(() => {
        errMessage.innerHTML = '';
      }, 2000);
    });
}

function createPostMarkup({ id, title, body }) {
  return `<li data-id="id">
  <h2>${title}</h2>
  <p>${body}</p>
</li>`;
}

function addPostService(data) {
  // строгий образец:
  const options = {
    method: 'POST',
    headres: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch('https://jsonplaceholder.typicode.com/posts', options).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}
