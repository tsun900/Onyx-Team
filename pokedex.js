const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const get = (id) => document.getElementById(id)
const img = get('poke-img')
const poke_name = get('poke-name')
const type_1 = get('poke-type-1')
const type_2 = get('poke-type-2')
const get_stats = get('stats-button')
const go_right = get('right-btn')
const go_left = get('left-btn')
const info_screen = get('poke-screen')
const hp = document.createElement('p') 
const attack = document.createElement('p') 
const defense = document.createElement('p') 
const special_attack = document.createElement('p') 
const special_defense = document.createElement('p') 
const speed = document.createElement('p') 
const weight = document.createElement('p') 
const height = document.createElement('p') 
let stats = []

// const pokemon_num = 1;
// const poke_container = document.getElementById('poke_img');
// var poke_img = document.createElement("img");
const pokeName = document.querySelector('.poke-name');
// const pokeTypeOne = document.querySelector('.poke-type-one')
// const pokeTypeTwo = document.querySelector('.poke-type-two')
// const pokeHeight = document.querySelector('.poke-height');
// const pokeWeight = document.querySelector('.poke-weight');
function searchPoke() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    fetchPokemonData(input);
}
let moves = {}
function fetchPokemonData(input){
    let url = baseURL + input;
    fetch(url)
    .then(response => response.json())
    .then(function(poke){
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`
        console.log(poke.types)
        poke_name.innerHTML = poke.forms[0].name
        type_1.innerHTML = poke.types[0].type.name
        type_2.innerHTML = poke.types[1]?.type.name || 'none'
        stats = poke.stats
        stats = poke.stats 
        moves = poke.moves
            document.getElementById('btn-move').addEventListener("click", function() {
                removeAllChileNodes(document.getElementById('poke-screen'))
                Moves();
            })
        document.getElementById('btn-info').addEventListener("click", function() {
            removeAllChileNodes(info_screen)
            infoDisplay(poke);
        })
    })
}

function Moves() {
    moves.forEach(function(move) {
        console.log(move.move.name)
        let moveName = document.createElement('p') 
        moveName.innerText = move.move.name
        document.getElementById('poke-screen').appendChild(moveName)
    })
}
document.getElementById('search-btn').addEventListener("click", function() {
    searchPoke();
})
let pokemon_num = 1;
const getPokemon = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_num}`)
    .then(r => r.json())
    .then(poke => {
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon_num}.png`
      console.log(poke.types)
      poke_name.innerHTML = capitalize(poke.forms[0].name)
      type_1.innerHTML = capitalize(poke.types[0].type.name)
      type_2.innerHTML = capitalize(poke.types[1]?.type.name || 'none')
      stats = poke.stats 
      moves = poke.moves
        document.getElementById('btn-move').addEventListener("click", function() {
            removeAllChileNodes(document.getElementById('poke-screen'))
            Moves();
        })
      document.getElementById('btn-info').addEventListener("click", function() {
        removeAllChileNodes(info_screen)
        infoDisplay(poke);
      })
    })
}

function infoDisplay(poke) {
    weight.innerText = "Weight: " + poke.weight
    height.innerText = "Height: "+ poke.height
    hp.innerText = "HP: " + stats[0].base_stat
    attack.innerText = "Attack: " + stats[1].base_stat
    defense.innerText = "Defense: " + stats[2].base_stat
    special_attack.innerText = "Special Attack: " + stats[3].base_stat
    special_defense.innerText = "Special Defense: " + stats[4].base_stat
    speed.innerText = "Speed: " + stats[5].base_stat
    info_screen.append(weight, height, hp, attack, defense, special_attack, special_defense, speed);
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
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

document.addEventListener('click', (e) => {
  if (e.target === go_right) {
    nextPoke()
  } else if (e.target === go_left) {
    prevPoke()
  } else if (e.target === get_stats) {
    clearSelected()
  }
})

function removeAllChileNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
getPokemon()