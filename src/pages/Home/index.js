import React, { useEffect, useState } from 'react';
// import Menu from '../../components/Menu';
// import dadosIniciais from '../../data/dados_iniciais.json';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
// import Footer from '../../components/Footer';
import categoriasRepository from '../../repositories/categorias';
import PageDefault from '../../components/PageDefault';
import Loading from '../../components/Loading';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    categoriasRepository.getAllWithVideos()
      .then(((categorias) => {
        setDadosIniciais(categorias);
        setLoading(false);
      }));
  }, []);

  return (
    <PageDefault paddingAll={0}>

      {/* JSON.stringify(dadosIniciais) */}
      <Loading loading={loading} />

      {!loading && (
      <>
        <BannerMain
          videoTitle={dadosIniciais[0].videos[0].titulo}
          url={dadosIniciais[0].videos[0].url}
          videoDescription="O que é Front-end? Trabalhando na área os termos HTML, CSS e JavaScript fazem parte da rotina das desenvolvedoras e desenvolvedores. Mas o que eles fazem, afinal? Descubra com a Vanessa!"
        />

        {dadosIniciais
          .filter((categoria) => categoria.videos.length)
          .map((categoria, index) => (
            <Carousel
              key={categoria.id}
              ignoreFirstVideo={index === 0}
              category={categoria}
            />
          ))}
      </>
      )}

      {/* <Carousel
        ignoreFirstVideo
        category={dadosIniciais.categorias[0]}
      />

      <Carousel
        category={dadosIniciais.categorias[1]}
      />

      <Carousel
        category={dadosIniciais.categorias[2]}
      />

      <Carousel
        category={dadosIniciais.categorias[3]}
      />

      <Carousel
        category={dadosIniciais.categorias[4]}
      />

      <Carousel
        category={dadosIniciais.categorias[5]}
      />       */}

    </PageDefault>
  );
}

export default Home;
