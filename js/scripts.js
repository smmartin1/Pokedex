// JavaScript Document

//Pokedex
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
					height: item.height,
					weight: item.weight,
					types: item.types,
					ability: item.ability,
					imageUrl: item.imageUrl,
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
			item.ability = details.abilities;
			item.weight = details.weight;
		}).catch(function (e) {
			console.error(e);
		});
  	}

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
		let pokemonList = $('.list-group');
		let listItem = $('<li></li>');
		listItem.addClass('group-list-item');

		let button = $('<button>' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + '</button>');
		button.attr('data-target', '#exampleModal');
		button.attr('data-toggle', 'modal');
		button.addClass('btn btn-primary');

		listItem.append(button);
		pokemonList.append(listItem);

		addListener(button, pokemon);
	}

	function addListener(button, pokemon) {
		button.on('click', function() {
			showDetails(pokemon);
		});
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});
	}

	function showModal(pokemon) {
		let modalTitle = $('.modal-title');
		let modalBody = $('.modal-body');

		modalTitle.empty();
		modalBody.empty();

		let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

		let pokemonHeight = $('<p>Height: ' + pokemon.height + '</p>');
		pokemonHeight.addClass('pokemon-info');

		let pokemonWeight = $('<p>Weight: ' + pokemon.weight + '</p>');
		pokemonWeight.addClass('pokemon-info');

		let pokemonTypes = $('<p>Types: ' + pokemon.types.map(item => item.type.name).join(', ') + '</p>');
		pokemonTypes.addClass('pokemon-info');

		let pokemonAbility = $('<p>Abilities: ' + pokemon.ability.map(item => item.ability.name).join(', ') + '</p>');
		pokemonAbility.addClass('pokemon-info');

		let pokemonImage = $('<img>');
		pokemonImage.attr('src', pokemon.imageUrl);
		pokemonImage.attr('alt', 'Image of ' + name);
		pokemonImage.addClass('pokemon-image');

		modalTitle.append(name);
		modalBody.append(pokemonHeight);
		modalBody.append(pokemonWeight);
		modalBody.append(pokemonTypes);
		modalBody.append(pokemonAbility);
		modalBody.append(pokemonImage);	
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		details: showDetails,
		load: loadList,
		loadDetails: loadDetails,
	};
})();

pokemonRepository.load().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
