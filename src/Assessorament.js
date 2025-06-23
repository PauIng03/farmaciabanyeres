import React from 'react';
import './Estils/Assessorament.css';
import LlistatAssesoraments from './LlistatAssessoraments';
import AltresProgrames from './AltresProgrames';

function Assesorament() {
  return (
    <div>
      <div className="banner">
        <img src="https://atfkoregabmvkwjeearl.supabase.co/storage/v1/object/public/imatges-header//Mostrador.avif" alt="Imatge banner" className="imatgeBanner" />
        <div className="overlayNegre"></div>
        <div className="contingutBanner">
          <h1 className="titolBanner">Programes sanitàris</h1>
        </div>
      </div>
      <LlistatAssesoraments titol="Destacats" mode="complet" />
      <AltresProgrames titol="Altres programes" mode="complet" />
    </div>
  );
}

export default Assesorament;
