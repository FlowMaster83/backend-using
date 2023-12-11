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
  getCountries(arr);
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

async function getWeather() {
  const BASE_URL = 'http://api.weatherapi.com/v1';
}

// capital, name.official
// http://api.weatherapi.com/v1
// current.json
