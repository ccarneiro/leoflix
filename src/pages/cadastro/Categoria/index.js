import React, { useState } from "react";
import PageDefault from "../../../components/PageDefault";
import { Link } from "react-router-dom";
import FormField from "../../../components/FormField";

function CadastroCategoria() {
  const categoriaInicial = {
    nome: "",
    descricao: "",
    cor: "#000000",
  };
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [categorias, setCategorias] = useState([{ nome: "Teste" }]);

  const setValue = (nome, valor) => {
    // console.log("event.target", event.target);
    setCategoria({ ...categoria, [nome]: valor });
  };

  function handleChange({ target }) {
    // let { getAttribute, value } = target;
    // getAttribute = getAttribute.bind(target);
    // console.log("getAttribute", getAttribute("nome"), "value", value);
    // setValue(getAttribute("name"), value);
    setValue(target.getAttribute("name"), target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategorias([...categorias, categoria]);
    setCategoria(categoriaInicial);
  };

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
          label="Cor da Categoria:"
          type="color"
          name="cor"
          value={categoria.cor}
          onChange={handleChange}
        />
        <button>Cadastrar</button>
      </form>

      <ul>
        {categorias.map((categoria, i) => (
          <li key={`${categoria.nome}${i}`}>{categoria.nome}</li>
        ))}
      </ul>
      <Link to="/">Ir para Home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
