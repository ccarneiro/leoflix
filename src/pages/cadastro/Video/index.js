import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import '../../../style-table.css';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import Loading from '../../../components/Loading';

const DivPosCadastroCategoria = styled.div`
  margin-top: -40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: flex-end;
`;

function CadastroVideo() {
  const VideoInicial = {
    titulo: '',
    url: '',
    categoria: '',
  };

  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function validaUrl(urlValue) {
    let url = urlValue;
    try {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `http://${url}`;
      }
      console.log('url', url);
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
      });
      console.log('valido', response);
    } catch (err) {
      console.log('invalido');
      return false;
    }
    console.log('return true');
    return true;
  }

  function validate(valores) {
    const err = {};
    if (!valores.titulo || !valores.titulo.length) {
      err.titulo = 'Titulo é obrigatório';
    } else if (valores.titulo && valores.titulo.length <= 2) {
      err.titulo = 'Titulo deve ter no mínimo 2 caracteres';
    }
    console.log('validaUrl(valores.url)', validaUrl(valores.url));
    if (!valores.url || !valores.url.length) {
      err.url = 'Url é obrigatório';
    } /* else if (!validaUrl(valores.url)) {
      err.url = 'Url é inválida';
    } */

    if (!valores.categoria || !valores.categoria.length) {
      err.categoria = 'Categoria é obrigatório';
    } else if (categorias && !categorias.find((c) => c.titulo === valores.categoria)) {
      err.categoria = 'Categoria inválida';
    }
    return err;
  }

  const {
    values: video, handleChange, clearForm, errors, showErrors, handleBlur, markTouched,
  } = useForm({ initialValues: VideoInicial, validate });

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasError = () => !!Object.keys(errors).length;

    if (hasError()) {
      markTouched();
      setTimeout(() => {
        window.alert('Existem erros no cadastro do vídeo!');
      });
      return;
    }

    const categoriaEscolhida = categorias.find((c) => c.titulo === video.categoria);

    if (!categoriaEscolhida) {
      // eslint-disable-next-line no-alert
      window.alert(`Não existe a categoria "${video.categoria}".`);
      return;
    }

    setLoading(true);
    videosRepository.create({
      titulo: video.titulo,
      url: video.url,
      categoriaId: categoriaEscolhida.id,
    })
      .then(() => videosRepository.getAll())
      .then((cats) => {
        setVideos(cats);
        clearForm();
      })
      .catch((err) => {
        console.error('Não foi possível gravar a vídeo', err);
      })
      .finally(() => {
        setLoading(false);
      });
    history.push(''); // Navega para a página;
  };

  useEffect(() => {
    setLoading(true);
    videosRepository.getAllWithCategoria()
      .then((cats) => {
        setVideos(cats);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Não foi possível carregar os vídeos', err);
      })
      .finally(() => {
        setLoading(false);
      });
    categoriasRepository.getAll()
      .then((listaCategorias) => setCategorias(listaCategorias))
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.err('Ocorreu um erro ao carregar as categorias', err);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de videos</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Título da Categoria:"
          type="text"
          name="titulo"
          value={video.titulo}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          showErrors={showErrors}
        />
        <FormField
          label="Url:"
          type="text"
          name="url"
          value={video.url}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          showErrors={showErrors}
        />
        <FormField
          label="Categoria:"
          type="text"
          name="categoria"
          value={video.categoria}
          onChange={handleChange}
          suggestions={categorias.map((categoria) => categoria.titulo)}
          onBlur={handleBlur}
          errors={errors}
          showErrors={showErrors}
        />
        <DivPosCadastroCategoria>
          <Link to="/cadastro/categoria">Cadastrar categoria</Link>
        </DivPosCadastroCategoria>

        <Button>Cadastrar</Button>
      </form>

      <Loading loading={loading} />

      {!loading && (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Url</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((vid) => (
            <tr key={vid.id}>
              <td>{vid.id}</td>
              <td>{vid.titulo}</td>
              <td>{vid.url}</td>
              <td>{vid.categoria.titulo}</td>
              <td />
            </tr> // eslint-disable-line
          ))}
        </tbody>
      </table>
      )}

      {/*
      <ul>
        {videos.map((vid) => (
          <li key={vid.id}>{vid.titulo}</li> // eslint-disable-line
        ))}
      </ul>
        */}

    </PageDefault>
  );
}

export default CadastroVideo;
