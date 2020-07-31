import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const categoriaInicial = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [categorias, setCategorias] = useState([{ nome: 'Teste' }]);

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
    setCategorias([...categorias, categoria]);
    setCategoria(categoriaInicial);
  };

  useEffect(() => {
    const URL = 'http://localhost:8080/categorias';
    fetch(URL)
      .then(async (response) => {
        const categoriasList = await response.json();
        setCategorias([...categoriasList]);
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
