import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Div1 = styled.div`
  width: 100%;
  height: 100%;
`;

function Game() {
  const divRef = useRef(null);

  useEffect(() => {
    // console.log('divRef', divRef);
    // this.myP5 = new p5(sketch, this.divRef.current);
  }, [divRef]);

  return (
    <>
      <Div1 ref={divRef}>
        <iframe
          title="Game"
          style={{ width: '100%', height: '100%' }}
          src="https://editor.p5js.org/ccarneiro/embed/nqHpn8Y2X"
        />
      </Div1>
    </>
  );
}

export default Game;
