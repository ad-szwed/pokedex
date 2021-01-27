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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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

// MODAL
  let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

 
// close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('button2');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

// Pokemon name
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

// Pokemon img
    let imgElement = document.createElement('img')
    imgElement.src = pokemon.imageUrl
    
// Pokemon height
    let heightElement = document.createElement('p');
    heightElement.innerText = "Height: " + pokemon.height

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imgElement);
    modal.appendChild(heightElement);
    modalContainer.appendChild(modal);


    modalContainer.classList.add('is-visible');

  // MODAL OFF
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
    
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });
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
