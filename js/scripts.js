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
		if (
			typeof pokemon === 'object' &&
			'name' in pokemon &&
			'height' in pokemon &&
			'types' in pokemon
		){
			pokemonList.push(pokemon);
		} else {
			console.log('Pokemon is not correct');
		}		
	}
	
	function addListItem(pokemon){
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class');
		
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
		
		addListener(button, pokemon);
	}
	
	function addListener(button, pokemon) {
		button.addEventListener('click', function() {
			showDetails(pokemon);
		});
	}

	function showDetails(pokemon){
		console.log(pokemon.name, pokemon.height, pokemon.types);
	}
	
	function getAll() {
		return pokemonList;
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		details: showDetails
	};
})();

pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon);
});

/*
pokemonRepository.getAll().forEach(function(pokemon) {
	document.write(pokemon.name + ' (Height: ' + pokemon.height + ' inches)');
	
	//Threshold is subject to change
	if (pokemon.height > 40){
		document.write(' - Wow, that\'s big!');
	}
	
	document.write('<br>');
});
*/