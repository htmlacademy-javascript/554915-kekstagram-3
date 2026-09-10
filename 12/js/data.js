import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomInteger } from './util';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Закат на берегу океана в тёплых пастельных тонах.',
  'Утренний кофе на уютном деревянном балконе.',
  'Забавный рыжий кот, который увлечённо охотится за лазерной указкой.',
  'Огни ночного мегаполиса сквозь капли дождя на стекле.',
  'Старинная пустая улочка где-то в самом сердце Европы.',
  'Величественные заснеженные горные вершины на фоне ясного неба.',
  'Яркий осенний ковёр из опавших кленовых листьев в парке.',
  'Шумная дружеская вечеринка в тёплом свете гирлянд.'
];

const NAMES = [
  'Александр',
  'Анна',
  'Максим',
  'Елена',
  'Дмитрий',
  'Мария',
  'Артем',
  'Ольга'
];

const PHOTO_CARD_COUNT = 25;

const COMMENTS_LIMIT = {
  MIN: 0,
  MAX: 30,
};

const LIKES_LIMIT = {
  MIN: 20,
  MAX: 150,
};

const AVATAR = {
  MIN: 1,
  MAX: 6,
};

const getUserName = () => getRandomArrayElement(NAMES);
const getLikesCount = () => getRandomInteger(LIKES_LIMIT.MIN, LIKES_LIMIT.MAX);
const getDescription = () => getRandomArrayElement(DESCRIPTIONS);

const getUserAvatar = () => `img/avatar-${getRandomInteger(AVATAR.MIN, AVATAR.MAX)}.svg`;
const getUserComment = () => Math.random() < 0.5 ? `${getRandomArrayElement(COMMENTS)}` : `${getRandomArrayElement(COMMENTS)} ${getRandomArrayElement(COMMENTS)}`;
const createCounter = () => {
  let count = 1;

  return () => count++;
};

const getNextPhoto = createCounter();

const createComment = () => ({
  id: nanoid(),
  avatar: getUserAvatar(),
  message: getUserComment(),
  name: getUserName(),
});

const createComments = () => Array.from({length: getRandomInteger(COMMENTS_LIMIT.MIN, COMMENTS_LIMIT.MAX)}, createComment);

const createCard = () => ({
  id: nanoid(),
  url: `photos/${getNextPhoto()}.jpg`,
  likes: getLikesCount(),
  description: getDescription(),
  comments: createComments(),
});

const createCards = () => Array.from({length: PHOTO_CARD_COUNT}, createCard);

export {createCards};
