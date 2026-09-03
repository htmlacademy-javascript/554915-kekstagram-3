const photoList = document.querySelector('.pictures');
const photoItemTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getCommentsCount = (comments) => comments.length;

const createPhoto = ({id, url, likes, description, comments}) => {
  const photo = photoItemTemplate.cloneNode(true);
  photo.id = id;

  const image = photo.querySelector('.picture__img');
  image.src = url;
  image.alt = description;

  photo.querySelector('.picture__comments').textContent = getCommentsCount(comments);
  photo.querySelector('.picture__likes').textContent = likes;

  return photo;
};

const createPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const listItem = createPhoto(photo);

    fragment.append(listItem);
  });

  return fragment;
};

const renderPhotos = (photos) => {
  const items = createPhotos(photos);

  photoList.append(items);
};

export {renderPhotos};

