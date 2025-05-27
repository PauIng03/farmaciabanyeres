import React, { useEffect, useState } from 'react';
import './Estils/QuiSom.css';
import { supabase } from './lib/supabaseClient';

function QuiSom() {
  const [equip, setEquip] = useState([]);

  useEffect(() => {
    async function fetchEquip() {
      const { data, error } = await supabase.from('Equip').select('*');
      if (error) {
        console.error('Error carregant equip:', error.message);
      } else {
        setEquip(data);
      }
    }
    fetchEquip();
  }, []);

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

      <div className="Valors">
        <div className='Titols'>
          <h1>Els nostres valors</h1>
          <div className='underlineBlanc'></div>
        </div>
        <div className="TextImatge">
          <img className='Imatge' src="https://placehold.co/600x200" alt="Valors" />
          <p className='TextValors'>
            La nostra visió és la d’una farmàcia comunitària centrada en el pacient.<br />
            Volem establir una relació de confiança amb la nostra comunitat, basada en oferir una atenció farmacèutica on el pacient rep una informació sanitària de qualitat que li permet prendre decisions sobre la seva salut.<br />
            Volem que els nostres pacients ens sentin propers, que sàpiguen que els escoltarem, els acompanyarem i farem seguiment de les seves necessitats en cada etapa de la vida.<br /><br />
            Ens vols fer confiança? Farmàcia Banyeres, som la teva farmàcia.
          </p>
        </div>
      </div>

      <div className="Equip">
        <div className='Titols'>
          <h1>Equip</h1>
          <div className='underline'></div>
        </div>
        <div className="Cartes">
          {equip.map((persona) => (
            <div key={persona.id} className='Carta'>
              <img className='ImatgeCarta' src={persona.Imatge || "https://placehold.co/600x200"} alt={persona.Nom} />
              <p className='Nom'>{persona.Nom}</p>
              <p className='Rol'>{persona.Rol}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuiSom;
