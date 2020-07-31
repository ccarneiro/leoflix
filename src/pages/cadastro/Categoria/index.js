import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import Ju from '../../../assets/img/juliana.png';
import Marcos from '../../../assets/img/mario.png';

const URL_API = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080/categorias'
  : 'https://leoflix-app.herokuapp.com/categorias';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadImage = styled.img`
  clip-path: circle(60px at center);
  animation: ${rotate} 2s linear infinite;
`;

function CadastroCategoria() {
  const categoriaInicial = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const setValue = (nome, valor) => {
    // console.log("event.target", event.target);
    setCategoria({ ...categoria, [nome]: valor });
  };

  function handleChange({ target }) {
    // let { getAttribute, value } = target;
    // getAttribute = getAttribute.bind(target);
    // console.log("getAttribute", getAttribute("nome"), "value", value);
    // setValue(getAttribute("name"), value);
    setValue(target.getAttribute('name'), target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(URL_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(categoria) })
      .then(() => {
        setLoading(true);
        return fetch(URL_API);
      })
      .then((response) => response.json())
      .then((cats) => {
        setLoading(false);
        console.log('cats', cats);
        setCategorias(cats);
        setCategoria(categoriaInicial);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });

    // setCategorias([...categorias, categoria]);
    // setCategoria(categoriaInicial);
  };

  useEffect(() => {
    // const URL = 'http://localhost:8080/categorias';
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://leoflix-app.herokuapp.com/categorias';
    setLoading(true);
    fetch(URL)
      .then(async (response) => {
        const categoriasList = await response.json();
        setTimeout(() => {
          setLoading(false);
          setCategorias([...categoriasList]);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria:</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Nome da Categoria:"
          type="text"
          name="nome"
          value={categoria.nome}
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

      {loading && (
        <div>
          <LoadImage src={Ju} alt="Ju" />
          <LoadImage src={Marcos} alt="Ju" />
        </div>
      )}

      <ul>
        {categorias.map((cat, i) => (
          <li key={`${cat.nome}${i}`}>{cat.nome}</li> // eslint-disable-line
        ))}
      </ul>
      <Link to="/">Ir para Home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
