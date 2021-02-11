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
    // buttons setting
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-info');
    button.classList.add('text-capitalize');
    button.classList.add('btn-block')
    button.setAttribute('id','pokemon-info');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#pokemon-info');
    listPokemon.classList.add('group-list-item');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    // button click listener showing object in console
    button.addEventListener('click', function(){
      showDetails(pokemon)
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
        item.imageUrlFront = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = [];
        details.abilities.forEach(function (itemAbilities) {
          item.abilities.push(itemAbilities.ability.name);
        });
        }).catch(function (e) {
        console.error(e);
        hideLoading();
    });
  }

// loading screen
  function loading() {
    let loadingImg = $('<img />', {
      class: 'loading',
      src: 'img/pikachu.png',
      alt: 'loading image'
    });
    loadingImg.appendTo('.pokedex').addClass('mx-auto d-block')
  } 

// remove loading screen
  function hideLoading() {
    $('.loading').remove();
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
    let nameElement = $('<h1>' + pokemon.name + '</h1>').addClass('text-capitalize');
    // img in modal
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", pokemon.imageUrlFront).addClass('mx-auto d-block');
    // height 
    let heightElement = $('<p>' + 'Height: ' + pokemon.height*10 + ' cm</p>');
    // weight 
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight/10 + ' kg</p>');
    // pokemon abilities
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities.join(', ') + '</p>').addClass('text-capitalize');
    

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);

    // pokemon types stickers and header colour depending on type
    pokemon.types.forEach(function(pokemon) {
      let pokemonType = document.createElement('img');
      pokemonType.classList.add('type');

      switch(pokemon.type.name) {
        case "normal": pokemonType.setAttribute('src', 'img/normal.png'); 
        modalHeader.css("background-color", "#9c9c63"); 
        break;
        case "water": pokemonType.setAttribute('src', 'img/water.png');
        modalHeader.css("background-color", "#6890f0");
        break;
        case "electric": pokemonType.setAttribute('src', 'img/electric.png');
        modalHeader.css("background-color", "#FFFF00");
        break;
        case "fighting": pokemonType.setAttribute('src', 'img/fight.png');
        modalHeader.css("background-color", "#848484");
        break;
        case "ground": pokemonType.setAttribute('src', 'img/ground.png');
        modalHeader.css("background-color", "#996736");
        break;
        case "psychic": pokemonType.setAttribute('src', 'img/psychic.png');
        modalHeader.css("background-color", "#f0c91f");
        break;
        case "rock": pokemonType.setAttribute('src', 'img/rock.png');
        modalHeader.css("background-color", "#dbb54d");
        break;
        case "dark": pokemonType.setAttribute('src', 'img/dark.png');
        modalHeader.css("background-color", "#444a5c");
        break;
        case "steel": pokemonType.setAttribute('src', 'img/steel.png');
        modalHeader.css("background-color", "#8c8f96");
        break;
        case "fire": pokemonType.setAttribute('src', 'img/fire.png');
        modalHeader.css("background-color", "#f08030");
        break;
        case "grass": pokemonType.setAttribute('src', 'img/grass.png');
        modalHeader.css("background-color", "#78c850");
        break;
        case "ice": pokemonType.setAttribute('src', 'img/ice.png');
        modalHeader.css("background-color", "#42aeae");
        break;
        case "poison": pokemonType.setAttribute('src', 'img/poison.png');
        modalHeader.css("background-color", "#a890f0");
        break;
        case "flying": pokemonType.setAttribute('src', 'img/flying.png');
        break;
        case "bug": pokemonType.setAttribute('src', 'img/bug.png');
        modalHeader.css("background-color", "a8b820");
        break;
        case "ghost": pokemonType.setAttribute('src', 'img/ghost.png');
        modalHeader.css("background-color", "#644e88");
        break;
        case "dragon": pokemonType.setAttribute('src', 'img/dragon.png');
        break;
        case "fairy": pokemonType.setAttribute('src', 'img/fairy.png');
        modalHeader.css("background-color", "#e87890");
        break;
      }
      modalBody.append(pokemonType);
    })
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
