// JavaScript Document

//Pokedex
let pokemonRepository = (function () {
	//Height is in inches
	let pokemonList = [
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

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		return pokemonList;
	}

	return {
		add: add,
		getAll: getAll
	};
})();

pokemonRepository.getAll().forEach(function(pokemon) {
	document.write(pokemon.name + ' (Height: ' + pokemon.height + ' inches)');
	
	//Threshold is subject to change
	if (pokemon.height > 40){
		document.write(' - Wow, that\'s big!');
	}
	
	document.write('<br>');
});