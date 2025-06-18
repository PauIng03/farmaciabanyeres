import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import PanellDemanarCita from './PanellDemanarCita';
import './Estils/Promocions.css';
import { useNavigate } from 'react-router-dom';

function PromocioDetall() {
  const { id } = useParams();
  const [promo, setPromo] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPromocio() {
      const { data, error } = await supabase
        .from('Promocions')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        navigate('/promocions');
      } else {
        setPromo(data);
      }
    }

    fetchPromocio();
  }, [id, navigate]);

  if (!promo) return <p>Carregant...</p>;

  return (
    <div className="PromocionsDetall">
      <div className='ImatgeCapcalera'>
        <img src={promo.Imatge} alt={promo.Nom} className='ImatgePromocioGran' />
      </div>

      <div className='ContingutDetall'>
        <div className='TitolDetall'>
          <h1>{promo.Nom}</h1>
          <div className="underline blanc"></div>
        </div>
        <h2 className='Subtitol'>Promoció</h2>
        <p className='Text'>{promo.Promocio}</p>

        <h2 className='Subtitol'>Descripció</h2>
        <p className='Text'>{promo.Descripcio}</p>
        <PanellDemanarCita tipus="promocions" id={id} />
      </div>
    </div>
  );
}

export default PromocioDetall;