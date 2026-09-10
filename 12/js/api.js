
const URL = {
  GET: 'https://32.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://32.javascript.htmlacademy.pro/kekstagram',
};

const getData = (onSuccess, onError) => {
  fetch(URL.GET)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((photos) => onSuccess(photos))
    .catch(onError);
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    URL.POST,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      onSuccess();
    })
    .catch(onError);
};


export {getData, sendData};
