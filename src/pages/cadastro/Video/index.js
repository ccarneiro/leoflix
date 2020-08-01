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
  const { values: video, handleChange, clearForm } = useForm(VideoInicial);
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

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
        />
        <FormField
          label="Url:"
          type="text"
          name="url"
          value={video.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria:"
          type="text"
          name="categoria"
          value={video.categoria}
          onChange={handleChange}
          suggestions={categorias.map((categoria) => categoria.titulo)}
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
