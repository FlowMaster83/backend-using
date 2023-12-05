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

const BASE_URL = 'https://api.themoviedb.org/3';
const END_POINT = 'trending/movie/day';
const API_KEY = '155ac852b40c3d4bc41678b5b0356daa';
const list = document.querySelector('.js-list');

function getTrending() {
  fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=20`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

getTrending()
  .then(data =>
    list.insertAdjacentHTML('beforeend', createMarkup(data.results))
  )
  .catch(err => console.log(err));

function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, title }) => `<li>
    <img  src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}">
    <h2>${title}</h2>
  </li>`
    )
    .join('');
}

//==============
