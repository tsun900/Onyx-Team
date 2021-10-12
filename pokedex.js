const get = (id) => document.getElementById(id)
const img = get('poke-img')
const poke_name = get('poke-name')
const type_1 = get('poke-type-1')
const type_2 = get('poke-type-2')
const get_stats = get('stats')
const go_right = get('right-btn')
const go_left = get('left-btn')

let stats = {}
const typeColors = {
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
}
let pokemon_num = 1;
const getPokemon = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_num}`)
    .then(r => r.json())
    .then(poke => {
      img.src = poke.sprites.front_default
      console.log(poke.types)
      poke_name.innerHTML = poke.forms[0].name
      type_1.innerHTML = poke.types[0].type.name
      type_2.innerHTML = poke.types[1]?.type.name || 'none'
      stats = poke.stats
    })
}

const nextPoke = () => {
  pokemon_num++
  getPokemon()
}

const prevPoke = () => {
  pokemon_num--
  if (pokemon_num === 0) pokemon_num = 1
  else getPokemon()
}

const clearSelected = () => [get_stats].forEach(e => e.classList.remove('selected'))

document.addEventListener('click', (e) => {
  if (e.target === go_right) {
    nextPoke()
  } else if (e.target === go_left) {
    prevPoke()
  } else if (e.target === get_stats) {
    //set stats
    clearSelected()
  }
})

getPokemon()





/*
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
    addPokemonInfo(pokemon);
    addPokemonImage(pokemon);
    document.getElementById('right-btn').addEventListener("click", function() {
        pokemon.id++;
        if (pokemon.id >= 151) {
            pokemon.id = 1;
        }
        addPokemonImage(pokemon);
      });
    document.getElementById('left-btn').addEventListener("click", function() {
        pokemon.id--;
        if (pokemon.id <= 0) {
            pokemon.id = 151;
        }
        addPokemonImage(pokemon);
    });
}


fetchPokemon();


function addPokemonImage(pokemon) {
    poke_img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    poke_container.appendChild(poke_img);
}

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

function addPokemonInfo(pokemon) {
    const poke_types = pokemon['types'];
    const first_type = poke_types[0];
    const second_type = poke_types[1];
    pokeName.textContent = capitalize(pokemon['name']);
    pokeWeight.textContent = pokemon['weight'];
    pokeHeight.textContent = pokemon['height'];
}
*/