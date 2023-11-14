const form = document.getElementById("form");
const input = document.querySelector(".input-form");
const cardContainer = document.querySelector(".card-container");

const pokemonLS = JSON.parse(localStorage.getItem("Pokemon"));

const getPokemon = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    renderError("El Id del Pokémon ingresado no existe. Intente con otro");
  }
};

const findPokemon = async (e) => {
  e.preventDefault();
  renderSpinner();
  const idPokemon = input.value;
  if (idPokemon === "") {
    renderError("No ingresaste ningún ID. Por favor ingresa uno.");
    return;
  }
  input.value = "";
  const pokemon = await getPokemon(idPokemon);
  renderPokemon(pokemon);
  localStorage.setItem("Pokemon", JSON.stringify(pokemon));
};

const renderPokemon = (data) => {
  const { name, height, weight, types } = data;
  const altura = height / 10;
  const peso = weight / 10;
  cardContainer.innerHTML = `
  <div class="card">
    <div class="img-card-container">
    <img src=${
      data.sprites.other.dream_world.front_default || data.sprites.front_default
    } } alt="${name}" class="img-card"/>
    </div>
    <div class="data-card">
      <p>Nombre: </p><span class="data-card-span">${name.toUpperCase()}</span>
      <p>Tipo:</p> <span class="data-card-span">${types[0].type.name.toUpperCase()}</span>
      <p>Altura: </p><span class="data-card-span">${altura} MTS.</span>
      <p>Peso: </p><span class="data-card-span">${peso} KG.</span>
    </div>
  </div>`;
};

const renderError = (errorMsg) => {
  cardContainer.innerHTML = `<p class="error-mge">${errorMsg}</p>`;
};

const renderSpinner = () => {
  cardContainer.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_Wezc{transform-origin:center;animation:spinner_Oiah .75s step-end infinite}@keyframes spinner_Oiah{8.3%{transform:rotate(30deg)}16.6%{transform:rotate(60deg)}25%{transform:rotate(90deg)}33.3%{transform:rotate(120deg)}41.6%{transform:rotate(150deg)}50%{transform:rotate(180deg)}58.3%{transform:rotate(210deg)}66.6%{transform:rotate(240deg)}75%{transform:rotate(270deg)}83.3%{transform:rotate(300deg)}91.6%{transform:rotate(330deg)}100%{transform:rotate(360deg)}}</style><g class="spinner_Wezc"><circle cx="12" cy="2.5" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/></g></svg>`;
};

const init = () => {
  form.addEventListener("submit", findPokemon);
  renderPokemon(pokemonLS);
};
init();
