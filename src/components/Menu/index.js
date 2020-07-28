import React from  'react';
import Logo from '../../assets/img/logo.png';
import './Menu.css';
// import ButtonLink from './components/ButtonLink'
import Button from '../Button';

function Menu() {
    return (
        <nav className="Menu">
            <a href="/">
                <img className="Logo" src={Logo} alt="logo"/>
            </a>
            <Button as="a">Novo Vídeo</Button>
            {/* <ButtonLink className="ButtonLink" href="/">Novo vídeo</ButtonLink> */}
        </nav>
    );
}

export default Menu;
