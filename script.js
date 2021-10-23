const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
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
}

const main_types = Object.keys(colors)



const showPokemon = (id) => {
  const idSpan = document.getElementById(`id_pokemon_${id}`).innerText
  const image = document.getElementById(`image_pokemon_${id}`).src
  const name = document.getElementById(`name_pokemon_${id}`).innerText
  const type = document.getElementById(`type_pokemon_${id}`).innerText
  Swal.fire({
    imageUrl: image,
    imageHeight: 200,
    imageAlt: name,
    title: idSpan,
    html: '<div class="info">' +
      `<h3 class="name">${name}</h3>` +
      `<small class="type">Type: <span>${type}</span> </small>` +
      '</div>',
    confirmButtonColor: colors[type],
    confirmButtonText: '<h5 style="color: black">Ok</h5>',
  })
}

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i)
  }
}

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()
  createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemon')
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const id = pokemon.id.toString().padStart(3, '0')

  pokemonEl.onclick = function () {
    showPokemon(id)
  };

  const poke_types = pokemon.types.map(type => type.type.name)
  const type = main_types.find(type => poke_types.indexOf(type) > -1)
  const color = colors[type]

  pokemonEl.style.backgroundColor = color
  const pokemonInnerHTML = `
    <div class="img-container">
        <img id="image_pokemon_${id}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number" id="id_pokemon_${id}">#${id}</span>
        <h3 class="name" id="name_pokemon_${id}">${name}</h3>
        <small class="type">Type: <span id="type_pokemon_${id}">${type}</span> </small>
    </div>
    `

  pokemonEl.innerHTML = pokemonInnerHTML

  poke_container.appendChild(pokemonEl)
}

fetchPokemons()
