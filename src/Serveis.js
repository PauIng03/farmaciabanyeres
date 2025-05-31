import React from 'react';
import './Estils/Serveis.css';
import LlistatServeis from './LlistatServeis';

function Serveis() {
  return (
    <div>
      <img src="imatges/carrussel-banner-27.png" className="carrussel-banner-27" alt="carrussel-banner" />
      <LlistatServeis titol="Serveis" mode="complet" />
    </div>
  );
}

export default Serveis;
