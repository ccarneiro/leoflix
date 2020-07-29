import React from "react";
import styled from "styled-components";

import Game from "../../components/Game";
import PageDefault from "../../components/PageDefault";

const DivGame = styled.div`
  width: 100%;
  flex: 1;
  background-color: var(--black);
  color: var(--white);
`;

const DivFlex = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  text-align: center;
`;

function Erro404() {
  return (
    <>
      <PageDefault>
        <DivFlex>
          <h1>Erro 404</h1>
          <h2>Página não encontrada!</h2>
          <DivGame>
            <Game />
          </DivGame>
        </DivFlex>
      </PageDefault>
    </>
  );
}

export default Erro404;
