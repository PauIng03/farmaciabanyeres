import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import QuiSom from './QuiSom.js';
import Serveis from './Serveis.js'
import Blog from './Blog.js'
import Promocions from './Promocions.js'
import Footer from './Footer.js'
import './Estils/Inici.css';

function Inici() {
  return (
    <div>
        <img src="imatges/carrussel-banner-27.png" className="carrussel-banner-27" alt="carrussel-banner" />
        <div className="QuiSom">
        <div className='Titols'>
          <h1>Qui som?</h1>
          <div className='underline'></div>
        </div>
        <div className="TextImatge">
          <p className='TextQuiSom'>
            Farmàcia Banyeres és un espai de salut on tu ets el centre. <br /><br />
            Oferim una atenció personalitzada, professional, actualitzada i adaptada a cada pacient.<br />
            La nostra motivació són els nostres pacients i tenir cura de la seva salut.<br />
            Comptem amb un equip qualificat, competent, proper i de confiança que es forma de manera continuada per oferir la millor atenció.
          </p>
          <img className='Imatge' src="https://placehold.co/600x200" alt="QuiSom" />
        </div>
      </div>
    </div>
  );
}

export default Inici;
