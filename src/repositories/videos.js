import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND_TOP}/videos`;
const DELAY = 2000;

function getAll() {
  return fetch(`${URL_VIDEOS}`)
    .then(async (response) => {
      if (response.ok) {
        const videos = await response.json();
        // return categorias;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(videos);
          }, DELAY);
        });
      }
      throw new Error('Não foi possível pegar os dados :(');
    });
}
function getAllWithCategoria() {
  return fetch(`${URL_VIDEOS}?_expand=categoria`)
    .then(async (response) => {
      if (response.ok) {
        const videos = await response.json();
        // return categorias;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(videos);
          }, DELAY);
        });
      }
      throw new Error('Não foi possível pegar os dados :(');
    });
}

function create(video) {
  return fetch(URL_VIDEOS,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    })
    .then(async (response) => {
      if (response.ok) {
        const c = await response.json();
        return c;
      }
      throw new Error('Não foi possível gravar os dados :(');
    });
}

export default {
  getAll,
  getAllWithCategoria,
  create,
};
