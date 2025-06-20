import React from 'react';
import './Estils/Assessorament.css';
import LlistatAssesoraments from './LlistatAssessoraments';
import AltresProgrames from './AltresProgrames';

function Assesorament() {
  return (
    <div>
      <img src="imatges/carrussel-banner-27.png" className="carrussel-banner-27" alt="carrussel-banner" />
      <LlistatAssesoraments titol="Programes" mode="complet" />
      <AltresProgrames titol="Altres programes" mode="complet" />
    </div>
  );
}

export default Assesorament;
