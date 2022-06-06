import './css/styles.css';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box")
input.addEventListener("input", debounce(onSearch,300))

function onSearch(ev) {
    ev.preventDefault();
    const search = ev.target.value;
    console.log(search)

    fetch(`https://restcountries.com/v3.1/name/${search}`)
    console.log(fetch(`https://restcountries.com/v3.1/name/${search}?fields=name,capital,population,languages,flags`))
}

// function fetchCountry(name) {
    
// }
