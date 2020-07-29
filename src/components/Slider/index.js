import React from "react";
import SlickSlider from "react-slick";
import styled from "styled-components";

const Container = styled.ul`
  padding: 0;
  margin: 0;
  .slick-prev,
  .slick-next {
    z-index: 50;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    transform: initial;
    &:before {
      font-size: 30px;
    }
  }

  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 16px;
  }
`;

export const SliderItem = styled.li`
  margin-right: 16px;
  img {
    margin: 16px;
    width: 298px;
    height: 197px;
    object-fit: cover;
  }
`;

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      style={{
        ...style,
        right: "16px",
        display: "block",
        width: "48px",
        height: "48px",
        zIndex: 50,
        top: 0,
        bottom: 0,
        margin: "auto",
        transform: "initial",
        cursor: "pointer",
        color: "transparent",
        border: "none",
        outline: 0,
        position: "absolute",
        padding: 0,
      }}
      onClick={onClick}
    >
      <i
        className="material-icons md-48"
        style={{
          ...style,
          fontSize: "48px",
          height: "48px",
          width: "48px",
          lineHeight: "48px",
          color: "white",
        }}
      >
        arrow_forward_ios
      </i>
    </div>
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      style={{
        ...style,
        left: "25px",
        display: "block",
        width: "48px",
        height: "48px",
        zIndex: 50,
        top: 0,
        bottom: 0,
        margin: "auto",
        transform: "initial",
        cursor: "pointer",
        color: "transparent",
        border: "none",
        outline: 0,
        position: "absolute",
        padding: 0,
      }}
      onClick={onClick}
    >
      <i
        className="material-icons md-48"
        style={{
          ...style,
          fontSize: "48px",
          height: "48px",
          width: "48px",
          lineHeight: "48px",
          color: "white",
        }}
      >
        arrow_back_ios
      </i>
    </div>
  );
};

const Slider = ({ children }) => (
  <Container>
    <SlickSlider
      {...{
        dots: false,
        infinite: false,
        speed: 300,
        centerMode: false,
        variableWidth: true,
        adaptiveHeight: true,
        slidesToScroll: 1,
        // slidesToShow: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      }}
    >
      {children}
    </SlickSlider>
  </Container>
);

export default Slider;
