import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';
import Loading from '../../../components/Loading';

function CadastroCategoria() {
  const categoriaInicial = {
    titulo: '',
    descricao: '',
    cor: '#000000',
  };
  const { values: categoria, handleChange, clearForm } = useForm(categoriaInicial);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    categoriasRepository.create(categoria)
      .then(() => categoriasRepository.getAll())
      .then((cats) => {
        setCategorias(cats);
        clearForm();
      })
      .catch((err) => {
        console.error('Não foi possível gravar a categoria', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    categoriasRepository.getAll()
      .then((cats) => {
        setCategorias(cats);
      })
      .catch((err) => {
        console.error('Não foi possível carregar as categorias', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria:</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Título da Categoria:"
          type="text"
          name="titulo"
          value={categoria.titulo}
          onChange={handleChange}
        />
        <FormField
          label="Descrição da Categoria:"
          type="textarea"
          name="descricao"
          value={categoria.descricao}
          onChange={handleChange}
        />
        <FormField
          label="Cor:"
          type="color"
          name="cor"
          value={categoria.cor}
          onChange={handleChange}
        />
        <Button>Cadastrar</Button>
      </form>

      <Loading loading={loading} />

      {!loading && (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Descricao</th>
            <th>cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.titulo}</td>
              <td>{cat.descricao}</td>
              <td>{cat.cor}</td>
              <td />
            </tr> // eslint-disable-line
          ))}
        </tbody>
      </table>
      )}

      {/*
      <ul>
        {categorias.map((cat) => (
          <li key={cat.id}>{cat.titulo}</li> // eslint-disable-line
        ))}
      </ul>
        */}
      <Link to="/">Ir para Home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
