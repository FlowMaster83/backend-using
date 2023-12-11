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
// работаем в Postman с вкладкой Body (form-data или raw - струкутура в формате json)

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
// POST (отличие от GET) должен передать какую-то информацию
// должен быть статус 201, в отличии от GET (200)

// const addPost = document.querySelector('.js-add');
// const listPosts = document.querySelector('.js-posts');
// const formWrapper = document.querySelector('.js-form');
// const errMessage = document.querySelector('.js-error');

// addPost.addEventListener('click', handlerAddPost);

// function handlerAddPost() {
//   formWrapper.innerHTML = `
//   <form action="submit" class="js-form-add" style: "style="display: flex; flex-direction: column">
//   <input type="text" name="name" />
//   <textarea name="description" type="text" cols="30" rows="10"></textarea>
//   <button>Add Post</button>
//   </form>`;

//   const form = document.querySelector('.js-form-add');
//   form.addEventListener('submit', handlerFormSubmit);
// }

// function handlerFormSubmit(event) {
//   event.preventDefault();

//   const { name, description } = event.currentTarget.elements;

//   // с функции никогда не отдавать готовый json
//   // строгий образец:
//   const data = {
//     title: name.value,
//     body: description.value,
//   };

//   addPostService(data)
//     .then(() => {
//       listPosts.insertAdjacentHTML('beforeend', createPostMarkup(data));
//     })
//     .catch(() => {
//       errMessage.innerHTML = 'Can`t add a post';
//     })
//     .finally(() => {
//       formWrapper.innerHTML = '';
//       setTimeout(() => {
//         errMessage.innerHTML = '';
//       }, 2000);
//     });
// }

// function createPostMarkup({ id, title, body }) {
//   return `<li data-id="id">
//   <h2>${title}</h2>
//   <p>${body}</p>
// </li>`;
// }

// function addPostService(data) {
//   // строгий образец:
//   const options = {
//     method: 'POST',
//     headres: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   };

//   return fetch('https://jsonplaceholder.typicode.com/posts', options).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     }
//   );
// }

//==============

// U - PUT/PATCH
// так же, как и при POST, но с указанием id (обязательно)
// PUT (используется редко, нет нужды обновлять объект полностью) - обновляет всю структуру, кроме id
// при недостаточном кол-ве элементов, все остальные будут удалены

// const options = {
//   method: 'PUT',
//   body: JSON.stringify({
//     id: 1,
//     title: 'cat',
//   }),
//   headers: { 'Content-type': 'application/json' },
// };

// fetch('https://jsonplaceholder.typicode.com/posts/1', options)
//   .then(response => response.json())
//   .then(data => console.log(data));

// PATCH - обновляет 1 элемент, который нужно обновить (используется чаще)
// const options = {
//   method: 'PUT',
//   body: JSON.stringify({
//     id: 1,
//     title: 'cat',
//     body: 'Hello dear cat',
//     email: 'test@gmail.com',
//   }),
//   headers: { 'Content-type': 'application/json' },
// };

// fetch('https://jsonplaceholder.typicode.com/posts/1', options)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// D - DELETE
// Указывается только тот элемент, который надо удалить

// const options = {
//   method: 'DELETE',
// };

// fetch('https://jsonplaceholder.typicode.com/posts/1', options).then(response =>
//   console.log(response)
// );

//==============

// асинх функции
// 'https://restcountries.com/v3.1/name/'

// async function getCapital() {
//   // try/catch - в случае, когда с данными работаем внутри функции
//   try {
//     const URL = 'https://restcountries.com/v3.1/name/';
//     const response = await fetch(`${URL}Ukraine`);
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   console.log('end');
// }

// getCapital();

//==============

// когда надо обрабатывать данные, которые будут возвращаться вне функции
// return
// then/catch

// async function getCapital() {
//   const URL = 'https://restcountries.com/v3.1/name/';
//   const response = await fetch(`${URL}Ukraine`);
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response.json();
// }

// getCapital()
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

//==============

// любая функция может стать асинх
// всегда возвращает промис

// делятся на 2 случая обработки:
// если запрос обрабатывается внутри (без return) - обрабатываем с помоцью try (запрос, проверка на статус, парс респонса и тд) / catch (пишется возможная ошибка)
// если за пределы - обработка при помощи then / catch

// async function foo() {}

// console.log(foo());

// // arrow async
// const arrow = async () => {};
// // exp asynce
// const exp = async function () {};

// const user = {
//   async getFoo() {},
//   getInfo: async function () {},
//   getTest: async () => {},
// };

//==============

// парал и послед запросы
// promise.all() - обрабатывает все УСПЕШНЫЕ респонсы
// Promise.allSettled - обрабатывает ВСЕ респонсы и добавит флажок
// Promise.race()​
// Promise.resolve()
// Promise.reject()

// Параллельные запросы
// обрабатываем во внешний код, по этому try/catch не нужен
async function getCapital() {
  const URL = 'https://restcountries.com/v3.1/name/';
  const arr = ['Ukraine', 'France', 'Germany'];
  const responses = arr.map(async country => {
    const response = await fetch(`${URL}${country}`);
    if (!response.ok) {
      throw new Error('Not Found');
    }
    return response.json();
  });

  // метод allSettled
  const prom = await Promise.allSettled(responses);
  return prom;
}

getCapital()
  .then(data => {
    const resolve = data
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value);
    const reject = data.filter(({ status }) => status === 'rejected');
  })
  .catch(error => console.log(error));
// асинх функция всегда возвращает промис
