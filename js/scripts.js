// pokemons list build of name, height, type

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    

  // adding pokemons to the repository
  function add(pokemon){    
      return (typeof pokemon === 'object' ? 
      pokemonList.push(pokemon) : "error")    
  }

  //show pokemons list
  function getAll(){
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // adding buttons for UI
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button')
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    
    // button click listener showing object in console
    button.addEventListener('click', function(event){
      showDetails(pokemon)
    })
  }

  // fetching pokemon list from the API
  function loadList() {
    loading();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);   
      });
      hideLoading();
    }).catch(function (e) {
      console.error(e);
      hideLoading();
    })
  }

  // listing details of a selected pokemon
  function loadDetails(item) {
    loading();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoading();
    }).catch(function (e) {
        console.error(e);
        hideLoading();
    });
  }

  // loading screen
  function loading() {
    let loadingImg = document.createElement('img');
    loadingImg.src = 'img/pikachu.png';
    loadingImg.classList.add('loading');
    document.querySelector('.pokedex').appendChild(loadingImg);
  } 

  // remove loading screen
  function hideLoading() {
    let loadingImg = document.querySelector('.loading');
    loadingImg.parentElement.removeChild(loadingImg);
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails

  }
})();

// display pokemons
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});