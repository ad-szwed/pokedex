// pokemons list build of name, height, type
let pokemonList = [
{name: 'Bulbasaur', height: 0.7, type: ['grass','posion']},
{name: 'Weedle', height: 0.3, type: ['bug','posion']},
{name: 'Nidoqueen', height: 1.3, type: ['ground','posion']}
];

// List all pokemons, emphasis on height
for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 1) {
    document.write(
      "<p>" + pokemonList[i].name + "'s height is " + pokemonList[i].height + "m" + " - big pokemon" + "</p>")
  }else { 
    document.write(
      "<p>" + pokemonList[i].name + "'s height is " + pokemonList[i].height + "m" + " - small pokemon" + "</p>")
    }
} document.write("<br>========= END OF LIST =========")
