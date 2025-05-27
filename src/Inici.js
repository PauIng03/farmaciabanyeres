import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Estils/Inici.css';

function Inici() {
    const navigate = useNavigate();

  return (
    <div>
        <img src="imatges/carrussel-banner-27.png" className="carrussel-banner-27" alt="carrussel-banner" />
        <div className="QuiSom">
            <div className='Titols'>
                <h1>Qui som?</h1>
            <div className='underline'></div>
        </div>
        <div className="TextImatge">
          <div className='TextBoto'>
            <p className='TextQuiSom'>
              Farmàcia Banyeres és un espai de salut on tu ets el centre. <br /><br />
              Oferim una atenció personalitzada, professional, actualitzada i adaptada a cada pacient.<br />
              La nostra motivació són els nostres pacients i tenir cura de la seva salut.<br />
              Comptem amb un equip qualificat, competent, proper i de confiança que es forma de manera continuada per oferir la millor atenció.
            </p>
            <button className='Boto' onClick={() => navigate('/qui-som')}>Coneixe'ns més!</button>
          </div>
          <img className='Imatge' src="https://placehold.co/600x250" alt="QuiSom" />
        </div>
      </div>
    </div>
  );
}

export default Inici;
