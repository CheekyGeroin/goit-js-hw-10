export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,languages,population,flags`
  ).then(r => {
    if (r.status === 200) {
      return r.json();
    }
    if (r.status === 404) {
      return Promise.reject('not found');
    }
  });
};
