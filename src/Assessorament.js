import React from 'react';
import './Estils/Assessorament.css';
import LlistatAssesoraments from './LlistatAssessoraments';

function Assesorament() {
  return (
    <div>
      <img src="imatges/carrussel-banner-27.png" className="carrussel-banner-27" alt="carrussel-banner" />
      <LlistatAssesoraments titol="Programes" mode="complet" />
    </div>
  );
}

export default Assesorament;
