import config from '../config';

const URL_CATEGORIAS = `${config.URL_BACKEND_TOP}/categorias`;
const DELAY = 2000;

function getAll() {
  return fetch(`${URL_CATEGORIAS}`)
    .then(async (response) => {
      if (response.ok) {
        const categorias = await response.json();
        // return categorias;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(categorias);
          }, DELAY);
        });
      }
      throw new Error('Não foi possível pegar os dados :(');
    });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIAS}?_embed=videos`)
    .then(async (response) => {
      if (response.ok) {
        const categorias = await response.json();
        return categorias;
      }
      throw new Error('Não foi possível pegar os dados :(');
    });
}

function create(categoria) {
  return fetch(URL_CATEGORIAS,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
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
  getAllWithVideos,
  create,
};
