import React, { useEffect, useState } from 'react';
import './Estils/QuiSom.css';
import { supabase } from './lib/supabaseClient';
import DivQuiSom from './DivQuiSom';

function QuiSom() {
  const [equip, setEquip] = useState([]);

  useEffect(() => {
    async function fetchEquip() {
      const { data, error } = await supabase.from('Equip').select('*');
      if (error) {
        console.error('Error carregant equip:', error.message);
      } else {
        const EquipOrdenat = data.sort((a, b) => a.id - b.id);
        setEquip(EquipOrdenat);
      }
    }
    fetchEquip();
  }, []);

  return (
    <div>
      <div className="banner">
        <img src="https://atfkoregabmvkwjeearl.supabase.co/storage/v1/object/public/imatges-header//Mostrador.avif" alt="Imatge banner" className="imatgeBanner" />
        <div className="overlayNegre"></div>
        <div className="contingutBanner">
          <h1 className="titolBanner">Qui Som?</h1>
        </div>
      </div>
      <DivQuiSom botoText="Contacta amb nosaltres!"botoRuta="/contacte" ></DivQuiSom>
      <div className="Valors">
        <div className='Titols'>
          <h1>Els nostres valors</h1>
          <div className='underlineBlanc'></div>
        </div>
        <div className="TextImatgeQuiSom">
          <img className='Imatge' src="https://atfkoregabmvkwjeearl.supabase.co/storage/v1/object/public/imatges-header//Mostrador.avif" alt="Valors" />
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
