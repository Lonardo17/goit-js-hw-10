import './css/styles.css';
import API from './fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box")
const ul = document.querySelector(".country-list")
const div = document.querySelector(".country-info")
input.addEventListener("input", debounce(onSearch,DEBOUNCE_DELAY))
//при введені значення
function onSearch(ev) {
    ev.preventDefault();
    ul.innerHTML = ""
    div.innerHTML =""
    const search = ev.target.value;
    if (!search) {
         return
    }
     
    API.fetchCountry(search.trim())
        .then(renderFilter)
        .catch(onFetchError)
}
//фільтр
function renderFilter(arr) {
    if (arr.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else
    if (arr.length > 2 && arr.length <= 10) {
        ul.innerHTML = createList(arr)
    } else
        if (arr.length = 1) {
            div.innerHTML = createInfo(...arr)
        }else return
}
//error
function onFetchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}
// створення списку
function createList(el) {
        const step = el.map(({ name, flags }) => {
        return `<li><img src="${flags.svg}" alt="flag-${name.common}" width="50" >
        ${name.common}</li>
        `
    }).join("")
    return step
}
//створення карточки
function createInfo(el) {
    return `<img src="${el.flags.svg}" alt="flag-${el.name.common}" width="100"> 
     <p>${el.name.official}</p></div>
      <ul>
        <li><span>Capital:</span> ${el.capital}</li>
        <li><span>Population:</span> ${el.population}</li>
        <li><span>Languages:</span> ${Object.values(el.languages).join(", ")}</li>
      </ul>`
}

