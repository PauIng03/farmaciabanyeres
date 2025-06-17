import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

function LlistatServeis({ cartaServeisClass='CartaServeis', serveisClass="Serveis", underlineClass="underline", titol = "Serveis", limit = null, mode = "complet" }) {
  const [serveis, setServeis] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const esInici = location.pathname === '/';

  useEffect(() => {
    async function fetchServeis() {
      let query = supabase.from('Serveis').select('*');
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) {
        console.error('Error carregant serveis:', error.message);
      } else {
          const serveisOrdenats = data.sort((a, b) => (a.Resum?.length || 0) - (b.Resum?.length || 0));
          setServeis(serveisOrdenats);
      }
    }
    fetchServeis();
  }, [limit]);

  return (
    <div className={serveisClass}>
      <div className='Titols'>
        <h1>{titol}</h1>
        <div className={underlineClass}></div>
      </div>

      <div className="CartesServeis">
        {serveis.map((servei) => (
          <div key={servei.id} className={cartaServeisClass}>
            <div className='IconoNom'>
              <img className={esInici ? 'IconaCarta Blanca' : 'IconaCarta Negra'} src={servei.Icona || "https://placehold.co/600x200"} alt={servei.Nom}/>
              <p className={esInici ? 'nomServeisPetit' : 'nomInici'}>{servei.Nom}</p>
            </div>

            {mode === "complet" && (
              <div className='InfoFotoServeis'>
                <div className='InfoServeis'>
                  <p className='nomServeis'>{servei.Nom}</p>
                  <p className='Resum'>{servei.Resum}</p>
                </div>
                <button className='Boto' onClick={() => navigate(`/serveis/${servei.id}`)}>Veure'n més</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LlistatServeis;
