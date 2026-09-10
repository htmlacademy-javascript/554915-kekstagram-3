import { renderPhotos, removePhotos } from './photos';
import { debounce } from './util';

const sort = document.querySelector('.img-filters');
const sortForm = sort.querySelector('.img-filters__form');

const MAX_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const compareComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
const shufflePhotos = () => Math.random() - 0.5;

const sortTypeToFunction = {
  'filter-default': (photos) => photos.slice(),
  'filter-random': (photos) => photos.slice().sort(shufflePhotos).slice(0, MAX_PHOTOS_COUNT),
  'filter-discussed': (photos) => photos.slice().sort(compareComments),
};

const debouncedRender = debounce((photos) => {
  removePhotos();
  renderPhotos(photos);
}, RERENDER_DELAY);

const isButtonClicked = (element) => element.closest('.img-filters__button');

const resetActiveButton = () => sortForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
const setActiveButton = (element) => element.classList.add('img-filters__button--active');

const initSort = (photos) => {
  sort.classList.remove('img-filters--inactive');

  sortForm.addEventListener('click', (evt) => {
    const target = evt.target;

    if (!isButtonClicked(target)) {
      return;
    }

    resetActiveButton();
    setActiveButton(target);

    const sortType = evt.target.id;
    const filteredPhotos = sortTypeToFunction[sortType](photos);

    debouncedRender(filteredPhotos);
  });
};

export {initSort};
