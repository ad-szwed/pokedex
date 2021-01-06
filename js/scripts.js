//pokemons list build of name, height, type
let pokemonList = [
{name: 'Bulbasaur', height: 0.7, type: ['grass','posion']},
{name: 'Weedle', height: 0.3, type: ['bug','posion']},
{name: 'Nidoqueen', height: 1.3, type: ['ground','posion']}
];

// List all pokemons, emphasis on height
for (let i=0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1) {
    document.write(
      pokemonList[i].name + "'s height is " + pokemonList[i].height + "m" + " - big pokemon" + "<br>" )
  }else { 
    document.write(
      pokemonList[i].name + "'s height is " + pokemonList[i].height + "m" + " - small pokemon" + "<br>") }
};
