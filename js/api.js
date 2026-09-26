const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response;
    })
    .catch(() => {
      throw new Error();
    });

const getData = (onSuccess, onError) => {
  load(Route.GET_DATA)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);
};

const sendData = (onSuccess, onError, body, onFinally) => {
  load(Route.SEND_DATA, Method.POST, body)
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
};

export {getData, sendData};
