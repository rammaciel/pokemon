const poke_container = document.getElementById('poke-container')
const pokemon_count = 151
const colors = {
  fire: '#fd7d24',
  grass: '#78c850',
	electric: '#f8d030',
	water: '#6890f0',
	ground: '#e0c068',
	rock: '#b8a038',
	fairy: '#ee99ac',
	poison: '#a040a0',
	bug: '#a8b820',
	dragon: '#7038f8',
	psychic: '#f85888',
	flying: '#a890f0',
	fighting: '#c02038',
	normal: '#a8a878',
  steel: '#b8b8d0'
}


const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
    console.log(data)
}

const createPokemonCard = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')
    const poke_types = pokemon.types.map(type => type.type.name)
  
    var pokemonInnerHTML

    if(poke_types.length == 2){
      pokemonInnerHTML = `
			<div class="imagem">
				<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png"" alt="${name}">
			</div>
			<div class="info">
				<span class="number">#${id}</span>
				<p class="name">${name}</p>
				<span class="types">
          <span class="type" style="background-color:${colors[poke_types[0]]}">${poke_types[0]}</span>
					<span class="type" style="background-color:${colors[poke_types[1]]}">${poke_types[1]}</span>
				</span>
			</div>
    `
    }
    if(poke_types.length == 1){
      pokemonInnerHTML = `
			<div class="imagem">
				<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png"" alt="${name}">
			</div>
			<div class="info">
				<span class="number">#${id}</span>
				<p class="name">${name}</p>
				<span class="types">
          <span class="type" style="background-color:${colors[poke_types[0]]}">${poke_types[0]}</span>
				</span>
			</div>
    `
    }

    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')
    pokemonEl.innerHTML = pokemonInnerHTML
    poke_container.appendChild(pokemonEl)
}

fetchPokemons()