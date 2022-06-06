
function fetchCountry(search) {
    return fetch(`https://restcountries.com/v3.1/name/${search}?fields=name,capital,population,languages,flags`)
.then(response => response.json())    
}
export default { fetchCountry }