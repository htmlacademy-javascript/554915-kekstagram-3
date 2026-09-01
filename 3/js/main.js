import { nanoid } from 'nanoid';

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
const USER_COMMENT_COUNT = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUserName = () => getRandomArrayElement(NAMES);
const getLikesCount = () => getRandomInteger(20, 150);
const getDescription = () => getRandomArrayElement(DESCRIPTIONS);

const getUserAvatar = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;
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

const createComments = () => Array.from({length: getRandomInteger(0, USER_COMMENT_COUNT)}, createComment);

const createCard = () => ({
  id: nanoid(),
  url: `photos/${getNextPhoto()}.jpg`,
  likes: getLikesCount(),
  description: getDescription(),
  comments: createComments(),
});

const createCards = () => Array.from({length: PHOTO_CARD_COUNT}, createCard);
const cards = createCards();

// eslint-disable-next-line no-console
console.log(cards);
