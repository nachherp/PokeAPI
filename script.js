const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";
const pokemonList = document.getElementById("pokemon-list");
const selectedCardContainer = document.getElementById("selected-card");

// Cargar 
document.addEventListener("DOMContentLoaded", () => {
  renderSelectedCards();
  fetchPokemons();
});


async function fetchPokemons() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderPokemonList(data.results);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

async function renderPokemonList(pokemons) {
  pokemonList.innerHTML = ""; 
  for (const pokemon of pokemons) {
    const pokemonData = await fetchPokemonDetails(pokemon.url);
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.innerHTML = `
      <img src="${pokemonData.sprites.front_default}" alt="${pokemon.name}">
      <h4>${pokemon.name}</h4>
    `;
    gridItem.addEventListener("click", () => selectPokemon(pokemonData));
    pokemonList.appendChild(gridItem);
  }
}


async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
}


function selectPokemon(pokemon) {
  const selectedPokemons = JSON.parse(localStorage.getItem("selectedPokemons")) || [];
  selectedPokemons.push({
    name: pokemon.name,
    img: pokemon.sprites.front_default,
    description: `Height: ${pokemon.height}, Weight: ${pokemon.weight}`,
  });
  localStorage.setItem("selectedPokemons", JSON.stringify(selectedPokemons));
  renderSelectedCards();
}


function renderSelectedCards() {
  selectedCardContainer.innerHTML = ""; 
  const selectedPokemons = JSON.parse(localStorage.getItem("selectedPokemons")) || [];
  selectedPokemons.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${pokemon.img}" alt="${pokemon.name}">
      <div>
        <h4>${pokemon.name}</h4>
        <p>${pokemon.description}</p>
      </div>
    `;
    selectedCardContainer.appendChild(card);
  });
}
