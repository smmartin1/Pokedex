// JavaScript Document

//Pokedex
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon';
	let modalContainer = document.querySelector('#modal-container');

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
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
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
			showModal(pokemon);
		});
	}

	function showModal(pokemon) {
		modalContainer.innerHTML = '';
		modalContainer.classList.add('is-visible');

		let modal = document.createElement('div');
		modal.classList.add('modal');

		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);

		let titleElement = document.createElement('h1');
		titleElement.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
		titleElement.classList.add('pokemon-name');

		let contentElement = document.createElement('p');
		contentElement.innerText = 'Height: ' + pokemon.height;
		contentElement.classList.add('pokemon-info');

		let pokemonImage = document.createElement('img');
		pokemonImage.src = pokemon.imageUrl;
		pokemonImage.classList.add('pokemon-image');

		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		modal.appendChild(pokemonImage);
		modal.appendChild(closeButtonElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}

	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	window.addEventListener('keydown', (e) => {
  		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	modalContainer.addEventListener('click', (e) => {
		let target = e.target;

		if (target === modalContainer) {
			hideModal();
		}
	});

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
