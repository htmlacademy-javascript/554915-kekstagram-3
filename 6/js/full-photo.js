import { RENDER_POSITION } from './util';

const modal = document.querySelector('.big-picture');
const photoImage = modal.querySelector('.big-picture__img img');
const photoDescription = modal.querySelector('.social__caption');
const likesCount = modal.querySelector('.likes-count');

const commentsList = modal.querySelector('.social__comments');
const commentsCount = modal.querySelector('.social__comment-count');
const commentsCountShown = commentsCount.querySelector('.social__comment-shown-count');
const commentsCountTotal = commentsCount.querySelector('.social__comment-total-count');
const loadMoreButton = modal.querySelector('.comments-loader');


const getCommentsCount = (comments) => comments.length;

const getCommentTemplate = ({avatar, message, name}) => (
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`
);

const createComments = (comments) => (
  comments
    .map((comment) => getCommentTemplate(comment))
    .join('')
);

const renderComments = (comments) => {
  const commentItems = createComments(comments);

  commentsList.insertAdjacentHTML(RENDER_POSITION.BEFOREEND, commentItems);
};

const hideCommentsCountPanel = () => {
  commentsCount.classList.add('hidden');
  loadMoreButton.classList.add('hidden');
};

const showCommentsCountPanel = () => {
  commentsCount.classList.add('hidden');
  loadMoreButton.classList.add('hidden');
};

const fillFullPhoto = ({url, likes, description, comments}) => {
  photoImage.src = url;
  photoImage.alt = description;
  photoDescription.textContent = description;
  likesCount.textContent = likes;
  commentsCountTotal.textContent = getCommentsCount(comments);

  hideCommentsCountPanel();

  renderComments(comments);
};

const clearFullPhoto = () => {
  commentsCount.classList.add('hidden');
  loadMoreButton.classList.add('hidden');

  photoImage.src = '';
  photoImage.alt = '';
  photoDescription.textContent = '';
  likesCount.textContent = '';
  commentsCountTotal.textContent = '';

  commentsCountShown.textContent = '';
  commentsCountTotal.textContent = '';

  commentsList.innerHTML = '';

  showCommentsCountPanel();
};

export {fillFullPhoto, clearFullPhoto};
