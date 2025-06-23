import React from 'react';
import './Estils/Serveis.css';
import LlistatServeis from './LlistatServeis';

function Serveis() {
  return (
    <div>
      <div className="banner">
        <img src="https://atfkoregabmvkwjeearl.supabase.co/storage/v1/object/public/imatges-header//Mostrador.avif" alt="Imatge banner" className="imatgeBanner" />
        <div className="overlayNegre"></div>
        <div className="contingutBanner">
          <h1 className="titolBanner">Serveis</h1>
        </div>
      </div>
      <LlistatServeis titol="Tots els serveis" mode="complet" />
    </div>
  );
}

export default Serveis;
