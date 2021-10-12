const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const get = (id) => document.getElementById(id)
const img = get('poke-img')
const poke_name = get('poke-name')
const type_1 = get('poke-type-1')
const type_2 = get('poke-type-2')
const go_right = get('right-btn')
const go_left = get('left-btn')
const get_stats = get('btn-info')
const get_moves = get('btn-move')
const get_loc = get('btn-loc')
const get_evo = get('btn-evo')
const info_screen = get('poke-screen')
const hp = document.createElement('p') 
const attack = document.createElement('p') 
const defense = document.createElement('p') 
const special_attack = document.createElement('p') 
const special_defense = document.createElement('p') 
const speed = document.createElement('p') 
const weight = document.createElement('p') 
const height = document.createElement('p') 
const poke_location = document.createElement('ul');
const poke_evolutions = document.createElement('ul');
let stats = []
let moves = {}
let poke_weight = ""
let poke_height = ""
let poke_location_area = []
let evoURL = ``
let evoChain = []

const pokeName = document.querySelector('.poke-name');
function searchPoke() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    fetchPokemonData(input);
}
function fetchPokemonData(input){
    let url = baseURL + input;
    fetch(url)
    .then(response => response.json())
    .then(function(poke){
        pokemon_num = poke.id
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`
        console.log(poke.types)
        poke_name.innerHTML = capitalize(poke.forms[0].name)
        type_1.innerHTML = capitalize(poke.types[0].type.name)
        type_2.innerHTML = capitalize(poke.types[1]?.type.name || 'none')
        stats = poke.stats 
        moves = poke.moves
        poke_weight = poke.weight
        poke_height = poke.height
        getLocation();
        getSpecies();
    })
}

document.getElementById('search-btn').addEventListener("click", function() {
    searchPoke();
})

document.getElementById('searchbar').addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    searchPoke();
  }
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
      poke_weight = poke.weight
      poke_height = poke.height
      getLocation();
      getSpecies();
      removeAllChileNodes(info_screen)
      weight.innerText = "Weight: " + poke_weight
      height.innerText = "Height: "+ poke_height
      hp.innerText = "HP: " + stats[0].base_stat
      attack.innerText = "Attack: " + stats[1].base_stat
      defense.innerText = "Defense: " + stats[2].base_stat
      special_attack.innerText = "Special Attack: " + stats[3].base_stat
      special_defense.innerText = "Special Defense: " + stats[4].base_stat
      speed.innerText = "Speed: " + stats[5].base_stat
      info_screen.append(weight, height, hp, attack, defense, special_attack, special_defense, speed);
    })
}

const getLocation = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_num}/encounters`)
    .then(r => r.json())
    .then(loc => {
      poke_location_area = loc
    })
}

const getSpecies = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_num}/`)
    .then(r => r.json())
    .then(spec => {
      poke_species = spec
      evoURL = spec.evolution_chain.url
  })
}

const getEvo = () => {
  fetch(evoURL)
    .then(r => r.json())
    .then(evo => {
      evo_data = evo.chain
      evoChain.push(capitalize(evo_data.species.name))
      evoChain.push(capitalize(evo_data.evolves_to[0].species.name))
      if(evo_data.evolves_to[0].evolves_to.length > 0) {
          evoChain.push(capitalize(evo_data.evolves_to[0].evolves_to[0].species.name))
        }
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
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

document.addEventListener('click', (e) => {
  if (e.target === go_right) {
    nextPoke()
  } else if (e.target === go_left) {
    prevPoke()
  } else if (e.target === get_stats) {
    removeAllChileNodes(info_screen)
    weight.innerText = "Weight: " + poke_weight
    height.innerText = "Height: "+ poke_height
    hp.innerText = "HP: " + stats[0].base_stat
    attack.innerText = "Attack: " + stats[1].base_stat
    defense.innerText = "Defense: " + stats[2].base_stat
    special_attack.innerText = "Special Attack: " + stats[3].base_stat
    special_defense.innerText = "Special Defense: " + stats[4].base_stat
    speed.innerText = "Speed: " + stats[5].base_stat
    info_screen.append(weight, height, hp, attack, defense, special_attack, special_defense, speed);
  } else if (e.target === get_moves) {
    removeAllChileNodes(info_screen)
    moves.forEach(function(move) {
      let moveName = document.createElement('p') 
      moveName.innerText = capitalize(move.move.name)
      info_screen.appendChild(moveName)
  })
  } else if (e.target === get_loc) {
    removeAllChileNodes(info_screen)
    removeAllChileNodes(poke_location)
    if (poke_location_area.length == 0) {
      let li = document.createElement("li");
      let text = document.createTextNode("Cannot be caught in wild");
      li.appendChild(text);
      poke_location.appendChild(li);
    } else {
      poke_location_area.forEach(function(item) {
        let li = document.createElement("li");
        let noHyphen = capitalize(item.location_area.name.replace(/-/g, " "));
        let text = document.createTextNode(noHyphen);
        li.appendChild(text);
        poke_location.appendChild(li);
      })
    }
    info_screen.appendChild(poke_location)
  } else if (e.target === get_evo) {
    removeAllChileNodes(info_screen)
    removeAllChileNodes(poke_evolutions)
    getEvo();
    if(evoChain.length == 0) {
      let text = document.createTextNode("Does not evolve");
    } else {
      evoChain.forEach(function(item) {
        let li = document.createElement("li");
        let text = document.createTextNode(item);
        li.appendChild(text);
        poke_evolutions.appendChild(li);
      })
    }
    evoChain = []
    info_screen.append(poke_evolutions);
  }
})

function removeAllChileNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

getPokemon()