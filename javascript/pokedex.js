const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemon_num = 1;
const poke_container = document.getElementById('poke_img');
var poke_img = document.createElement("img");
const pokeName = document.querySelector('.poke-name');
const pokeTypeOne = document.querySelector('.poke-type-one')
const pokeTypeTwo = document.querySelector('.poke-type-two')
const pokeHeight = document.querySelector('.poke-height');
const pokeWeight = document.querySelector('.poke-weight');
const colors = {
    fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
function searchPoke() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    fetchPokemonData(input);
}
function fetchPokemonData(input){
    let url = baseURL + input;
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        addPokemonImage(pokeData)
    })
}
document.getElementById('search-btn').addEventListener("click", function() {
    searchPoke();
})
fetchPokemonData('1');

// const main_types = Object.keys(colors);

// const fetchPokemon = async () => {
//     for(let i = 1; i <= pokemon_num; i++) {
//         await getPokemon(i);
//     }
// }

// const getPokemon = async id => {
//     const url = baseURL + id;
//     const res = await fetch(url);
//     const pokemon = await res.json();
//     addPokemonInfo(pokemon);
//     addPokemonImage(pokemon);
    
// }


// fetchPokemon();


function addPokemonImage(pokemon) {
    poke_img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    poke_container.appendChild(poke_img);
    document.getElementById('right-btn').addEventListener("click", function() {
        pokemon.id++;
        if (pokemon.id > 151) {
            pokemon.id = 1;
        }
        fetchPokemonData(pokemon.id);
      });
    document.getElementById('left-btn').addEventListener("click", function() {
        pokemon.id--;
        if (pokemon.id <= 0) {
            pokemon.id = 151;
        }
        fetchPokemonData(pokemon.id);
    });
}

// const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

// function addPokemonInfo(pokemon) {
//     const poke_types = pokemon['types'];
//     const first_type = poke_types[0];
//     const second_type = poke_types[1];
//     pokeName.textContent = capitalize(pokemon['name']);
//     pokeWeight.textContent = pokemon['weight'];
//     pokeHeight.textContent = pokemon['height'];
// }

/*
function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_types = pokemon.types[0].type.name;
    const type = main_types.find(
        type => poke_types.indexOf(type) > -1
        );

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
        </div>
        <div class="info">
            <span class="number">${pokemon.id}</span>
            <h3 class="name">${pokemon.name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
        ${name}
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}
*/
