// pokemons list build of name, height, type
let pokemonList = [
{name: 'Bulbasaur', height: 0.7, type: ['grass','posion']},
{name: 'Weedle', height: 0.3, type: ['bug','posion']},
{name: 'Nidoqueen', height: 1.3, type: ['ground','posion']}
];
// mock list for the input excercise
let pokemonList2 =[
  {name: 'Bulbasaurxxxxx', height: 0.7, type: ['xxxxx','xxxx']},
  {name: 'Weedlexxxxx', height: 0.3, type: ['xxxxx','xxxxx']},
  {name: 'Nidoqueenxxxxx', height: 1.3, type: ['xxxxx','xxxxx']}
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

// Excercise in FUNCTION INPUTS to inspect different arrays !* CRITICAL *!          
function show(list){
  for (let i=0; i < list.length; i++){
    document.write(
      "<p>" + list[i].name + "</p>"
    );
  } document.write("<br>========= END OF LIST =========")
}

// Print pokemon lists
show(pokemonList);
show(pokemonList2);

// FUNCTION DECLARATION, Simple dividing fun; dividing by zero restricted
function divide(dividend, divisor){
  if (divisor === 0){
    return "are you crazy? you'll destroy the universe!"
  }else {
    return (dividend/divisor);
  }
}

//FUNCTION EXPRESSION = function as variable, semicolon at the end, not hoisted
let add = function(number1, number2){
  return number1+number2
};

//THIS keyword !* CRITICAL *!
let dog = {
  type: 'pug',
  age: 3,
  name: 'Margot',
  speak: function() {
    console.log('Wooff! ' + this.name);
  }
};
dog.speak();

//THIS keyword example 2
let person = { 
  name : "John", 
  age : 31, 
  logInfo : function() { 
      document.write(this.name + " is " + this.age + " years old."); 
  } 
} 
 // logs John is 31 years old. 
person.logInfo();
/*
Arrow functions, ES6, not yet recommended in client-side programming without build tools
let addTwo = number => number + 2;
The example above is the same as writing this:
let addTwo = function(number){ return number + 2 };  
*/

/* Predefined Functions
alert('alert') dialog-type functions POPUP
prompt() dialog-type functions POPUP
confirm('Do you accept?') dialog-type functions POPUP
typeof() CHECK TYPE OF WHAT'S INSIDE THE PARENTHESIS
console.warn('Warning!') YELLOW MARK IN THE CONSOLE
console.error('Error!') RED MARK IN THE CONSOLE
setTimeout() TIMER IN ms
*/

