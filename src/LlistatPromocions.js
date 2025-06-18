import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import './Estils/Promocions.css';

function LlistatPromocions({ classe="Promocions", underlineClass="underline", titol="Promocions", limit = null, mode = "complet" }) {
  const [promocions, setPromocions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPromocions() {
      let query = supabase.from('Promocions').select('*');
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) {
        console.error('Error carregant promocions:', error.message);
      } else {
        setPromocions(data);
      }
    }
    fetchPromocions();
  }, [limit]);

  return (
    <div className={classe}>
      <div className='Titols'>
        <h1>{titol}</h1>
        <div className={underlineClass}></div>
      </div>

      <div className="CartesPromocions">
        {promocions.map((promo) => (
          <div key={promo.id} className='CartaPromocions'>
            <img className='ImatgePromocio' src={promo.Imatge || "https://placehold.co/600x200"} alt={promo.Nom} />
            <div className='ContingutPromocio'>
              <h2 className='TitolPromocio'>{promo.Nom}</h2>
              {mode === "complet" && (
                <>
                  <p className='TextPromocio'>{promo.Promocio}</p>
                  <button className='BotoRosa' onClick={() => navigate(`/promocions/${promo.id}`)}>Saber-ne més</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LlistatPromocions;