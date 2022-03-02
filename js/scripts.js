// JavaScript Document

//Pokedex
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon';

	function add(pokemon) {
		if (
			typeof pokemon === 'object' &&
			'name' in pokemon &&
			'detailsUrl' in pokemon
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

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			console.log(pokemon);
		});
	}
	
	function getAll() {
		return pokemonList;
	}
	
	function loadList() {
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
		}).catch(function (e) {
			console.error(e);
		})
	}
	
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		});
  }

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		details: showDetails,
		load: loadList,
		loadDetails: loadDetails
	};
})();

pokemonRepository.load().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});

