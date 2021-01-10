const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const movies = [];
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = 'block';
	} else {
		entryTextSection.style.display = 'none';
	}
};

const closeMovieDeletionModal = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = movieId => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	movies.splice(movieIndex, 1);
	const rootList = document.getElementById('movie-list');
	rootList.children[movieIndex].remove();
	closeMovieDeletionModal();
	updateUI();
};

const startDeleteMovieHandler = movieId => {
	deleteMovieModal.classList.add('visible');
	toggleBackdrop();

	const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
	let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

	cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
	// confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId));
	confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
	confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
	cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
	confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};


const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement('li');
	newMovieElement.className = 'movie-element';
	newMovieElement.innerHTML = `
	<div class="movie-elemnt__image">
		<img src="${imageUrl}" alt="${title}">
	</div>
	<div class="movie-element__info">
		<h2>${title}</h2>
		<p>${rating}/5 stars</p>
	</div>
	`;
	newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
	const rootList = document.getElementById('movie-list');
	rootList.append(newMovieElement);
};

const toggleBackdrop = ()=> {
	backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
	addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
	addMovieModal.classList.add('visible');
	toggleBackdrop();
};

const clearMovieInputs = () => {
	for (let key of userInputs) {
		key.value = '';
	}
};

const cancelAddMovieHandler = () => {
	closeMovieModal();
	toggleBackdrop();
	clearMovieInputs();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;

	if (titleValue.trim() === '' ||
		imageUrlValue.trim() === '' ||
		ratingValue.trim() === '' ||
		+ratingValue < 1 ||
		+ratingValue > 5) {
		alert("Enter please valid value (rating between 1 and 5)");
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue
	};

	movies.push(newMovie);
	closeMovieModal();
	toggleBackdrop();
	clearMovieInputs();
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
	updateUI();
};

const backdropClickHandler = () => {
	closeMovieModal();
	closeMovieDeletionModal();
	clearMovieInputs();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
