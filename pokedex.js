const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const poke_container = document.getElementById('poke_img');
const pokemon_num = 151;
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

const main_types = Object.keys(colors);

const fetchPokemon = async () => {
    for(let i = 1; i <= pokemon_num; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = baseURL + id;
    const res = await fetch(url);
    const pokemon = await res.json();
}



fetchPokemon();


function addPokemonImage(pokemon) {
    var poke_img = document.createElement("img");
    poke_img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    poke_container.appendChild(poke_img);
}

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
