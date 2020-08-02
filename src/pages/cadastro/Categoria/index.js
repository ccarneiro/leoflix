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

  function validate(valores) {
    const err = {};
    if (!valores.titulo || !valores.titulo.length) {
      err.titulo = 'Titulo é obrigatório';
    } else if (valores.titulo && valores.titulo.length <= 2) {
      err.titulo = 'Titulo deve ter no mínimo 2 caracteres';
    }
    if (!valores.cor) {
      err.cor = 'Cor é obrigatório';
    }
    return err;
  }

  const {
    values: categoria, handleChange, clearForm, errors, showErrors, handleBlur, markTouched,
  } = useForm({ initialValues: categoriaInicial, validate });
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasError = () => !!Object.keys(errors).length;

    if (hasError()) {
      markTouched();
      setTimeout(() => {
        window.alert('Existem erros no cadastro de categoria!');
      });
      return;
    }

    setLoading(true);
    categoriasRepository.create(categoria)
      .then(() => categoriasRepository.getAll())
      .then((cats) => {
        setCategorias(cats);
        clearForm();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
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
          onBlur={handleBlur}
          errors={errors}
          showErrors={showErrors}
        />
        <FormField
          label="Descrição da Categoria:"
          type="textarea"
          name="descricao"
          value={categoria.descricao}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          showErrors={showErrors}
        />
        <FormField
          label="Cor:"
          type="color"
          name="cor"
          value={categoria.cor}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          showErrors={showErrors}
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
              <td style={{ backgroundColor: cat.cor }} />
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
