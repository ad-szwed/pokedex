// IIFE

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

  // display pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
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

// creating pokemon list
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-info');
    button.setAttribute('id','pokemon-info');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#pokemon-info');    
    listPokemon.classList.add('group-list-item');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    
    // button click listener showing object in console
    button.addEventListener('click', function(){
      showDetails(pokemon)
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
        item.id = details.id;
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
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

// MODAL
  function showModal(pokemon){
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    
    // clear existing modal content
    modalTitle.empty();
    modalBody.empty();

    // name element inside modal
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    // img in modal
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    // height 
    let heightElement = $('<p>' + "Height: " + pokemon.height + '</p>');
    // weight 
    let weightElement = $('<p>' + "Weight: " + pokemon.weight + '</p>');
    // pokemon types
    let typesElement = $('<p>' + "Type: " + pokemon.types + '</p>');
    // pokemon abilities
    let abilitiesElement = $('<p>' + "Abilities: " + pokemon.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

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
