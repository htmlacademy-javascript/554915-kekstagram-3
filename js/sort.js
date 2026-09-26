import { renderPhotos, removePhotos } from './photos';
import { debounce } from './util';

const MAX_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const sort = document.querySelector('.img-filters');
const sortForm = sort.querySelector('.img-filters__form');
let activeButton = sortForm.querySelector('.img-filters__button--active');

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
const isActiveButton = (element) => element.classList.contains('img-filters__button--active');

const resetActiveButton = () => {
  activeButton.classList.remove('img-filters__button--active');
  activeButton = null;
};

const setActiveButton = (element) => {
  activeButton = element;
  activeButton.classList.add('img-filters__button--active');
};

const initSort = (photos) => {
  sort.classList.remove('img-filters--inactive');

  sortForm.addEventListener('click', (evt) => {
    const target = evt.target;

    if (!isButtonClicked(target) || isActiveButton(target)) {
      return;
    }

    resetActiveButton();
    setActiveButton(target);

    const sortType = target.id;
    const filteredPhotos = sortTypeToFunction[sortType](photos);

    debouncedRender(filteredPhotos);
  });
};

export {initSort};
