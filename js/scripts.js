// pokemons list build of name, height, type

let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass','posion']},
    {name: 'Weedle', height: 0.3, type: ['bug','posion']},
    {name: 'Nidoqueen', height: 1.3, type: ['ground','posion']}
  ];
    

  // valid keys instruction for add(pokemon)
  const validKeys = ['name', 'height', 'type']
  function check(obj, arr) {
    return Object.keys(obj).every(e => arr.includes(e));
  }

  // adding pokemons to the repository
  function add(pokemon){    
      return (typeof pokemon === 'object' &&  // check if input is object AND
      pokemon !== null && // not empty AND
      check(pokemon, validKeys) == true && // valid keys are used AND
      pokemonList.indexOf(pokemon.name) !== -1 ? //  not in the pokemonList already
      pokemonList.push(pokemon) : "error, invalid or non-unique input, please follow this format \n {name: 'Bulbasaur', height: 0.7, type: ['grass','posion']}")    
  }

  function showDetails(pokemon){
    console.log(pokemon)
  };

  // adding buttons for UI
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button')
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    
    // button click listener
    button.addEventListener('click', function(event){
      showDetails(pokemon.name)
    })
  }

    //show pokemons list
  function getAll(){
    return pokemonList;
  }

  // add new pokemons to the array
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  }
})();

// display pokemons
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon)
});

