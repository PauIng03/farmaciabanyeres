import React, { useEffect, useState } from 'react';
import './Estils/Serveis.css';
import { supabase } from './lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

function Serveis() {
    const [serveis, setServeis] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchServeis() {
        const { data, error } = await supabase.from('Serveis').select('*');
        if (error) {
          console.error('Error carregant serveis:', error.message);
        } else {
          setServeis(data);
        }
      }
      fetchServeis();
    }, []);

  return (
    <div>
      <img src="imatges/carrussel-banner-27.png" className="carrussel-banner-27" alt="carrussel-banner" />
      <div className="Serveis">
        <div className='Titols'>
          <h1>Serveis</h1>
          <div className='underline'></div>
        </div>
        <div className="Cartes">
          {serveis.map((servei) => (
            <div key={servei.id} className='Carta'>
              <div className='IconoNom'>
                <img className='ImatgeCarta' src={servei.Icona || "https://placehold.co/600x200"} alt={servei.Nom} />
                <p className='Nom'>{servei.Nom}</p>
              </div>
              <div className='InfoFotoServeis'>
                <div className='InfoServeis'>
                  <p className='Nom'>{servei.Nom}</p>
                  <p className='Resum'>{servei.Resum}</p>
                </div>
                <button className='Boto' onClick={() => navigate('/serveis/{servei.Nom}')}>Veure'n més</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Serveis;