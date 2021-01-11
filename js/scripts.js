// pokemons list build of name, height, type
let pokemonList = [
{name: 'Bulbasaur', height: 0.7, type: ['grass','posion']},
{name: 'Weedle', height: 0.3, type: ['bug','posion']},
{name: 'Nidoqueen', height: 1.3, type: ['ground','posion']}
];

//forEach iteration to show if pokemon is big or small
pokemonList.forEach(function(pokemon){
  if(pokemon.height > 1){
    document.write('<p>' + pokemon.name + '\'s height is ' + pokemon.height + 'm - '  + "that's a big boy!</p>")
  }else {
    document.write('<p>' + pokemon.name + '\'s height is ' + pokemon.height + 'm - '  + "that's a small boy!</p>")
  } 
});