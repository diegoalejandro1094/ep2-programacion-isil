// crear constantes para traer elementos del DOM
const findPokemonButton = document.getElementById('findPokemonButton');
const shinyButton = document.getElementById('shinyButton');
const pokemonInfoContainer = document.getElementById('pokemonInfo');
const pokemonImage = document.querySelector('.pokemon-image');
const pokemonName = document.querySelector('.pokemon-name');
const pokemonMoves = document.querySelector('.pokemon-moves');
const pokemonHeight = document.querySelector('.pokemon-height');
const pokemonWeight = document.querySelector('.pokemon-weight');
const pokemonAbilities = document.querySelector('.pokemon-abilities');
const pokemonTypes = document.querySelector('.pokemon-types');

let data = null;
let isShiny = false;

// listener para traer el numero del pokemon y mandar peticion a la API
findPokemonButton.addEventListener('click', () => {
  const pokemonNameOrNumber = document.getElementById('pokemonSearch').value.toLowerCase();
  const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrNumber}`;

  fetch(pokemonApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se encontró el Pokémon. Inténtalo de nuevo.');
      }
      return response.json();
    })
    .then(pokemonData => {
      data = pokemonData; 
      isShiny = false; // settear isShiny a false para mostrar el front_default
      renderPokemonInfo();
    })
    .catch(error => {
      console.error('Error al obtener información del Pokémon:', error.message);
      alert(error.message);
    });
});

// listener par el boton mostrar shiny
shinyButton.addEventListener('click', () => {
  if (data) {
    isShiny = !isShiny; // Toggle isShiny a true or false
    renderPokemonInfo();
  }
});

// mostrar la información del pokemon
function renderPokemonInfo() {
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonImage.src = isShiny ? data.sprites.versions['generation-v']['black-white'].animated.front_shiny : data.sprites.versions['generation-v']['black-white'].animated.front_default;
    shinyButton.textContent = isShiny ? 'Mostrar Normal' : 'Mostrar Shiny';
    pokemonName.textContent = data.name;
    pokemonMoves.textContent = `Moves: ${data.moves.length}`;
    pokemonHeight.textContent = `Height: ${data.height/100} m`;
    pokemonWeight.textContent = `Weight: ${data.weight} kg`;

    const abilities = data.abilities.map(ability => ability.ability.name);
    pokemonAbilities.textContent = `Abilities: ${abilities.join(', ')}`;

    const types = data.types.map(type => type.type.name);
    pokemonTypes.textContent = `Types: ${types.join(', ')}`;

    pokemonInfoContainer.classList.remove('d-none');
  }
}
