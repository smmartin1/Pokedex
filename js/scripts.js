// JavaScript Document

//Pokedex
let pokemonList = [
	//Height is in inches
	{
		name: 'Bulbasaur',
		height: 28,
		types: ['Grass', 'Poison']
	},
	
	{
		name: 'Quagsire',
		height: 55,
		types: ['Water', 'Ground']
	},
	
	{
		name: 'Latias',
		height: 55,
		types: ['Dragon', 'Psychic']
	},
	
	{
		name: 'Bidoof',
		height: 20,
		types: ['Normal']
	}
];

for(let i = 0; i < pokemonList.length; i++) {
	document.write(pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ' inches)');
	
	//Threshold is subject to change
	if (pokemonList[i].height > 40){
		document.write(' - Wow, that\'s big!');
	}
	
	document.write('<br>');
}