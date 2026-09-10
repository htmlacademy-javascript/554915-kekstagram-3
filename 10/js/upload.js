const uploadInputFile = document.querySelector('.img-upload__input');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'avif', 'webp'];

const hasMatchFileFormat = (format) => FILE_TYPES.some((it) => format.endsWith(it));
const updatePreviewImage = (src) => (uploadPreviewImage.src = URL.createObjectURL(src));
const resetUploadFile = () => {
  uploadInputFile.value = '';
  uploadPreviewImage.src = '';
};

const getFileName = (file) => file.name.toLowerCase();
const getFile = () => uploadInputFile.files[0];

const initUploadFile = () => {
  const file = getFile();
  const fileName = getFileName(file);

  if (hasMatchFileFormat(fileName)) {
    updatePreviewImage(file);
  }
};

export {initUploadFile, resetUploadFile};
