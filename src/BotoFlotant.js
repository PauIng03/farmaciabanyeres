import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { PiPaperPlaneRightFill } from "react-icons/pi";
import './Estils/BotoFlotant.css';

function BotoFlotant() {
  const [obert, setObert] = useState(false);
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMostrarTooltip(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    setObert(!obert);
    setMostrarTooltip(false); // Amaga tooltip si es fa clic
  };

  return (
    <>
      <div className="boto-flotant" onClick={handleClick}>
        <FaWhatsapp size={28} />
        {mostrarTooltip && (
          <div className="tooltip-petita">Tens dubtes?<br /><strong>Escriu-nos!</strong></div>
        )}
      </div>

      {obert && (
        <div className="panell-missatgeria">
          <div className="capcalera">
            <div className='divImatgeLogo'><img className='imatgeLogo' src='/Logo.webp' alt='logo farmàcia'></img></div>
                <span className='textSuperiorPanell'>Farmàcia Banyeres</span>
                <button className='creuBotoFlotant' onClick={() => setObert(false)}>✖</button>
            </div>
          <div className="cos">
            <div className='missatge'>
                <p>Hola! 👋</p>
                <p>En què et podem ajudar?</p>
            </div>
            <a
              href="https://wa.me/34693926229"
              target="_blank"
              rel="noopener noreferrer"
              className="boto-whatsapp"
            >
              <PiPaperPlaneRightFill className='iconaBotoXat' /> Obrir WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default BotoFlotant;
