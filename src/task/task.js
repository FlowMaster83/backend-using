const addCountry = document.querySelector('.js-add');
const searchForm = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
const formContainer = document.querySelector('.js-form-container');

addCountry.addEventListener('click', handlerAddInput);

function handlerAddInput() {
  const markup = `<input type="text" name="country"/>`;
  formContainer.insertAdjacentHTML('beforeend', markup);
}

searchForm.addEventListener('submit', handlerFrom);

function handlerFrom(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const arr = data
    .getAll('country')
    .filter(item => item)
    .map(item => item.trim());
  getCountries(arr)
    .then(async response => {
      const capitals = response.map(({ capital }) => capital[0]);
      const weatherService = await getWeather(capitals);
      list.innerHTML = createMarkup(weatherService);
    })
    .catch(e => console.log(e))
    .finally(() => {
      formContainer.innerHTML = markup;
      searchForm.reset();
    });
}

async function getCountries(arr) {
  // паралельный запрос
  const responses = arr.map(async item => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${item}`);
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

  const data = await Promise.allSettled(responses);
  const countryObj = data
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value[0]);

  return countryObj;
}

async function getWeather(arr) {
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const API_KEY = 'ce2cb9b2a3da414bb5b172546231704';

  const responses = arr.map(async city => {
    const params = new URLSearchParams({
      key: API_KEY,
      q: city,
      lang: 'uk',
    });

    const response = await fetch(`${BASE_URL}/current.json?${params}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
  const data = await Promise.allSettled(responses);
  const objects = data
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value);

  return objects;
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        current: {
          temp_c,
          condition: { text, icon },
        },
        location: { country, name },
      }) => {
        `<li>

      <div>
        <h2>${country}</h2>
        <h3>${name}</h3>
      </div>
      <img src="${icon}" alt="${text}">
      <p>${text}</p>
      <p>${temp_c}</p>

      </li>`;
      }
    )
    .join('');
}
