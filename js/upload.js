const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'avif', 'webp'];

const uploadInputFile = document.querySelector('.img-upload__input');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');
const thumbnails = document.querySelectorAll('.effects__preview');

const getUrlFile = (file) => URL.createObjectURL(file);

const hasMatchFileFormat = (format) => FILE_TYPES.some((it) => format.endsWith(it));

const updatePreviewImage = (file) => {
  uploadPreviewImage.src = getUrlFile(file);
};

const resetUploadFile = () => {
  uploadInputFile.value = '';
};

const updateThumbnailImage = (thumbnail, file) => {
  thumbnail.style.backgroundImage = `url(${getUrlFile(file)})`;
};

const updateThumbnails = (file) => thumbnails.forEach((thumbnail) => updateThumbnailImage(thumbnail, file));

const getFileName = (file) => file.name.toLowerCase();
const getFile = () => uploadInputFile.files[0];

const initUploadFile = () => {
  const file = getFile();
  const fileName = getFileName(file);

  if (hasMatchFileFormat(fileName)) {
    updatePreviewImage(file);
    updateThumbnails(file);
  }
};

export {initUploadFile, resetUploadFile};
