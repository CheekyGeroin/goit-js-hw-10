import './css/styles.css';
import debounce from 'lodash.debounce';
import cardTemplate from './templates/card-template.hbs';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  cardInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(onFetchCountries, DEBOUNCE_DELAY)
);

function onFetchCountries() {
  const name = refs.input.value.trim().toLowerCase();
  name.trim();
  if (name != ' ') {
    fetchCountries(name);
  } else {
    Notiflix.Notify.warning('Write name of country!');
  }
}

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,languages,population,flags`
  )
    .then(r => {
      return r.json();
    })
    .then(createTemplate)
    .catch(catchError);
}

function createTemplate(country) {
  console.log(country);
  if (country > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (country >= 2 && country <= 10) {
  } else {
    const markUp = cardTemplate(country);
    refs.cardInfo.innerHTML = markUp;
  }
}
function catchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
