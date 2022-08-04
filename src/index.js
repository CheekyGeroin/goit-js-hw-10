import './css/styles.css';
import debounce from 'lodash.debounce';
import cardTemplate from './templates/card-template.hbs';
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
  const name = refs.input.value;
  fetchCountries(name);
}

function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(r => r.json())
    .then(country => {
      console.log(country);
      //   const markUp = cardTemplate(country);
      //   console.log(markUp);
    })
    .catch(error => console.log(error));
}
