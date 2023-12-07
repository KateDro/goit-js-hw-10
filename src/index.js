import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import {
  createInfoCardMarkup,
  createSelectOptionsMarkup,
} from './js/markupHelpers';

const refs = {
  userSelect: document.getElementById('single-select'),
  loader: document.getElementById('loader'),
  catInfo: document.querySelector('.cat-info'),
};

const selectWrapper = refs.userSelect.closest('.select-wrapper');

refs.userSelect.innerHTML = '<option data-placeholder="true"></option>';
fetchBreeds()
  .then(breeds => {
    selectWrapper.classList.remove('is-hidden');
    const options = breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
    createSelectOptionsMarkup(refs.userSelect, options);

    new SlimSelect({
      select: refs.userSelect,
      settings: {
        placeholderText: 'What breed of cat are you looking for?',
      },
    });
  })
  .catch(error => {
    console.error('Помилка під час запиту:', error);
    Notify.failure('Oops! Something went wrong! Try reloading the page');
    selectWrapper.classList.add('is-hidden');
  })
  .finally(() => {
    refs.loader.classList.add('is-hidden');
  });

refs.userSelect.addEventListener('change', handleSearch);
function handleSearch(event) {
  const breedId = event.target.value;
  refs.loader.classList.remove('is-hidden');
  refs.catInfo.innerHTML = '';
  fetchCatByBreed(breedId)
    .then(data => {
      refs.catInfo.classList.remove('is-hidden');
      data.length > 0
        ? createInfoCardMarkup(refs.catInfo, data[0])
        : Notify.failure(
            "Sorry, but the information on this breed of cats is being clarified. We're sure all cats are amazing. Please choose another breed"
          );
    })
    .catch(error => {
      console.error('Помилка під час запиту:', error);
      Notify.failure("'Oops! Something went wrong! Try reloading the page'");
    })
    .finally(() => {
      refs.loader.classList.add('is-hidden');
    });
}
