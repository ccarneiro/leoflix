import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Ju from '../../assets/img/juliana.png';
import Marcos from '../../assets/img/mario.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingImage = styled.img`
  clip-path: circle(60px at center);
  animation: ${rotate} 2s linear infinite;
`;

const Centralize = styled.div`
  display: flex;
  justify-content: center;
`;

function Loading({ loading }) {
  return (
    <>
      {loading && (
      <Centralize>
        <LoadingImage src={Ju} alt="Ju" />
        <LoadingImage src={Marcos} alt="Ju" />
      </Centralize>
      )}
    </>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
