
const pokemonName = document.querySelector(".name-pokemon");
const pokemonNumber = document.querySelector(".number-pokemon");
const pokemonImage = document.querySelector(".pokemon");
const form = document.querySelector(".form");
const input = document.querySelector(".pokemon-search");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
   }    
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon);
    
    if(data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];
        searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = ''
        pokemonImage.src = ''
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase())
    input.value = ''
})

btnNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

btnPrev.addEventListener('click', () => {
   if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
   }
})

renderPokemon('1')

