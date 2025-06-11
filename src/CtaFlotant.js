import React, { useState, useEffect } from 'react';
import './Estils/CtaFlotant.css';
import { useNavigate } from 'react-router-dom';

function CtaFlotant() {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMostrarTooltip(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleMissatgeClick = () => {
    navigate('/promocions');
  };

  const handleTancar = (e) => {
    e.stopPropagation(); // Evita que es propagui i s'activi el clic del missatge
    setMostrarTooltip(false);
  };

  return (
    <>
      <div className="ctaFlotant">
        {mostrarTooltip && (
          <div className="ctaMissatge" onClick={handleMissatgeClick}>
            <span className="ctaTextMissatge">
              Promocions especials per a l'al·lèrgia?<br />
              <strong>Descobreix-les!</strong>
            </span>
            <button className="creuCtaFlotant" onClick={handleTancar}>✖</button>
          </div>
        )}
      </div>
    </>
  );
}

export default CtaFlotant;
