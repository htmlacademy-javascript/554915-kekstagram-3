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


const COMMENTS_COUNT_PER_STEP = 5;
let renderedCommentsCount = 0;

let slicedComments = null;

const isShowLoadMoreButton = () => slicedComments.length > COMMENTS_COUNT_PER_STEP;
const isHideLoadMoreButton = () => renderedCommentsCount >= slicedComments.length;

const hideLoadMoreButton = () => loadMoreButton.classList.add('hidden');
const showLoadMoreButton = () => loadMoreButton.classList.remove('hidden');

const getCommentsCount = () => slicedComments.length;
const updateCommentsCount = (shown) => (commentsCountShown.textContent = shown);

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

const renderComments = (from, to) => {
  const commentItems =
    slicedComments
      .slice(from, to)
      .map((comment) => getCommentTemplate(comment))
      .join('');

  commentsList.insertAdjacentHTML(RENDER_POSITION.BEFOREEND, commentItems);
};

const clearComments = () => (commentsList.innerHTML = '');

const loadMoreButtonHandler = () => {
  const nextCommentsCount = Math.min(slicedComments.length, renderedCommentsCount + COMMENTS_COUNT_PER_STEP);
  renderComments(renderedCommentsCount, nextCommentsCount);

  renderedCommentsCount = nextCommentsCount;

  updateCommentsCount(renderedCommentsCount);

  if (isHideLoadMoreButton()) {
    hideLoadMoreButton();
  }
};

const displayCommentsCount = (shown) => {
  commentsCountShown.textContent = shown;
  commentsCountTotal.textContent = getCommentsCount();
};

const fillFullPhoto = ({url, likes, description, comments}) => {
  slicedComments = comments.slice();

  const nextCommentsCount = Math.min(slicedComments.length, COMMENTS_COUNT_PER_STEP);

  photoImage.src = url;
  photoImage.alt = description;
  photoDescription.textContent = description;
  likesCount.textContent = likes;

  displayCommentsCount(nextCommentsCount);

  renderComments(0, nextCommentsCount);
  renderedCommentsCount = nextCommentsCount;

  loadMoreButton.addEventListener('click', loadMoreButtonHandler);

  if (isShowLoadMoreButton()) {
    showLoadMoreButton();
  }
};

const clearFullPhoto = () => {
  photoImage.src = '';
  photoImage.alt = '';
  photoDescription.textContent = '';
  likesCount.textContent = '';
  commentsCountTotal.textContent = '';

  commentsList.innerHTML = '';

  clearComments();
  hideLoadMoreButton();
};

export {fillFullPhoto, clearFullPhoto};
