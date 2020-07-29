import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Home from "./pages/Home";
import CadastroVideo from "./pages/cadastro/Video";
import CadastroCategoria from "./pages/cadastro/Categoria";

const Pagina404 = () => (
  <div>
    <h1>Erro 404</h1>
    <h2>Página não encontrada!</h2>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/cadastro/video" component={CadastroVideo} exact />
        <Route path="/cadastro/categoria" component={CadastroCategoria} exact />
        <Route component={Pagina404} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
